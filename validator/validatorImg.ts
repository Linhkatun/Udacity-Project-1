import fs from 'fs';
import sharp from 'sharp';

const errorMessageNotFound = 'not found';
const errorMessageNotEmpty = "can't be empty";
const errorMessageMustBeNumber = 'must be number';
const errorMessagePostitiveNumber = 'must be positive number';

const resize = async (
  name: string,
  width: string,
  height: string,
  nameFileResize: string
): Promise<boolean> => {
  try {
    await sharp(name).resize(Number(width), Number(height)).toFile(nameFileResize);
    return true;
  } catch (ex) {
    return false;
  }
};

const existFileOrDirectory = (path: string): string => {
  if (!fs.existsSync(path)) {
    return errorMessageNotFound;
  }
  return '';
};

const validatorSize = (value: string): string => {
  if (!value || !value.trim()) {
    return errorMessageNotEmpty;
  }

  if (Number.isNaN(Number(value.trim()))) {
    return errorMessageMustBeNumber;
  }
  if (Number(value.trim()) < 0) {
    return errorMessagePostitiveNumber;
  }
  return '';
};
export default {
  resize,
  existFileOrDirectory,
  validatorSize,
};
