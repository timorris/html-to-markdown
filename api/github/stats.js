import { getSecret, getEnvValue, secretLocation } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = secretLocation === 'keyvault' ? await getSecret('github-public-token') : getEnvValue('GITHUB_PUBLIC_TOKEN');
    
    if (!token) {
      return res.json({ stats: null });
    }

    const repo = getEnvValue('GITHUB_REPO');
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
}