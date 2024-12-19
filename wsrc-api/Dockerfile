FROM node:latest AS build
WORKDIR /app
COPY ./models ./models
WORKDIR /app/wsrc-api
COPY ./wsrc-api/package*.json ./
RUN npm ci
COPY ./wsrc-api .
EXPOSE 3000

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app /app
EXPOSE 8081
CMD ["sh", "-c", "npm start & nginx -g 'daemon off;'"]
