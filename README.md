🎉4-year-teaser🎉
=================

An anniversary website embedded with a minimal authentication mechanism and a coupon system.

## Installation

Running the server requires
- [NodeJS v6.2.2](https://nodejs.org/) (or possibly lower)
- [npm v3.10+](https://www.npmjs.com/)
- [GulpJS v3.9+](https://github.com/gulpjs/gulp)
- a [Redis v3.2+](https://github.com/antirez/redis) database server running and listening to port 6379

Clone this repo
```
$ git clone https://github.com/shangdrk/4-year-teaser
```

and build it with npm and gulp
```
$ cd 4-year-teaser
$ npm install
$ gulp server
```

The gulp task creates a build folder under the project directory and runs the server afterwards.
A `secrets.js` file will be generated under `./server`. It contains app secrets used for cookie session initiation and authentication purposes.

To skip authentication, change `process.env.MODE` in `./server/server.js` to something other than `'development'` and rebuild.

Now the website is available at `http://localhost:8000`.

## Development

### app data and secrets

### redis configuration

## License

## Todo List
- `<Greeting />` should be used as a general-purpose component that connects two content components together
- prompt user to confirm default username before building coupons
- change current authentication mechanism so that server looks up session info instead of relying on post parameters
- HTTPS connections
- load balancer with nginx?

