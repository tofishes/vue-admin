const log = require('t-log');
const path = require('path');
const express = require('express');
// const favicon = require('serve-favicon');
const compression = require('compression');
const coc = require('route-coc');

const app = express();

// 设置gzip压缩
app.use(compression());
// app.use(favicon('./favicon.ico'));

const assetsPath = '/assets';
const locals = {
  cssPath: `${assetsPath}/css`,
  jsPath: `${assetsPath}/js`,
  imgPath: `${assetsPath}/image`,
  staticPath: `${assetsPath}/static`,
};
['js', 'css'].map(item => {
  const map = require(`${__dirname}${assetsPath}/${item}-map.json`); // eslint-disable-line
  locals[`${item}Map`] = map;

  return item;
});

app.use(assetsPath, (req, res) => {
  express.static(`${__dirname}${assetsPath}`)(req, res, () => {
    res.status(404).send();
  });
});

app.use((req, res, next) => {
  res.locals.app = req.app;

  Object.keys(locals).map(name => {
    res.locals[name] = locals[name];

    return name;
  });

  next();
});

// use coc
coc(app);

app.use((req, res) => {
  res.status(404).render('404');
});

const port = 8888;
app.listen(port, () => {
  const startInfo = `server run at http:\/\/localhost:${port}`;

  log.info(startInfo);
});
