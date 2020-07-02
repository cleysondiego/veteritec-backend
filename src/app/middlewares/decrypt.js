import NodeRSA from 'node-rsa';

export default async (req, res, next) => {
  try {
    const key = new NodeRSA({ b: 512 });

    const keyString =
      '-----BEGIN PRIVATE KEY-----\n' +
      'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAg0p5W8cWHrvBOhJt\n' +
      'Bqmi46qP5DDU1xqqLl9r1LyJ01luuieP9ntQrJ3n8C4KNM1Hm5uf26uwzpPUE5Se\n' +
      'fLiSAwIDAQABAkBXuAuLeWHbGOEKNsNnXzG44P2Qndum+GbZ4uE92tZPQYqru1yA\n' +
      'w1s0XcV/SXeVUZ0niIo7LlI+3tQ/G6LgVj2RAiEA1ccgkm2nl6bXyQJqwkfVr0Is\n' +
      '85g/coOC3ADOwo7d5JsCIQCdOLScrk9G1KVjHDCg5hExsKhliMPGPwolP94Ux836\n' +
      'uQIgb2Ux3dtx5x4zdzThOJeCC68qCU0eUqegus9Y7hzQF10CIQCbYamOl+8dr5ds\n' +
      'pjWhLv+bPl6PSmVCDpd2TPKtUvLNcQIgMwkpz+I5zlgtapdCgTFReA1gOJlH6NLA\n' +
      '8alIFtlIRsg=\n' +
      '-----END PRIVATE KEY-----';

    key.importKey(keyString);

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
