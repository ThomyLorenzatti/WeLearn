#!/bin/sh

cd ../WeLearn-api
npm i
npm start &

cd ../we-learn-front
npm i
npm run dev