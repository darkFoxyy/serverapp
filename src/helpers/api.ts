import { Currency, Exchange, ResultExc, ResultQuota, ResultSymbol } from './types'
import * as request from 'request'

const path: string = 'https://www.alphavantage.co/query?function'
const apiKey: string = 'NL3BVMKYMZ167F5R'

const exchange = ({ amount, from, to }: Exchange, callback) => {
    const url = `${path}=CURRENCY_EXCHANGE_RATE&from_currency=${from.name}&to_currency=${to.name}&apikey=${apiKey}`
    request(url, (error, res) => {
        if (error) return callback({ error: true, msg: "No response" })

        const body = res.body
        const info = JSON.parse(body)

        if (info["Error Message"]) return callback({ error: true, msg: "Something went wrong, or this currency doesnt exist (that's the problem)" })

        const result: ResultExc = { error: false, value: amount * info['Realtime Currency Exchange Rate']["5. Exchange Rate"] }

        return callback(result)

    }
    )

}

const quote = (name: string, callback) => {
    const url = `${path}=GLOBAL_QUOTE&symbol=${name}&apikey=${apiKey}`
    request(url, (error, res) => {
        if (error) return callback({ error: true, msg: "No response" })

        const body = res.body
        const info = JSON.parse(body)

        if (info["Error Message"]) return callback({ error: true, msg: "This quote not exists please try harder to remmember it's name (or just search for it c: ))" })

        const result: ResultQuota = {
            error: false,
            value: {
                price: info["Global Quote"]["05. price"],
                volume: info["Global Quote"]["06. volume"]
            }
        }

        return callback(result)

    })
}

const symbolSearch = ({ name, amount }, callback) => {
    const url = `${path}=SYMBOL_SEARCH&keywords=${name}&apikey=${apiKey}`
    request(url, (error, res) => {
        if (error) return callback({ error: true, msg: "No response" })

        const body = res.body
        const info = JSON.parse(body)

        if (info["Error Message"]) return callback({ error: true, msg: "There is no such symbol" })
        let arr = info["bestMatches"].slice(0, amount)
        const resultArr: { symbol: string, name: string }[] = []
        arr.forEach(element => {
            resultArr.push({
                symbol: element['1. symbol'],
                name: element['2. name']
            })
        });
        const result: ResultSymbol = {
            error: false,
            value: resultArr
        }

        return callback(result)

    })
}

export { exchange, quote, symbolSearch }