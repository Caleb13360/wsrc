FROM node:22-alpine AS build
WORKDIR /app
COPY ./models ./models
WORKDIR /app/wsrc-admin
COPY ./wsrc-admin/package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY ./wsrc-admin .
RUN npm run build

FROM nginx:latest
COPY ./wsrc-admin/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/wsrc-admin/dist/wsrc-admin/browser /usr/share/nginx/html
EXPOSE 8080
