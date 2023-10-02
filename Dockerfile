FROM node:18-bookworm-slim
LABEL authors="ditya"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]