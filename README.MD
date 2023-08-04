## About
Welcome! This project focuses on expertly managing video uploads and facilitating real-time video playback. The application is structured into two primary layers: the client and the server:

- client: The client app assumes the responsibility of facilitating communication with the gRPC server. In this particular illustration, a basic HTTP server was developed for demonstration purposes. However, it's important to note that the client application can be seamlessly integrated with various user interfaces, such as frontend web applications, mobile apps, command-line interfaces, and more.
> For installing and using the client app, please refer to the README inside the 'client' directory.

- server: The server functions as a buffer stream receiver for video data, which is stored in a local directory. Additionally, it transmits buffered video streams to clients for playback. In this example, the videos are stored locally, but the same concept can be extended to include sending these buffers to AWS S3 using multipart upload or similar services.
> For installing and using the server app, please refer to the README inside the 'server' directory.

## Tech
##### Client Layer:
-   Node.js: The client application is built using Node.js, a popular and versatile JavaScript runtime, enabling seamless communication with the gRPC server and providing a robust foundation for handling various user interfaces.
-   Node Stream: Node Streams are employed to efficiently process video data, allowing for optimized and low-latency video transmission between the client and server.
-   Node HTTP: The client layer also utilizes Node's HTTP module, which plays a key role in handling HTTP requests and responses, making it a fundamental part of the communication process.

##### Server Layer:
-   Golang: The server layer is implemented in Golang, a powerful and efficient programming language, well-suited for handling concurrent tasks, including buffering and streaming video data.
-   gRPC: To facilitate communication between the client and server, gRPC is employed as the high-performance, language-agnostic Remote Procedure Call (RPC) framework. It ensures fast and reliable data exchange, making real-time video playback a seamless experience.

