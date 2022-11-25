import crypto from 'crypto';

export const encriptar = (texto = '') => {
    const cipher = crypto.createCipher('aes-128-cbc', 'password');
    let crypted = cipher.update(texto, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

export const desencriptar = (texto = '') => {
    const decipher = crypto.createDecipher('aes-128-cbc', 'password');
    let dec = decipher.update(texto, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}