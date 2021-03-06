import jwt from 'jsonwebtoken'
import client from './api.client'


const setToken = (data) => {
    localStorage.setItem("_tkn", data.token)
    return {islogged: true}
}

const getToken = () => {
    return localStorage.getItem("_tkn")
}

const isValidAuthToken = () => {
    try {
        let isValid = false;
        const token = localStorage.getItem('_tkn');
        let decodedToken = jwt.decode(token, { complete: true });
        let dateNow = new Date(); 
        if ((decodedToken.payload.exp * 1000) > dateNow.getTime()) isValid = true;
        return isValid  
    } catch (error) {
        return false;
    }
}

const isLoggedIn = () => {
    return isValidAuthToken()
}

const logout = () => {
    localStorage.removeItem("_tkn")
    return Promise.resolve({islogged: false})
}

const login = (values) => {
    return client('user/login', values).then(data => setToken(data))
}

const register = (values) => {
    return client('user/register', values)
}

const getStock = (query) => {
    return client(`stocks/authed/${query}`)
}


export { login, register, getToken, isLoggedIn, logout, getStock }