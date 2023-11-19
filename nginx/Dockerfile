FROM nginx:latest

COPY app.conf /etc/nginx/conf.d/app.conf
COPY temp.conf /etc/nginx/conf.d/temp.conf
COPY certcheck.sh ./


EXPOSE 80
EXPOSE 443

RUN sh certcheck.sh

CMD [ "nginx", "-g", "daemon off;" ]