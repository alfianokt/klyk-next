FROM node:17

# copy to temp folder
COPY package.json /tmp/package.json
# run npm install
RUN cd /tmp && npm install
# copy modules
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
# copy app files
COPY . /app
RUN cd /app && npm run build

EXPOSE 3000
CMD ['npm', 'run', 'start']
