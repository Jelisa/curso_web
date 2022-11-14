FROM node:19-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 
# Equals to COPY /src/ /app/

EXPOSE 3000

CMD ["npm", "start"]