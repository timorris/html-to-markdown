import { DefaultAzureCredential, ClientSecretCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

// Replace with your Key Vault name
const vaultName = "kv-timorris"; 
const url = `https://${vaultName}.vault.azure.net`;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;

if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Missing required environment variables for Azure authentication');
  }
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

//const credential = new DefaultAzureCredential();
const client = new SecretClient(url, credential);

export async function getSecret(secretName: string): Promise<string | undefined> {
  try {
    const secret = await client.getSecret(secretName);
    return secret.value || undefined;
  } catch (error) {
    return undefined;
  }
}