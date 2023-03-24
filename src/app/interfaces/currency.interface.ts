interface ExchangeResult {
    query: { 
        from:string,
        to:string,
        amount:number
     };
    result: number;
}

export { ExchangeResult }