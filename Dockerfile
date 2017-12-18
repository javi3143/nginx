FROM ubuntu:14.04
MAINTAINER Javier Ruiz "j.ruizperez@dundee.ac.uk"
ENV REFRESHED_AT 2015-28-04
RUN apt-get update
RUN apt-get install -y nginx
RUN mkdir -p /var/www/html
ADD nginx/global.conf /etc/nginx/conf.d/
ADD nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["/usr/sbin/nginx"]
