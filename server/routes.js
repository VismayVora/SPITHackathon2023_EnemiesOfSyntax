const { Router } = require("express");
const {
  sendPublicPrivateKeys,
  getEncryptText,
  getDecryptText,
} = require("./rsa_cryptography");
const router = Router();
router.get("/getPubPriKey", sendPublicPrivateKeys);
router.post("/getEncryptedText", getEncryptText);
router.post("/getDecryptedText", getDecryptText);
module.exports = router;
