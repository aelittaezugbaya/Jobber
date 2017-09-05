# Jobber

## Preparations(if you haven't already)

  1. install node.js https://nodejs.org and click the Install button
  2. install mongoDB http://mongodb.org and click Download MongoDB.
  3. install Nodemon
  ```sh
  npm install nodemon -g
  ```
  4. clone the project

  ```sh
  git clone https://github.com/aelittaezugbaya/Jobber.git
  ```
  5. go to the project folder
  6. run `npm install` or `npm i`

## How to start the app

How to use:

```sh
npm run [script name]
```

   We have several npm scripts:
   * **start**: launches front-end in development mode, it will watch for changes in folder `frontend` and refresh the page
   * **backend-dev**: launches back-end in development mode, it will watch for changes in backend code and relaunch server
   * **backend**: launches back-end
   * **build**: builds front-end and outputs results to folder `public`

   **Note:** Folder `public` is not included in repository, you have to run `npm run build` to get it.

## Default ports

### Front-end
If you run `npm start` then front-end will run on `http://localhost:8080`

### Back-end
If you run `npm run backend` or `npm run backend-dev` then back-end will run on `http://localhost:3000`. Built front-end from folder `public` also is hosted on this port.

###Proxy
If you run `npm start` and `npm run backend`/`npm run backend-dev` then requests to `http://localhost:8080/api` will redirected to `http://localhost:3000/api`. 
