# Jelisa Iglesias
# Using the node:19-slim version to save space
FROM node:19-slim 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 
# Equals to COPY /src/ /app/

CMD ["npm", "start"]