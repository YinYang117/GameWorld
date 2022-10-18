In package.json, were changing from heroku to render

  "scripts": {
    "heroku-postbuild": "npm run build --prefix frontend",
	...
	"start": "npm start --prefix backend"
  },


  "scripts": {
    "render-postbuild": "npm run build --prefix frontend",
	...
	"start": "npm start --prefix backend",
    "build": "npm run build --prefix backend"
  },
