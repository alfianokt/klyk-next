FROM node:17

# copy to temp folder
COPY package.json /tmp/package.json
# run npm install
RUN cd /tmp && npm install
# copy modules
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
# copy app files
COPY . /opt/app

EXPOSE 3000
CMD ['node', 'server.js']
