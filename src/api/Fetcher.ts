import axios from 'axios'
import { METHOD } from '@customTypes/CustumTypes'

axios.defaults.baseURL = 'https://port-0-node-word-book-7hqac2alhjwi8bq.sel4.cloudtype.app'
// axios.defaults.baseURL = 'http://localhost:8000'

export const fetcher = async (method: METHOD, url: string, ...rest: { [key: string]: any }[]) => {
    const res = await axios[method](url, ...rest)
    return res.data
}