FROM node:16.15

COPY . /app/
WORKDIR /app/
EXPOSE 3000 3000
RUN npm install
CMD ["npm","run", "start"]