const NodeRSA = require("node-rsa");

const sendPublicPrivateKeys = (req, res) => {
  const key = NodeRSA({ b: 1024 });
  const public_key = key.exportKey("public");
  const private_key = key.exportKey("private");
  return res.json({
    public_key,
    private_key,
  });
};

const getEncryptText = async (req, res) => {
  const { message, public_key } = req.body;
  let key_public = new NodeRSA(public_key);
  return res.json({
    encryptedText: key_public.encrypt(message, "base64"),
  });
};

const getDecryptText = async (req, res) => {
  const { hash, private_key } = req.body;

  try {
    let key_private = new NodeRSA(private_key);
    return res.json({
      message: key_private.decrypt(hash, "utf8"),
      access: true,
    });
  } catch (e) {
    console.log("Not Accessible");
    res.json({
      access: false,
      message: "Access Denied",
    });
  }
};

module.exports = { sendPublicPrivateKeys, getEncryptText, getDecryptText };
