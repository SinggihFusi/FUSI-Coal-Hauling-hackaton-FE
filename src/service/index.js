import { w3cwebsocket } from "websocket";

export const baseUrlApi = 'http://localhost:2000';
export const baseUrlApiSebelah = 'http://54.251.95.147';
export const baseWs = 'ws://127.0.0.1:2000';

class CommonService {

    getUser = () => {
        const user = localStorage.getItem('user')
        if (user) return JSON.parse(user)
    }

    setUser = (data) => {
        const user = { name: data }
        localStorage.setItem('user', JSON.stringify(user))
    }

    removeUser = () => {
        localStorage.removeItem('user')
    }

    getData = async ({ url = baseUrlApi, path = '/' }) => {
        return await this.fetchData({
            method: 'GET',
            url: `${url}${path}`
        });
    }

    postData = async ({ url = baseUrlApi, path = '/', data = {} }) => {
        return await this.fetchData({
            data: data,
            method: 'POST',
            url: `${url}${path}`
        });
    }

    fetchData = async ({ url = baseUrlApi, method = 'GET', data = null, isJson = true }) => {
        let headers = {};
        if (isJson) headers = { ...headers, 'Content-Type': 'application/json' };

        let conf = {
            method: method,
            headers: headers
        };
        if (data) conf = { ...conf, body: isJson ? JSON.stringify(data) : data }

        const response = await fetch(url, conf);
        const res = await response.json();
        
        return res;
    }

    wsConnect = () => {
        return new w3cwebsocket(baseWs);
    }

}

export default CommonService