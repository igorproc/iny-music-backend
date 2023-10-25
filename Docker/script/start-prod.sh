#!/bin/bash

npm run db:push

npm run prebuild && npm run build
npm run start:dev
