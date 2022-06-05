const express = require("express");
const app = express();
const fs = require("fs");
const frontEndPort = process.env.FE_PORT || 80;
const ssl = process.env.SSL ? process.env.SSL : true;
var expressWinston = require("express-winston");
var winston = require("winston");
const { constants } = require("crypto");
const path = require("path");
const helmet = require("helmet");
// Place the express-winston logger before the router.
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ]
  })
);
app.use(express.static(__dirname + "/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});
if (ssl == "false") {
  const http = require("http");
  http.createServer(app).listen(frontEndPort, "0.0.0.0", function(err) {
    console.log(`Ready on http://0.0.0.0:${frontEndPort}`);
  });
} else {
  var headers = {};
  // set header to handle the CORS
  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Headers"] =
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With";
  headers["Access-Contrl-Allow-Methods"] = "PUT, POST, GET, DELETE, OPTIONS";
  headers["Access-Control-Max-Age"] = "86400";
  headers["Content-Security-Policy"] = "default-src 'self'";
  const https = require("https");
  const key = fs.readFileSync(__dirname + "/ssl/server.key");
  const cert = fs.readFileSync(__dirname + "/ssl/server.crt");
  const options = {
    headers: headers,
    key: key,
    cert: cert,
    secureOptions:
      constants.SSL_OP_NO_TLSv1 |
      constants.SSL_OP_NO_TLSv1_1 |
      constants.SSL_OP_NO_TLSv2 |
      constants.SSL_OP_NO_SSLv3
  };
  https
    .createServer(options, app)
    .listen(frontEndPort, "0.0.0.0", function(err) {
      console.log(`> Ready on https://0.0.0.0:${frontEndPort}`);
    });
}