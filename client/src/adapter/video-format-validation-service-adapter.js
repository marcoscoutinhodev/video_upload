import { fileTypeFromBuffer } from 'file-type';

const videoFormatValidationService = (buff) => new Promise((resolve) => {
  fileTypeFromBuffer(buff)
    .then((fileTypeResult) => {
      if (!fileTypeResult || fileTypeResult.ext !== 'mp4') {
        return resolve(false);
      }

      return resolve(true);
    })
    .catch((err) => resolve(err));
});

export default videoFormatValidationService;
