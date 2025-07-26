import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

// Replace with your Key Vault name
const vaultName = "kv-timorris3229-msft"; 
const url = `https://${vaultName}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const client = new SecretClient(url, credential);

export async function getSecret(secretName: string) {
  try {
    const secret = await client.getSecret(secretName);
    console.log(`Secret value for ${secretName}: ${secret.value}`);
    return secret.value;
  } catch (error) {
    console.error(`Error retrieving secret ${secretName}:`, error);
    return null;
  }
};