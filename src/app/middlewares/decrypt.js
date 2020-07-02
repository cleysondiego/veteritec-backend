import NodeRSA from 'node-rsa';

export default async (req, res, next) => {
  try {
    const key = new NodeRSA({ b: 512 });

    const keyString =
      '-----BEGIN PRIVATE KEY-----\n' +
      'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAyRlNae37NbQxc89V\n' +
      'hBn5ywEKIky6F9EzlctqTnhP/SPT2gMSO6TsPtKzUWFc9QhSVhO8fj6+Cfv4xUoQ\n' +
      '9qitfwIDAQABAkEAmTcZ8DdNSmF7vAyfzwIreyvTmMZ0kmjlsJ9G43pvFyG3JfbC\n' +
      'wDptJmIa+u8ZJLv5I32AcXs1cBT9qN9LDXs84QIhAOXFpIl8moPRzmaTV6QxtrtY\n' +
      'tvi7Myzo07oWaMDR/IQjAiEA4A3GxajtV1awAV7Zpp1FVkUA3oJn9eNvvzePcilw\n' +
      'aPUCIFEvSDeb4yx4USlFHk5RknMXoW65FhfkHAtAJ7sZdtNpAiAEtuV+1T4hP1a2\n' +
      'wKstwVNrLEqHZBER8HYyfNXM3ihaXQIgJwss/ZZMt7DYqYP9D5eBMsgDTM/xrQVu\n' +
      'lAqhXH0UFNA=\n' +
      '-----END PRIVATE KEY-----';

    // console.log(key.exportKey('pkcs8-private-pem'));

    // console.log(key.exportKey('pkcs8-public-pem'));

    key.importKey(keyString, 'pkcs8-private-pem');

    const { message } = req.body;

    const decryptedText = key.decrypt(message, 'utf8');

    req.body = JSON.parse(decryptedText);

    return next();
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Não foi possível decifrar o conteúdo da mensagem.' });
  }
};
