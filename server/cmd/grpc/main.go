package main

import (
	"net"
	"os"
	"path/filepath"

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
}

func main() {
	videoManangmentService := service.NewVideoManagement()

	grpcServer := grpc.NewServer()
	pb.RegisterVideoServiceServer(grpcServer, videoManangmentService)

	reflection.Register(grpcServer)

	lis, err := net.Listen("tcp", ":4000")
	if err != nil {
		panic(err)
	}

	if err := grpcServer.Serve(lis); err != nil {
		panic(err)
	}
}
