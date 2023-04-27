import axios from 'axios'
import { METHOD } from '@customTypes/CustumTypes'

axios.defaults.baseURL = 'http://localhost:8000'

export const fetcher = async (method: METHOD, url: string, ...rest: { [key: string]: any }[]) => {
    const res = await axios[method](url, ...rest)
    return res.data
}