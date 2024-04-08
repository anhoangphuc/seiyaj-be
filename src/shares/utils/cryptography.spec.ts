import { hashString } from './cryptography';

describe('cryptography', () => {
  it('Should hash john', async () => {
    const hash = await hashString('john');
    console.log('hash', hash);
  });

  it('Should hash musk', async () => {
    const hash = await hashString('musk');
    console.log('hash', hash);
  });
});
