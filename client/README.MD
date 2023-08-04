# Client Application Documentation

## How to Run the Client Application
To execute the client application, follow these steps:

1. Clone the project repository.
2. Navigate to the `client` directory:
   ```bash
   cd client
   ```
3. Execute the start_development.sh script:
   ```bash
   ./start_development.sh
   ```
    This script will create and start a container, and it will provide you with a shell inside the container environment.
    Note: If you prefer, you can customize the application before starting it by making necessary changes. To start the application without customization, simply run npm start

## Usage

#### IMPORTANT: The server must be running for the client to function properly.
### Video Upload
> You can upload videos to the server using a HTTP POST request to this client.
 - Method: POST
 - Endpoint: http://localhost:3000/
 - Content-Type: video/mp4
> Example using cURL:
   ```bash
   curl -X POST http://localhost:3000 -H 'Content-Type: video/mp4' --data-binary '@/your/path/file.mp4'
   ```

### Video Reprodution
> To download videos from the server, you can use your web browser to reproduce the video.
 - Endpoint: http://localhost:3000/{UPLOADED_VIDEO_ID}

## Additional Notes

    Make sure the server is running before attempting any client-side operations.
    Replace {UPLOADED_VIDEO_ID} in the download URL with the actual ID of the video you wish to reproduce.
