# Use an official Node.js runtime as a parent image
FROM node:18-alpine as BUILD_IMAGE

# Set the working directory in the container
WORKDIR /app/react-app

# Copy package.json
COPY package.json .

RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app runs on
EXPOSE 5173

RUN cd /app/react-app

# Command to run the application
CMD ["npm", "run", "dev"]
# RUN npm run dev

