#!/bin/bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql.service
sudo echo "listen_addresses = '*'" >> /etc/postgresql/14/main/postgresql.conf
sudo echo "host    all             all              0.0.0.0/0                       md5" >> /etc/postgresql/14/main/pg_hba.conf
sudo systemctl restart postgresql