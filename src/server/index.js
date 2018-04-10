import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import webpack from 'webpack';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import App from '../shared/App'
import routes from '../shared/routes'
import dev_config from '../../webpack.config.dev'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from '../shared/redux/middleware/thunk';
import reducers from '../shared/redux/reducers/combineReducers';

const env = process.env.NODE_ENV || 'development';
const app = express()

app.use(cors())
app.use(express.static("public"))

if(env === "development") { // development mode has hot replace funtion
    const dev_compiler = webpack(dev_config);
    app.use(webpackDevMiddleware(dev_compiler, {
        publicPath: dev_config.output.publicPath
    }));
    app.use(webpackHotMiddleware(dev_compiler, {
    }));
}

app.get("*", (req, res, next) => {

  const store = createStore(reducers, {}, applyMiddleware(thunk));

  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    let preloadedState = store.getState();

    const markup = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <link rel="stylesheet" href="./main.css">
          <script src="/bundle.js" defer></script>
          <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}</script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})
