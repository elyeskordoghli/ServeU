#!/bin/bash
read -p "Enter nodejs .env file name [example=.env.development]:" dotenv_file_name

dotenv_file_path="./../../envs/$dotenv_file_name"

export $(grep -v '^#' $dotenv_file_path | xargs)
default_db_username=$DATABASE_USER
default_db_password=$DATABASE_PASSWORD
default_db_name=$DATABASE_NAME
