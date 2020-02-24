import { Currency, Exchange, ResultExc, ResultQuota, ResultSymbol } from './types'
import * as request from 'request'
import { stringify } from 'querystring'


const exchange = ({ amount, from, to }: Exchange, callback) => {
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from.name}&to_currency=${to.name}&apikey=NL3BVMKYMZ167F5R`
    request(url, (error, res) => {
        if (error) return callback({ error: true, msg: "No response" })

        const body = res.body
        const info = JSON.parse(body)

        if (info["Error Message"]) return callback({ error: true, msg: info["Error Message"] })

        const result: ResultExc = { error: false, value: amount * info['Realtime Currency Exchange Rate']["5. Exchange Rate"] }

        return callback(result)

    }
    )

}

const quote = (name: string, callback) => {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${name}&apikey=NL3BVMKYMZ167F5R`
    request(url, (error, res) => {
        if (error) return callback({ error: true, msg: "No response" })

        const body = res.body
        const info = JSON.parse(body)

        if (info["Error Message"]) return callback({ error: true, msg: info["Error Message"] })

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

const symbolSearch = ({name, amount}, callback) => {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=NL3BVMKYMZ167F5R`
    request(url, (error, res) => {
        if (error) return callback({ error: true, msg: "No response" })

        const body = res.body
        const info = JSON.parse(body)

        if (info["Error Message"]) return callback({ error: true, msg: info["Error Message"] })
        let arr =  info["bestMatches"].slice(0,amount)
        const resultArr: {symbol:string, name: string}[] =[]
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

export { exchange, quote, symbolSearch}