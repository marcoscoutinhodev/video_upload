package service

import (
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"time"

	"github.com/gabriel-vasile/mimetype"
	"github.com/marcoscoutinhodev/video_upload/internal/pb"
)

type VideoManagement struct {
	pb.UnimplementedVideoServiceServer
}

func NewVideoManagement() *VideoManagement {
	return &VideoManagement{}
}

func (v *VideoManagement) UploadVideoStream(stream pb.VideoService_UploadVideoStreamServer) error {
	videoId := fmt.Sprint(time.Now().Unix())
	videoPath, err := filepath.Abs(fmt.Sprintf("./videos/%s.mp4", videoId))
	if err != nil {
		return err
	}

	file, err := os.Create(videoPath)
	if err != nil {
		return err
	}

	defer file.Close()

	videoFormatHasBeenValidated := false

	for {
		data, err := stream.Recv()
		if err != nil {
			if err == io.EOF {
				return stream.SendAndClose(&pb.VideoData{Id: videoId})
			}

			return err
		}

		if !videoFormatHasBeenValidated {
			mime := mimetype.Detect(data.GetBuff())
			if mime.Extension() != ".mp4" {
				os.Remove(videoPath)
				return errors.New("the file must be an mp4 file format")
			}

			videoFormatHasBeenValidated = true
		}

		_, err = file.Write(data.GetBuff())
		if err != nil {
			return err
		}
	}
}
