# First stage: Build the application
FROM node:14-alpine as nodework
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5173
RUN npm run build
CMD [ "npm", "run" , "dev"]

# Second stage: Serve the application using Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /app/dist /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]