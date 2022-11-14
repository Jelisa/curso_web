FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 
# Equals to COPY /src/ /app/

CMD ["npm", "start"]