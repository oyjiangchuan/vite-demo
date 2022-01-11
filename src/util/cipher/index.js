import md5 from 'crypto-js/md5'
import UTF8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'

export function encryptByBase64(cipherText) {
  return UTF8.parse(cipherText).toString(Base64)
}

export function decodeByBase64(cipherText) {
  return Base64.parse(cipherText).toString(UTF8)
}

export function encryptByMd5(cipherText) {
  return md5(cipherText).toString()
}
