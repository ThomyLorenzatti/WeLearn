# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /we-learn-front

# add `/we-learn-front/node_modules/.bin` to $PATH
ENV PATH /we-learn-front/node_modules/.bin:$PATH

# install app dependencies
COPY /we-learn-front/package.json ./
COPY /we-learn-front/package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# start app
CMD ["npm", "run", "dev"]
