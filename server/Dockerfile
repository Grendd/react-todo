FROM node:16-alpine
WORKDIR /app
#COPY --from=builder /app/dist /app
COPY . .
RUN #apk --no-cache add --virtual builds-deps build-base python
RUN npm install

EXPOSE 5000
USER node
CMD ["node", "index.js"]