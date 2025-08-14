import { ClientSecretCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const url = process.env.KEYVAULT_URL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;

let client = null;

if (tenantId && clientId && clientSecret && url) {
  const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
  client = new SecretClient(url, credential);
}

export async function getSecret(secretName) {
  if (!client) return undefined;
  try {
    const secret = await client.getSecret(secretName);
    return secret.value || undefined;
  } catch (error) {
    return undefined;
  }
}

export function getEnvValue(envName) {
  return process.env[envName] || undefined;
}

export const secretLocation = getEnvValue('KEYVAULT_URL') ? 'keyvault' : 'env';

export function getTimeAgo(date) {
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