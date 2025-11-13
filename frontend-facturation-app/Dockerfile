#Stage 1: Compile and build the Angular application
#We will use an official Node.js runtime as a base image
FROM node:latest as build
#Set the working directory in the container
WORKDIR /usr/local/app
#Copy the code source files into the container
COPY ./ /usr/local/app
#Install the dependencies
RUN npm install
#Generate the build of the application
RUN npm run build
#Stage 2: Serve the application with Nginx
#We will use an official Nginx image as a base image
FROM nginx:latest
#Copy the build files from the previous stage to the Nginx html directory
COPY --from=build /usr/local/app/dist/frontend-facturation-app/browser /usr/share/nginx/html
#Expose port 80 to access the application
EXPOSE 80


