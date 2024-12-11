FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . ./wsrc-app
COPY ./../models ./models
RUN npm run build

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/wsrc-app/dist/wsrc-app/browser /usr/share/nginx/html
EXPOSE 8080

# dont do this!
# docker build -t wsrc:0.3 .
# docker run -d -p 8080:8080 wsrc:0.3