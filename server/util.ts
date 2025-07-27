import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

// Replace with your Key Vault name
const vaultName = "kv-timorrris3229-msft"; 
const url = `https://${vaultName}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const client = new SecretClient(url, credential);

export async function getSecret(secretName: string) {
  try {
    const secret = await client.getSecret(secretName);
    return secret.value;
  } catch (error) {
    return null;
  }
};