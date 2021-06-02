import { getConfig } from '../config'
var CryptoJS = require("crypto-js");


/// Implementing AES encryption for secrets 
const ENCRYPTION_KEY = getConfig().ENCRYPTION_KEY;

export function encrypt(secret_value) {
    var ciphertext = CryptoJS.AES.encrypt(secret_value, ENCRYPTION_KEY).toString();
    return ciphertext
}

export function decrypt(secret_value) {
    var bytes = CryptoJS.AES.decrypt(secret_value, ENCRYPTION_KEY);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}