export interface AggregateFact {
    dimension : string
    types : string []
    gteDate ?: string
    lteDate ?: string
    includeMetrics : string[]

}
