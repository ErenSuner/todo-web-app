# Use an official node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and the package-lock.json files to the container
COPY package*.json .

# Install the dependencies
# Bu dosyalarımza erişimi olduğu için direkt olarak dependncies leri getirecek
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs in
EXPOSE 5000

# Define the command to run the application
CMD ["node", "./src/server.js"]