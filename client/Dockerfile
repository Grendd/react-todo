FROM node:16-alpine as build
WORKDIR /app

COPY . .
RUN npm install --only=prod
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]