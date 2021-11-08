FROM node:14-alpine
WORKDIR /usr/local/application/
ENV PORT=4001
COPY package.json package-lock.json ./
RUN apk add --no-cache bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN npm install && npm cache clean --force
COPY . .
CMD ["node", "app.js"]
