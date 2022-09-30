#!/bin/bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql.service