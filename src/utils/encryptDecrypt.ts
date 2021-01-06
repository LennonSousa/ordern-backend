require('dotenv/config');
import crypto from 'crypto';

const algorithm = 'sha256';

export function encrypt(text: string) {
    if (process.env.PUBLIC_KEY) {
        const encryptedData = crypto.publicEncrypt(
            {
                key: process.env.PUBLIC_KEY.replace(/\\n/gm, '\n'),
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: algorithm,
            },
            // We convert the data string to a buffer using `Buffer.from`
            Buffer.from(text)
        );

        return encryptedData.toString('base64');
    }

    return text;
};

export function decrypt(hash: string) {
    if (process.env.PRIVATE_KEY) {
        const decryptedData = crypto.privateDecrypt(
            {
                key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
                // In order to decrypt the data, we need to specify the
                // same hashing function and padding scheme that we used to
                // encrypt the data in the previous step
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: algorithm,
            },
            Buffer.from(hash, 'base64')
        );

        return decryptedData.toString();

    }

    return hash;
};