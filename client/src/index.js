import { createServer } from 'node:http';
import 'dotenv/config';

import UploadVideoController from './controller/upload-video-controller.js';
import videoFormatValidationService from './adapter/video-format-validation-service-adapter.js';
import uploadVideoClient from './adapter/upload-video-service-adapter.js';

const uploadVideoController = new UploadVideoController({
  videoFormatValidationService,
  uploadVideoClient,
});

createServer((request, response) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET',
  };

  switch (request.method) {
    case 'POST':
      uploadVideoController.handle(request, response, headers);
      break;
    case 'GET':

      break;
    default:
      response.writeHead(404, headers);
      response.write('not found');
      response.end();
  }
  // eslint-disable-next-line no-console
}).listen(process.env.SERVER_PORT, () => console.log('server is running...\n'));
