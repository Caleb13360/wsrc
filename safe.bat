@echo off
setlocal
echo Running development Environment...
docker login
docker system prune -f
docker-compose up --build