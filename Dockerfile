FROM node
WORKDIR /SRC3
COPY . .

EXPOSE 7474
CMD node server2.js