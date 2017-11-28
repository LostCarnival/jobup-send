import express from 'express';
import config from './config';

const app = express();

app.use(express.static('build'));
app.set('views', './build');

app.get('*', function (req, res) {
  res.sendFile(`${process.cwd()}/build/index.html`);
});

app.listen(config.appServerPort, function () {
  console.log(`App listening on port ${config.appServerPort}!`);
});