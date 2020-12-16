import axios from 'axios'

export function request(config) {

    const instance = axios.create({
        // baseURL: '/api',
        baseURL: '/proxy',
        timeout: 5000,
        headers: {
            // res.header("Access-Control-Allow-Origin", "*");
            // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            // res.header("Access-Control-Allow-Headers", "X-Requested-With");
            // res.header('Access-Control-Allow-Headers', 'Content-Type');
            // No 'Access-Control-Allow-Origin' header is present on the requested resource.
            // No 'Access-Control-Allow-Origin' header is present on the requested resource.
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers': 'X-Requested-With',
            // 'Access-Control-Allow-Headers': 'Content-Type',
        }
    });



    return instance(config)
}