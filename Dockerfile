FROM node:12-buster as builder
WORKDIR /app
ADD . /app
RUN npm config set registry https://registry.npm.taobao.org && \
    npm install -g cnpm && \
    npm install && \
    npm run replaceRoute && \
    npm run build

FROM jboesl/docker-nginx-headers-more:1.11.4-0.31
RUN rm -rf /etc/nginx/conf.d

COPY --from=builder /app/conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html
