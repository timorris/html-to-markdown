import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { Resend } from 'resend';
import { getEnvValue, getSecret } from "./util";

const secretLocation = getEnvValue('KEYVAULT_URL') ? 'keyvault' : 'env';

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub API test endpoint
  app.get('/api/github/test', async (req, res) => {
    try {
      const token = secretLocation === 'keyvault' ? await getSecret('github-public-token') : getEnvValue('GITHUB_PUBLIC_TOKEN');
      
      if (!token) {
        return res.json({ error: 'GitHub token not configured', hasToken: false });
      }

      // Test GitHub API connectivity
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'HTML-Markdown-Converter'
      };

      const response = await fetch('https://api.github.com/user', { headers });
      const userData = await response.json();
      
      return res.json({ 
        hasToken: true, 
        apiWorking: response.ok,
        user: response.ok ? userData.login : null,
        status: response.status,
        tokenType: 'public'
      });
    } catch (error) {
      return res.json({ error: 'GitHub API test failed', hasToken: true });
    }
  });

  // GitHub API endpoint for repository stats
  app.get('/api/github/stats', async (req, res) => {
    try {
      const token = secretLocation === 'keyvault' ? await getSecret('github-public-token') : getEnvValue('GITHUB_PUBLIC_TOKEN');
      
      if (!token) {
        return res.json({ stats: null });
      }

      const repo = 'timorris/html-to-markdown';
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'HTML-Markdown-Converter'
      };

      // Fetch repository information
      const [repoResponse, contributorsResponse, releasesResponse] = await Promise.all([
        fetch(`https://api.github.com/repos/${repo}`, { headers }),
        fetch(`https://api.github.com/repos/${repo}/contributors`, { headers }),
        fetch(`https://api.github.com/repos/${repo}/releases`, { headers })
      ]);

      if (!repoResponse.ok) {
        return res.json({ stats: null });
      }

      const repoData = await repoResponse.json();
      const contributorsData = contributorsResponse.ok ? await contributorsResponse.json() : [];
      const releasesData = releasesResponse.ok ? await releasesResponse.json() : [];

      const stats = {
        stars: repoData.stargazers_count,
        contributors: contributorsData.length,
        releases: releasesData.length
      };

      res.json({ stats });
    } catch (error) {
      console.error('GitHub stats error:', error);
      return res.json({ stats: null });
    }
  });

  // GitHub API endpoint for community activity
  app.get('/api/github/activity', async (req, res) => {
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
        .filter((event: any) => ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'ReleaseEvent', 'CreateEvent'].includes(event.type))
        .slice(0, 5)
        .map((event: any) => {
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
  });

  // Helper function to calculate time ago
  function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return 'just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    }
  }

  // Contact form submission
  const contactSchema = z.object({
    email: z.string().email(),
    subject: z.string().min(1),
    message: z.string().min(1)
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const { email, subject, message } = contactSchema.parse(req.body);
      
      const apiKey = secretLocation === 'keyvault' ? await getSecret('resend-api-key') : getEnvValue('RESEND_API_KEY');
      
      if (!apiKey) {
        return res.status(500).json({ 
          error: 'Email service not configured. Please contact support directly.' 
        });
      }

      const resend = new Resend(apiKey as string || '');

      // Send notification to the site owner (always goes to verified email)
      const emailResponse = await resend.emails.send({
        from: 'delivered@resend.dev',
        to: ['bethatway@gmail.com'], // Always send to verified email address
        subject: `Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Reply directly to ${email} to respond to this inquiry.</em></p>
        `,
        replyTo: email,
      });



      if (emailResponse.error) {
        console.error('Resend error:', emailResponse.error);
        return res.status(500).json({ 
          error: `Email delivery failed: ${(emailResponse.error as any).error || (emailResponse.error as any).message || 'Unknown error'}` 
        });
      }

      res.json({ 
        success: true, 
        message: 'Email sent successfully', 
        emailId: emailResponse.data?.id,
        recipient: email 
      });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ 
        error: 'Failed to send email. Please try again later.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
