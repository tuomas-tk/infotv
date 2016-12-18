# infotv

Author: Tuomas Karjalainen



## Developing

1. You need to have Node.js installed
2. You need to have PostgreSQL installed
    * You need to set environment variable `DATABASE_URL` to point to the db server
    * For example in linux: `export DATABASE_URL=postgresql://user:password@localhost/database`

2. Clone the repository from GitHub
    * `git clone https://github.com/tuomas-tk/infotv.git`
3. Run `npm install`
4. Run 'npm start:dev' (see other commands below)

### Avaible npm commands
_Run with `npm run [COMMAND]`_

* server
    * Start the node.js server (check localhost:3000)
* start
    * Shorthand for `npm run server`
    * You can use just `npm start`, no need for `npm run start`
* serve
    * Start Browsersync, proxying the server in _localhost:3000_
* webpack
    * Compile the frontend code (from _client/src/*.{js|vue}_ to _client/build/js/bundle.js_)
* webpack:watch
    * Run webpack with flag `--watch`, so it automatically recompiles the frontend js/vue code on save
* start:dev
    * Run `npm run server` AND `npm run serve` AND `npm run webpack:watch`
    * **This is what you usually use when developing**
