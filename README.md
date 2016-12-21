# infotv

[![Build Status](https://travis-ci.org/tuomas-tk/infotv.svg?branch=master)](https://travis-ci.org/tuomas-tk/infotv)

---

**Backend:** Node.js with Express and PostgreSQL

**Frontend:** Vue.js (using Stylus and Pug)

---

## This is a school project, please contact before contributing!

---


## Developing

1. You need to have Node.js installed
2. You need to have PostgreSQL installed
    * You need to set environment variable `DATABASE_URL` to point to the db server
    * For example in linux: `export DATABASE_URL=postgresql://user:password@localhost/database`

2. Clone the repository from GitHub
    * `git clone https://github.com/tuomas-tk/infotv.git`
3. Run `npm install`
4. Run `npm start:dev` (see other commands below)


### Avaible npm commands
_Run with `npm run [COMMAND]`_

* `server`
    * Start the node.js server (check localhost:3000)
* `start`
    * Shorthand for `npm run server`
    * You can use just `npm start`, no need for `npm run start`
* `serve`
    * Start Browsersync, proxying the server in _localhost:3000_
* `webpack`
    * Compile the frontend code (from _client/src/*.{js|vue}_ to _client/build/js/bundle.js_)
* `webpack:watch`
    * Run webpack with flag `--watch`, so it automatically recompiles the frontend js/vue code on save
* `start:dev`
    * Run `npm run server` AND `npm run serve` AND `npm run webpack:watch`
    * **This is what you usually use when developing**


### Migrations

We use [db-migrate](https://www.npmjs.com/package/db-migrate) to make changes to the database structure. Check the [documentation](https://db-migrate.readthedocs.io/en/latest/) for additional information.

In a nutshell, you can find the db-migrate executable from `./node_modules/db-migrate/bin/db-migrate`. With it you can:

1. create migrations: `./node_modules/db-migrate/bin/db-migrate create [migrationname]`
2. execute the migrations: `./node_modules/db-migrate/bin/db-migrate up`
2. reverse the last migration: `./node_modules/db-migrate/bin/db-migrate down`
