FROM node:latest AS build
WORKDIR /app
COPY ./models ./models
WORKDIR /app/wsrc-api
COPY ./wsrc-api/package*.json ./
RUN npm ci
COPY ./wsrc-api .
EXPOSE 3000
CMD ["npm", "start"]
