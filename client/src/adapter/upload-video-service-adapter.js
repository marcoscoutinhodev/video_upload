import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
// eslint-disable-next-line import/no-extraneous-dependencies
import protoLoader from '@grpc/proto-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const protoPath = join(__dirname, '../../proto/', 'video_service.proto');
const packageDefinition = protoLoader.loadSync(protoPath);
const grpcObject = loadPackageDefinition(packageDefinition);
const { pb } = grpcObject;

const uploadVideoClient = new pb.VideoService(
  process.env.GRPC_SERVER_ADDRESS,
  credentials.createInsecure(),
);

export default uploadVideoClient;
