"use strict";
exports.__esModule = true;
var fastify = require("fastify");
var api_1 = require("./helpers/api");
var server = fastify();
var home = function (req, reply) {
    reply.header('Content-Type', 'application/json').code(200);
    reply.send({ hello: 'world' });
};
var exchangeFunc = function (req, reply) {
    var body = req.body;
    try {
        api_1.exchange(body, function (result) {
            console.log(result);
            reply.send(result);
        });
    }
    catch (err) {
        console.log(err);
        reply.send({ error: true, msg: "Invalid input data" });
    }
};
var quoteFunc = function (req, reply) {
    var body = req.body;
    try {
        api_1.quote(body.name, function (result) {
            console.log(result);
            reply.send(result);
        });
    }
    catch (err) {
        console.log(err);
        reply.send({ error: true, msg: "Invalid input data" });
    }
};
var symbolSearchFunc = function (req, reply) {
    var body = req.body;
    try {
        api_1.symbolSearch(body, function (result) {
            console.log(result);
            reply.send(result);
        });
    }
    catch (err) {
        console.log(err);
        reply.send({ error: true, msg: "Invalid input data" });
    }
};
server.get('/', home);
server.post('/exchange', exchangeFunc);
server.post('/quota', quoteFunc);
server.post('/symbol_search', symbolSearchFunc);
server.get('*', function (req, reply) {
    reply.send({ error: "404, Not found" });
});
server.listen(3000, function (err) {
    if (err)
        throw err;
    console.log("server listening on 3000");
});
