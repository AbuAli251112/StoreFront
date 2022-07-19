# Storefront Backend Project

## Getting Started

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend.
This application has APIs for Users, Products, and Orders.

## Installing

Simply, run the following command to install the project dependencies:
(yarn) Or (npm install)

## DataBase Config

The API connects to a postgres database. As a first step, it is necessary to create two databases (development and test) on your local machine. Run the command psql postgres in terminal to open the postgres CLI. Then run the following:

CREATE USER storefront_user WITH PASSWORD 'YOUR_PASSWORD_HERE';
CREATE DATABASE storefront_backend_dev;
\c storefront_backend_dev;
GRANT ALL PRIVILEGES ON DATABASE storefront_backend_dev TO storefront_user;
CREATE DATABASE storefront_backend_test;
\c storefront_backend_test;
GRANT ALL PRIVILEGES ON DATABASE storefront_backend_test TO storefront_user;

To make sure the API can connect to the db it is necessary to create a database.json file with the following format

{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "storefront_backend_dev",
    "user": "storefront_user",
    "password": 'YOUR_PASSWORD_HERE'
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "storefront_backend_test",
    "user": "storefront_user",
    "password": 'YOUR_PASSWORD_HERE'
  }
}

## Run Migration

Note: Install db-migrate Globally
npm i -g db-migrate

run (db-migrate up) to migrate the database

## Prepare Environment Variables

add a .env file in the root directory and set the missing ### environment parameters

DATABASE_HOST=127.0.0.1
DATABASE_DEV=storefront_backend_dev
DATABASE_TEST=storefront_backend_test
DATABASE_USER=###
DATABASE_PASSWORD=###
BCRYPT_PASSWORD=###
SALT_ROUNDS=10
TOKEN_SECRET=###
ENV=test

## Ports

server will start on port 3000 and the database on port 5432

## Start App

Run (yarn watch) or (npm run watch) To Start App

## Test App

Run (yarn test) Or (npm run test) To Test App

## How To Use 

The database schema and and API route information can be found in the REQUIREMENT.md
