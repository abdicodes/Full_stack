FROM node:16
  
WORKDIR /usr/src/app

COPY . .
RUN npm ci 

RUN npm run tsc
  
CMD npm start