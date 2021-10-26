FROM node:14

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV MONGODB_URI mongodb://project-blue-frame-mongo:27017/blueFrame

COPY package.json /app/package.json
RUN npm install
COPY ./src /app/src

EXPOSE 5000

CMD [ "node", "src/index.js" ]
