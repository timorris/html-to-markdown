import { getSecret, getEnvValue, secretLocation } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}