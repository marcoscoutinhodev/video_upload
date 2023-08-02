if ["$(docker network ls | grep "video_upload_network")" != ""]
then
    docker network create video_upload_network
fi

docker-compose -f docker-compose-dev.yml up -d && \
  docker exec -it video_upload_client bash