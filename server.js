const jsonServer = require('json-server');
const { resolve } = require('path');
const server = jsonServer.create();
const router = jsonServer.router('./database/index.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3001;
server.use(middlewares);
server.use(jsonServer.rewriter({
    "/boards/MAIN/tasks/:id": "/board_main_tasks/:id",
    "/boards/DEVELOPMENT/tasks/:id": "/board_development_tasks/:id",
    "/boards/MAIN/tasks": "/board_main_tasks/",
    "/boards/DEVELOPMENT/tasks": "/board_development_tasks/"
}));
server.use(router);
server.listen(PORT, () => {
  console.log('Server is running');
});

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('build'));
app.get('*', (req, res) => {
  req.sendFile(path, resolve(path.resolve(__dirname,  'build', 'index.html')))
});
app.listen(5000, (err) => {
  console.log('server runnning on 5000');
});
