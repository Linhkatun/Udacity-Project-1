import express from 'express';
import handleImg from '../validator/validatorImg';
import path from 'path';
import fs from 'fs';

const pathFolderResize = path.resolve(__dirname, `../images/img-resize`);
const pathFolderImage = path.resolve(__dirname, `../images`);
const imgEndpoint = express.Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
imgEndpoint.get(
  '/resize/:name',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const name = req.params.name;
    const width = req.query.width as string;
    const height = req.query.height as string;
    const notfound = handleImg.existFileOrDirectory(`${pathFolderImage}/${name}.jpg`);

    if (notfound) {
      res.status(404).send(`Image ${notfound}`);
      return;
    }

    if (name && !width && !height) {
      res.status(200).sendFile(`${pathFolderImage}/${name}.jpg`);
      return;
    }

    const errorCodeWith = handleImg.validatorSize(width);
    const errorCodeHeight = handleImg.validatorSize(height);

    if (errorCodeWith) {
      res.status(400).send(`Width ${errorCodeWith}`);
      return;
    }

    if (errorCodeHeight) {
      res.status(400).send(`Height ${errorCodeHeight}`);
      return;
    }

    if (!fs.existsSync(pathFolderResize)) {
      fs.mkdirSync(pathFolderResize);
    }

    const pathFileResize = `${pathFolderResize}/${name}-${width}x${height}.jpg`;

    if (fs.existsSync(pathFileResize)) {
      res.status(200).sendFile(pathFileResize);
    } else {
      const resizeSuccess = await handleImg.resize(
        `${pathFolderImage}/${name}.jpg`,
        width,
        height,
        pathFileResize
      );
      if (resizeSuccess) {
        res.status(200).sendFile(pathFileResize);
      } else {
        res.status(500).send('Internal Server');
      }
    }
  }
);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
imgEndpoint.get(
  '/current/:nameImg',
  (req: express.Request, res: express.Response) => {
    const name = req.params.nameImg;
    const notfound = handleImg.existFileOrDirectory(`${pathFolderImage}/${name}.jpg`);

    if (notfound) {
      res.status(404).send(`Image ${notfound}`);
      return;
    }

    res.status(200).sendFile(`${pathFolderImage}/${name}.jpg`);
  }
);

export default imgEndpoint;
