var router = require("routes-router")(); 

router.addRoute("/*", require('st')({
  path: __dirname + "/public",
  index:'/index.html'
}));

require('http').createServer(router).listen(3000);
