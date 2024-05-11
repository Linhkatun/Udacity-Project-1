import supertest from 'supertest';
import app from '../app';
import validatorImg from '../validator/validatorImg';
import path from 'path';

const request: supertest.SuperTest<supertest.Test> = supertest(app);
describe('Unit test', (): void => {
  describe('Unit test function', (): void => {
    it('width or height is negative number', () => {
      const msgError = validatorImg.validatorSize('-200');
      expect(msgError).toEqual('must be positive number');
    });
    it('validator width or height is string', () => {
      const msgError = validatorImg.validatorSize('a200');
      expect(msgError).toEqual('must be number');
    });
    it('check exists file or directory', () => {
      const msgError = validatorImg.existFileOrDirectory(
        path.resolve(__dirname, `../images/img/img.png`)
      );
      expect(msgError).toEqual('not found');
    });

    it('image does not exist in the system ', async () => {
      const result = await validatorImg.resize(
        path.resolve(__dirname, `../images/img/png.jpg`),
        '200',
        '200',
        path.resolve(__dirname, `../images/img/png-200x200.jpg`)
      );
      expect(result).toBeFalse();
    });
  });
  describe('Unit test endpoint', (): void => {
    it('original image', async (): Promise<void> => {
      const res: supertest.Response = await request.get('/endpoint/img/current/encenadaport');

      expect(res.status).toBe(200);
    });
    it('image exists', async (): Promise<void> => {
      const res: supertest.Response = await request.get('/endpoint/img/current/testvuahn');

      expect(res.status).toBe(404);
    });
    it('resize image', async (): Promise<void> => {
      const res: supertest.Response = await request.get(
        '/endpoint/img/resize/encenadaport?width=250&height=100'
      );

      expect(res.status).toBe(200);
    });
    it('height is negative number', async (): Promise<void> => {
      const res: supertest.Response = await request.get(
        '/endpoint/img/resize/encenadaport?width=500&height=-500'
      );

      expect(res.text).toEqual('Height must be positive number');
    });

    it('width is negative number', async (): Promise<void> => {
      const res: supertest.Response = await request.get(
        '/endpoint/img/resize/encenadaport?width=-500&height=500'
      );

      expect(res.text).toEqual('Width must be positive number');
    });

    it('width or height must be number', async (): Promise<void> => {
      const res: supertest.Response = await request.get(
        '/endpoint/img/resize/encenadaport?width=a&height=500'
      );
      expect(res.status).toBe(400);
    });
  });
});
