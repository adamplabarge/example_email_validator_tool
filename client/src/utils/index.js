import { HOST } from './constants'

export const makeUrl = (...rest) => [HOST, ...rest].join('/')