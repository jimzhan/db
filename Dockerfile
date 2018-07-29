FROM mariadb:latest

ENV DB_NAME $DB_NAME
ENV DB_HOST $DB_HOST
ENV DB_PORT $DB_PORT
ENV DB_USERNAME $DB_USERNAME
ENV DB_PASSWORD $DB_PASSWORD

# OS Foundations
RUN apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get install apt-utils net-tools htop vim -y

EXPOSE 3306
