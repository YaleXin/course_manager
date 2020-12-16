import { request } from './request.js'

export function getRandomKey() {
    return request({
        url: '/beforeLogin'
    })
}