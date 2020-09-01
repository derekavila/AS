const crypto = require('crypto');
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

function encode(text, key){
	const thekey = crypto.createCipher('aes-128-cbc', key);
	let thetext = thekey.update(text, 'utf8', 'hex');
	thetext += thekey.final('hex');
	return (thetext);
}

function decode(message, key){
	const mykey = crypto.createDecipher('aes-128-cbc', key);
	let mystr = mykey.update(message, 'hex', 'utf8');
	mystr += mykey.final('utf8');
	return (mystr);
}

key.generateKeyPair();

const text = "Informacion secreta en RSA";
const encrypted = key.encrypt(text, 'base64');
console.log(`Encriptado en RSA: ${encrypted}`);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log(`Des-encriptado de RSA: ${decrypted}`);


const aeskey = "Llaves";
let value = encode("Mi mensaje secreto", aeskey);
console.log(`El mensaje cifrado es: ${value}`);
value = decode(value, aeskey);
console.log(`El mensaje original es: ${value}`);

