FROM node:14

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV POSTGRESDB_URI postgres://postgres:password@postgresdb:5432/blueframe

COPY package.json /app/package.json
RUN npm install
COPY ./src /app/src

EXPOSE 5000

CMD [ "node", "src/index.js" ]
