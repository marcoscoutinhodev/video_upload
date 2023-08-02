package main

import (
	"fmt"
	"net"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	"github.com/marcoscoutinhodev/video_upload/internal/pb"
	"github.com/marcoscoutinhodev/video_upload/internal/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func init() {
	videosPath, err := filepath.Abs("./videos")
	if err != nil {
		panic(err)
	}

	if _, err := os.Stat(videosPath); os.IsNotExist(err) {
		os.Mkdir(videosPath, os.ModePerm)
	}

	if err := godotenv.Load(); err != nil {
		panic(err)
	}
}

func main() {
	videoManangmentService := service.NewVideoManagement()

	grpcServer := grpc.NewServer()
	pb.RegisterVideoServiceServer(grpcServer, videoManangmentService)

	reflection.Register(grpcServer)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%s", os.Getenv("SERVER_PORT")))
	if err != nil {
		panic(err)
	}

	if err := grpcServer.Serve(lis); err != nil {
		panic(err)
	}
}
