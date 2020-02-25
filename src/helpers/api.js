"use strict";
exports.__esModule = true;
var request = require("request");
var path = 'https://www.alphavantage.co/query?function';
var apiKey = 'NL3BVMKYMZ167F5R';
var exchange = function (_a, callback) {
    var amount = _a.amount, from = _a.from, to = _a.to;
    var url = path + "=CURRENCY_EXCHANGE_RATE&from_currency=" + from.name + "&to_currency=" + to.name + "&apikey=" + apiKey;
    request(url, function (error, res) {
        if (error)
            return callback({ error: true, msg: "No response" });
        var body = res.body;
        var info = JSON.parse(body);
        if (info["Error Message"])
            return callback({ error: true, msg: "Something went wrong, or this currency doesnt exist (that's the problem)" });
        var result = { error: false, value: amount * info['Realtime Currency Exchange Rate']["5. Exchange Rate"] };
        return callback(result);
    });
};
exports.exchange = exchange;
var quote = function (name, callback) {
    var url = path + "=GLOBAL_QUOTE&symbol=" + name + "&apikey=" + apiKey;
    request(url, function (error, res) {
        if (error)
            return callback({ error: true, msg: "No response" });
        var body = res.body;
        var info = JSON.parse(body);
        if (info["Error Message"])
            return callback({ error: true, msg: "This quote not exists please try harder to remmember it's name (or just search for it c: ))" });
        var result = {
            error: false,
            value: {
                price: info["Global Quote"]["05. price"],
                volume: info["Global Quote"]["06. volume"]
            }
        };
        return callback(result);
    });
};
exports.quote = quote;
var symbolSearch = function (_a, callback) {
    var name = _a.name, amount = _a.amount;
    var url = path + "=SYMBOL_SEARCH&keywords=" + name + "&apikey=" + apiKey;
    request(url, function (error, res) {
        if (error)
            return callback({ error: true, msg: "No response" });
        var body = res.body;
        var info = JSON.parse(body);
        if (info["Error Message"])
            return callback({ error: true, msg: "There is no such symbol" });
        var arr = info["bestMatches"].slice(0, amount);
        var resultArr = [];
        arr.forEach(function (element) {
            resultArr.push({
                symbol: element['1. symbol'],
                name: element['2. name']
            });
        });
        var result = {
            error: false,
            value: resultArr
        };
        return callback(result);
    });
};
exports.symbolSearch = symbolSearch;
