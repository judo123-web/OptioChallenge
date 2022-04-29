export interface FindFact {
    dimension : string
    types : Array<string>
    gteDate ?: string
    lteDate ?: string
    sortBy ?: string
    sortDirection ?: string
    pageIndex ?: number
    pageSize ?: number
    includes : Array<string>
    excludes ?: Array<string>

}
