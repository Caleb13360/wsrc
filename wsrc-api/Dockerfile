FROM node:latest
WORKDIR /app
COPY ./models ./models
WORKDIR /app/wsrc-api
COPY ./wsrc-api/package*.json ./
RUN npm ci
COPY ./wsrc-api .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
