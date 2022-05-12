FROM node:alpine

WORKDIR /we-learn-front/

# COPY we-learn-front/package.json ./
COPY we-learn-front/ ./

RUN npm i

WORKDIR /WeLearn-api/

# COPY WeLearn-api/package.json ./
COPY WeLearn-api/ ./

RUN npm i

WORKDIR /
COPY start.sh ./start.sh

run chmod +x start.sh
run ./start.sh

WORKDIR /we-learn-front/

run ls 
# WORKDIR /WeLearn-api/
# CMD ["npm", "start"]

# COPY start.sh ./start.sh

# CMD ["./start.sh"]
