FROM node:16-alpine AS builder

COPY package*.json /


RUN npm set progress=false && npm config set depth 0 \
	&& npm install --no-install-recommends \
	&& mkdir /app \
	&& cp -r node_modules /app/

WORKDIR /app

COPY . .

ARG BUILD_ENV
ENV BUILD_ENV ${BUILD_ENV}

RUN node --max_old_space_size=2048 ./node_modules/@angular/cli/bin/ng build --prod --build-optimizer=false --output-path=dist --configuration=${BUILD_ENV} --prod

FROM node:16-alpine

ENV TZ=Asia/Bangkok
RUN apk add tzdata \
	&& ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
	&& echo $TZ > /etc/timezone

ARG CONTAINER_PORT
ARG BUILD_ENV
ENV CONTAINER_PORT ${CONTAINER_PORT}
ENV BUILD_ENV ${BUILD_ENV}
WORKDIR /app/

COPY frontend.js ${PM2_FILE}  /app/
COPY --from=builder /app/dist /app/dist

RUN npm config set unsafe-perm true
RUN npm install -g pm2 && npm install express express-winston winston helmet

EXPOSE ${CONTAINER_PORT}

CMD pm2 start pm2-${BUILD_ENV}.json --no-daemon