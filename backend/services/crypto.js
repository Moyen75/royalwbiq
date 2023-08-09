const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; // Choose an encryption algorithm
const key = crypto.randomBytes(32); // Generate a secure random key
const iv = crypto.randomBytes(16); // Generate a secure random IV

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = {
    encrypt, decrypt
}
