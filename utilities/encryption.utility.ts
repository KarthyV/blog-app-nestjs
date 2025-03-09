import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

const getAESKey = (): string => createHash("sha256").update(process.env.AES_KEY).digest("base64").substring(0, 32);

export const decryptAESHash = (encryptedText: string): string => {
    try {
        const iv = Buffer.from(encryptedText.slice(0, 32), "hex");
        const encrypted = encryptedText.slice(32);

        const decipher = createDecipheriv("aes-256-ctr", getAESKey(), iv);
        let decrypted = decipher.update(encrypted, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    } catch (err) {
        return '';
    }
}

export const encryptAESHash = (text: string): string => {
    try {
        const iv = randomBytes(16);
        const cipher = createCipheriv("aes-256-ctr", getAESKey(), iv);
        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        return iv.toString("hex") + encrypted;
    } catch (error) {
        return "";
    }
}