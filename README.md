# User Management
> Full stack demo CRUD app built with Express, React and TypeScript.

[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

## Premise

A simple User Management interface which lists current users in the system. Admins can add a new user, and update or delete existing users.

Originally commissioned as a take home assessment during a job interview, I've rebuilt this project to reflect new patterns and
technologies that I've adopted over time. Also the COVID-19 pandemic was a thing, so I had some extra time on my hands. 🦠 ⏰

_**Disclaimer:** I have not tested this in Internet Explorer, nor do I really care to as this is a personal project._

## Technologies Used

- **Frontend:** React, TypeScript, Material UI
- **Backend:** Node + Express, Overnight.js
- **Database:** Docker, MongoDB
- **CI/CD:** Github Actions

## Local Development

### Database and Server Setup

- Ensure `Docker` is installed and running
- From the project root, open your terminal and run `docker-compose up`
  - Seed data for `admins` and `users` should be populated in the database automatically
  - Server dependencies will be installed automatically and then the server will boot up on `http://localhost:3000`

### Client Setup

- In another terminal window, `cd` into the `client` directory and run `npm install`
- Run `npm start`
  - The application may be accessed in a web browser at `http://localhost:8080`

## Technical Requirements

> The runtime environment for this application requires `node >= 14.6.0` and `npm >= 6.14.7`.

## Configuration

> This application makes use of `ESLint`, `Stylelint` and `EditorConfig`. Each of these features requires
> an extension be installed in order to work properly with IDEs and text editors such as VSCode.
