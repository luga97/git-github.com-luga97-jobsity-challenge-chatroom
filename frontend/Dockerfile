
FROM node:20 AS build
WORKDIR /app

ENV VITE_API_URL="http://localhost:5000"


COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
