@echo off
setlocal
echo Installing Dependencies...
cd test-api
call npm install
cd ..
cd wsrc-app
call npm install
echo Running development Environment...
docker login
docker system prune -f
docker-compose up --build