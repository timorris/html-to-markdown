import { ClientSecretCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const url = process.env.KEYVAULT_URL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;

if (!tenantId || !clientId || !clientSecret || !url) {
    throw new Error('Missing required environment variables for Azure authentication. Ensure you have set up your .env file correctly or assigned them to your app server.');
}

const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const client = new SecretClient(url, credential);

export async function getSecret(secretName) {
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