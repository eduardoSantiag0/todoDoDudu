FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_API_URL='http://localhost:8080'

RUN npm run build
# RUN npm run dev

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
