import config from 'config';
import http from 'http';
import https from 'https';
import Koa from 'koa';
import koaBodyParser from 'koa-bodyparser';
import flash from 'koa-flash-simple';
import koaOverride from 'koa-override';
import passport from 'koa-passport';
import KoaSession from 'koa-session';
import ServeStatic from 'koa-static';
import Views from 'koa-views';
import path from 'path';
import { load } from './core/DecoratorKoa';
import DbConnect from './databases/DatabaseConnection';
import CheckHealth from './modules/health/MainCheckHealth';


const app = new Koa();

app.use(
  Views(`${__dirname}/views`, {
    map: {
      html: 'ejs',
    },
  })
);
app.proxy = true;
app.keys = ['some secret'];
app.use(KoaSession(app));

app.use(flash());

require('./auth');

app.use(passport.initialize());
app.use(passport.session());

app.use(koaBodyParser());
app.use(koaOverride());

app.use(async (ctx: any, next) => {
  ctx.state = {
    ...ctx.state,
    path: ctx.request.path,
  };
  if (ctx.method === 'GET') {
    ctx.state.flash = ctx.flash.get();
  }
  await next();
});
app.use(ServeStatic(`${__dirname}/public`));

DbConnect.connectDB().subscribe(() => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const apiRouter = load(path.resolve(__dirname, 'controllers'));
  app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
  // start Health
  CheckHealth.startHealthCheck();
});

const servers = config.get('servers');
http
  .createServer(app.callback())
  .listen(servers.http.port, servers.http.host, ListeningReporter);
https
  .createServer(app.callback())
  .listen(servers.https.port, servers.https.host, ListeningReporter);

function ListeningReporter() {
  const { address, port } = this.address();
  const protocol = this.addContext ? 'https' : 'http';
  console.log(`Listening on ${protocol}://${address}:${port}...`);
}
