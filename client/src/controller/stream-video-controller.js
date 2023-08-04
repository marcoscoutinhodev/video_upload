export default class StreamVideoController {
  #videoServiceClient;

  constructor({ videoServiceClient }) {
    this.#videoServiceClient = videoServiceClient;
  }

  handle(request, response, headers) {
    const videoId = request.url.split('/')[1];
    if (!videoId) {
      this.#writeResponse(response, headers, {
        statusCode: 400,
        data: {
          success: false,
          error: 'video id must be provided',
        },
      });
      return;
    }

    if (!/^\d+$/.test(videoId)) {
      this.#writeResponse(response, headers, {
        statusCode: 400,
        data: {
          success: false,
          error: 'invalid video id',
        },
      });
      return;
    }

    const stream = this.#videoServiceClient.StreamVideo({ id: videoId });
    let errorDetail;

    stream.on('data', (chunk) => {
      response.write(chunk.buff);
    });

    stream.on('error', (err) => {
      const errorSplitted = err.message.split(':');
      errorDetail = errorSplitted[errorSplitted.length - 1];

      stream.cancel();
    });

    stream.on('end', () => {
      if (errorDetail) {
        let statusCode = 500;
        let data = {
          success: false,
          error: 'internal server error',
        };

        if (errorDetail.trim() === 'no such file or directory') {
          statusCode = 400;
          data = {
            success: false,
            error: 'video id not found',
          };
        }

        this.#writeResponse(response, headers, {
          statusCode,
          data,
        });

        return;
      }

      this.#writeResponse(response, headers, {
        statusCode: 200,
        data: {
          success: true,
          error: 'video finilized',
        },
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  #writeResponse(response, headers, { statusCode, data }) {
    response.writeHead(statusCode, headers);
    response.write(JSON.stringify(data));
    response.end();
  }
}
