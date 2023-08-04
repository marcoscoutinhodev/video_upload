import { createServer } from 'node:http';

import UploadVideoController from './controller/upload-video-controller.js';
import StreamVideoController from './controller/stream-video-controller.js';
import videoFormatValidationService from './adapter/video-format-validation-service-adapter.js';
import videoServiceClient from './adapter/video-service-grpc-client.js';

const uploadVideoController = new UploadVideoController({
  videoFormatValidationService,
  videoServiceClient,
});

const streamVideoController = new StreamVideoController({ videoServiceClient });

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
      streamVideoController.handle(request, response, headers);
      break;
    default:
      response.writeHead(404, headers);
      response.write('not found');
      response.end();
  }
  // eslint-disable-next-line no-console
}).listen('3000', () => console.log('server is running...\n'));
