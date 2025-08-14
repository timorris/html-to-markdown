import { getSecret, getEnvValue, secretLocation, getTimeAgo } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = secretLocation === 'keyvault' ? await getSecret('github-public-token') : getEnvValue('GITHUB_PUBLIC_TOKEN');
    
    if (!token) {
      return res.json({ activities: [] });
    }

    const repo = 'timorris/html-to-markdown';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'HTML-Markdown-Converter'
    };

    // Fetch recent events from the repository
    const eventsResponse = await fetch(`https://api.github.com/repos/${repo}/events?per_page=15`, {
      headers
    });

    if (!eventsResponse.ok) {
      return res.json({ activities: [] });
    }

    const events = await eventsResponse.json();
    
    // Filter and format relevant events
    const activities = events
      .filter((event) => ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'ReleaseEvent', 'CreateEvent'].includes(event.type))
      .slice(0, 5)
      .map((event) => {
        const actor = event.actor.login;
        const createdAt = new Date(event.created_at);
        const timeAgo = getTimeAgo(createdAt);

        switch (event.type) {
          case 'PushEvent':
            const commitCount = event.payload.commits?.length || 1;
            const commitMessage = event.payload.commits?.[0]?.message || 'Updated code';
            return {
              type: 'commit',
              actor,
              action: `pushed ${commitCount} commit${commitCount > 1 ? 's' : ''}`,
              description: commitMessage.length > 60 ? commitMessage.substring(0, 57) + '...' : commitMessage,
              timeAgo,
              color: 'green'
            };
          case 'PullRequestEvent':
            const action = event.payload.action;
            return {
              type: 'pr',
              actor,
              action: `${action} a pull request`,
              description: event.payload.pull_request.title,
              timeAgo,
              color: action === 'opened' ? 'blue' : action === 'closed' ? 'purple' : 'yellow'
            };
          case 'IssuesEvent':
            return {
              type: 'issue',
              actor,
              action: `${event.payload.action} an issue`,
              description: event.payload.issue.title,
              timeAgo,
              color: 'blue'
            };
          case 'ReleaseEvent':
            return {
              type: 'release',
              actor,
              action: 'published a release',
              description: event.payload.release.name || event.payload.release.tag_name,
              timeAgo,
              color: 'purple'
            };
          case 'CreateEvent':
            if (event.payload.ref_type === 'branch') {
              return {
                type: 'branch',
                actor,
                action: 'created branch',
                description: event.payload.ref,
                timeAgo,
                color: 'blue'
              };
            }
            return null;
          default:
            return null;
        }
      })
      .filter(Boolean);

    res.json({ activities });
  } catch (error) {
    console.error('GitHub API error:', error);
    return res.json({ activities: [] });
  }
}