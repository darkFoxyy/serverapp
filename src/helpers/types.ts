interface Currency {
    name : "PLN"|"RUB"|"USD"|"EUR"|"BYN"|"GBP"|"MDL"
}

interface Exchange {
    amount: number
    from: Currency
    to: Currency
}

interface ResultExc {
    error: boolean
    value? : number
    msg? : string
}

interface ResultQuota {
    error: boolean
    value?: {
        price: number
        volume: number
    }
    msg?: string
}

interface ResultSymbol {
    error: boolean
    value?: {
        symbol: string
        name: string
    }[]
    msg?: string
}


export {Currency, Exchange, ResultExc, ResultQuota, ResultSymbol}