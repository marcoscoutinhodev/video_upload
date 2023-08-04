export default class UploadVideoController {
  #videoFormatValidationService;
  #videoServiceClient;

  constructor({ videoFormatValidationService, videoServiceClient }) {
    this.#videoFormatValidationService = videoFormatValidationService;
    this.#videoServiceClient = videoServiceClient;
  }

  handle(request, response, headers) {
    const contentLength = parseInt(request.headers['content-length'], 10);
    if (contentLength > 500000000) { // 500 MB
      this.#writeResponse(response, headers, {
        statusCode: 400,
        data: {
          success: false,
          error: 'file size must be up to 500MB',
        },
      });
      return;
    }

    let videoFormatHasBeenValidated = false;
    let stream;

    const data = {};

    request.on('data', async (chunk) => {
      if (!videoFormatHasBeenValidated) {
        const validationResult = await this.#videoFormatValidationService(chunk);

        if (validationResult instanceof Error) {
          this.#writeResponse(response, headers, {
            statusCode: 500,
            data: {
              success: false,
              error: 'internal server error',
            },
          });
          return;
        }

        if (validationResult === false) {
          this.#writeResponse(response, headers, {
            statusCode: 400,
            data: {
              success: false,
              error: 'invalid media was provided, the file must be an mp4 file format',
            },
          });
          return;
        }

        videoFormatHasBeenValidated = true;

        stream = this.#videoServiceClient.UploadVideoStream((err, res) => {
          if (err) {
            this.#writeResponse(response, headers, {
              statusCode: 500,
              data: {
                success: false,
                error: 'internal server error',
              },
            });
            return;
          }

          data.success = true;
          data.videoId = res.id;
          data.message = 'the video has been uploaded';

          this.#writeResponse(response, headers, {
            statusCode: 200,
            data,
          });
        });
      }

      stream.write({ buff: chunk });
    });

    request.on('end', () => {
      stream?.end();

      if (!videoFormatHasBeenValidated) {
        this.#writeResponse(response, headers, {
          statusCode: 400,
          data: {
            success: false,
            error: 'mp4 video is required',
          },
        });
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  #writeResponse(response, headers, { statusCode, data }) {
    response.writeHead(statusCode, headers);
    response.write(JSON.stringify(data));
    response.end();
  }
}
