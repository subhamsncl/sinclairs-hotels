import crypto from 'node:crypto';

// CCAvenue's documented key/IV derivation: the AES-128 key is the raw MD5
// digest of the Working Key (16 bytes), and the IV is a fixed 16 zero bytes.
// This isn't a scheme of our choosing — every one of CCAvenue's official
// integration kits (PHP/Java/.NET) uses exactly this, so a self-hosted
// merchant's existing Working Key only works against this derivation.
const IV = Buffer.alloc(16, 0);

function deriveKey(workingKey: string): Buffer {
  return crypto.createHash('md5').update(workingKey, 'utf8').digest();
}

export function ccavEncrypt(plainText: string, workingKey: string): string {
  const cipher = crypto.createCipheriv('aes-128-cbc', deriveKey(workingKey), IV);
  return cipher.update(plainText, 'utf8', 'hex') + cipher.final('hex');
}

export function ccavDecrypt(encryptedHex: string, workingKey: string): string {
  const decipher = crypto.createDecipheriv('aes-128-cbc', deriveKey(workingKey), IV);
  return decipher.update(encryptedHex, 'hex', 'utf8') + decipher.final('utf8');
}

export function parseCcavResponse(decrypted: string): Record<string, string> {
  const params = new URLSearchParams(decrypted);
  return Object.fromEntries(params.entries());
}
