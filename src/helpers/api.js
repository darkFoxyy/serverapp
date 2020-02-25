"use strict";
exports.__esModule = true;
var request = require("request");
var exchange = function (_a, callback) {
    var amount = _a.amount, from = _a.from, to = _a.to;
    var url = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + from.name + "&to_currency=" + to.name + "&apikey=NL3BVMKYMZ167F5R";
    request(url, function (error, res) {
        if (error)
            return callback({ error: true, msg: "No response" });
        var body = res.body;
        var info = JSON.parse(body);
        if (info["Error Message"])
            return callback({ error: true, msg: info["Error Message"] });
        var result = { error: false, value: amount * info['Realtime Currency Exchange Rate']["5. Exchange Rate"] };
        return callback(result);
    });
};
exports.exchange = exchange;
var quote = function (name, callback) {
    var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + name + "&apikey=NL3BVMKYMZ167F5R";
    request(url, function (error, res) {
        if (error)
            return callback({ error: true, msg: "No response" });
        var body = res.body;
        var info = JSON.parse(body);
        if (info["Error Message"])
            return callback({ error: true, msg: info["Error Message"] });
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
    var url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + name + "&apikey=NL3BVMKYMZ167F5R";
    request(url, function (error, res) {
        if (error)
            return callback({ error: true, msg: "No response" });
        var body = res.body;
        var info = JSON.parse(body);
        if (info["Error Message"])
            return callback({ error: true, msg: info["Error Message"] });
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
