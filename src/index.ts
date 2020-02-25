import { ResultExc, ResultQuota, ResultSymbol } from './helpers/types'
import * as fastify from 'fastify'
import * as http from 'http'
import { exchange, quote, symbolSearch } from './helpers/api'

const server = fastify()


const home = (req: fastify.FastifyRequest<http.IncomingMessage>,
    reply: fastify.FastifyReply<http.ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)
    reply.send({ hello: 'world' })
}

const exchangeFunc = (req, reply) => {
    const body = req.body

    try {
        exchange(body, (result: ResultExc) => {
            console.log(result)
            reply.send(result)
        })
    }
    catch (err) {
        console.log(err)
        reply.send({ error: true, msg: "Invalid input data" })
    }
}

const quoteFunc = (req, reply) => {
    const body = req.body

    try {
        quote(body.name, (result: ResultQuota) => {
            console.log(result)
            reply.send(result)
        })
    }
    catch (err) {
        console.log(err)
        reply.send({ error: true, msg: "Invalid input data" })
    }
}

const symbolSearchFunc = (req, reply) => {
    const body = req.body

    try {
        symbolSearch(body, (result: ResultSymbol) => {
            console.log(result)
            reply.send(result)
        })
    }
    catch (err) {
        console.log(err)
        reply.send({ error: true, msg: "Invalid input data" })
    }
}

server.get('/', home)
server.post('/exchange', exchangeFunc)
server.post('/quota', quoteFunc)
server.post('/symbol_search', symbolSearchFunc)

server.get('*', (req, reply) => {
    reply.send({ error: "404, Not found" })
})

server.listen(3000, err => {
    if (err) {
        throw err
    }

    console.log(`server listening on 3000`)
})


