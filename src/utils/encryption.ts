import * as crypto from 'crypto';

function randomBytes() {
  const buf = crypto.randomBytes(128);
  return buf.toString('hex');
}

function encryptByDES(message: string, key = 'M^LMhpW7wgU*t%opFGAGE7U$'): string {
  const cipher = crypto.createCipheriv('des-ede3', crypto.scryptSync(key, '', 24), '');
  cipher.setAutoPadding(true);
  let ciph = cipher.update(message, 'utf8', 'hex');
  ciph += cipher.final('hex');
  return ciph;
}

function decryptByDES(ciphertext: string, key = 'M^LMhpW7wgU*t%opFGAGE7U$') {
  const decipher = crypto.createDecipheriv('des-ede3', key, '');
  decipher.setAutoPadding(true);
  let txt = decipher.update(ciphertext, 'hex', 'utf8');
  txt += decipher.final('utf8');
  return txt;
}

function rsaEncrypt(data, pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgsi1chXhVrTKmEhGejZqP+lgL
hHtO4hX/jxbqdTwlpLdtiSectjw+TX+C+KWRzQptanfPD4bZbRv/2c5iyzYoIB0O
ojOcLUnAEKvdMnupu0OvyWYIG10Mk5rvBU//PyEO14ythHvlvl6pa07y2vCacVgf
N8Y4Ifg1OgGHFndP1QIDAQAB
-----END PUBLIC KEY-----
`) {
  return crypto.publicEncrypt({
    key: pubKey,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  }, Buffer.from(data));
}

function rsaDecrypt(data, priKey = `-----BEGIN PRIVATE KEY-----
MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKCyLVyFeFWtMqYS
EZ6Nmo/6WAuEe07iFf+PFup1PCWkt22JJ5y2PD5Nf4L4pZHNCm1qd88PhtltG//Z
zmLLNiggHQ6iM5wtScAQq90ye6m7Q6/JZggbXQyTmu8FT/8/IQ7XjK2Ee+W+Xqlr
TvLa8JpxWB83xjgh+DU6AYcWd0/VAgMBAAECgYB/r1QP0hXdrfMyteS+ITIQ+RCA
hlIcSdTE7YN95I1YM9tz86lAAiU4NAf/n2afxVZlvlVYd7Pki6fV0dEF+wYZ9WrL
0w+i6GocyP/5LO9rbPYSW+v38gVdYfNtXYea6Gngtx/Hb4oKNapQBhCmPGgQN6j9
DUpSUs1I/yisqDI/QQJBANK9nCpmQlhBS5KAOf++1fxFEPfCF2V8sLTs5ORepajN
AAhfoqP8TNWYyXE/OAHAG6WGBTqlbx48wnbKJ46QG/0CQQDDNSSgoMCbhQrUuqU6
nr0raBBXUR1jSiViJEZRBGwU2EFrmmwrZwSkR5AKGq5x4aXrceFnP+pttwtikVki
vE65AkAZjr09tyEcqu6LWdmu1moFKisgoP1NZY3Yo1IvD/tvOU1jtpV25cY7sUfc
4BnevHmd3V8M+bs8I4pB9cpOU9PRAkAtnTNr3WRkctgvEVYeto0ZoX2ACdJGK0NF
BZjwwYnH7SiMTk9MbQwmnxpHYii1L7cnpzq2d7b94DHm3HPpq/rxAkB+b5ml+Vvd
Np7oFJFREuhh+0Ku145gc6HOYcUcOfEK9T5KUMlcLyri7jjGNMWtg3N0i9taUhbe
gYMNPGcLhkfk
-----END PRIVATE KEY-----
`) {
  return crypto.privateDecrypt({
    key: priKey,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  }, data);
}

export {
  randomBytes,
  rsaDecrypt,
  rsaEncrypt,
  encryptByDES,
  decryptByDES,
};
