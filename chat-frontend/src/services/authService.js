import API from './api'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const AuthService = {
    login: (data) => {
        return API.post('/login', data)
            .then(({ data }) => {
                setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                toast.error('Invalid Credentials', {
                    position: toast.POSITION.BOTTOM_CENTER, autoClose:5000})
                throw err
            })
    },

    register: (data) => {
        return API.post('/register', data)
            .then(({ data }) => {
                setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },

    logout: () => {
        API.defaults.headers['Authorization'] = ''
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    },

    updateProfile: (data) => {
        const headers = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        return API.post('/users/update', data, headers)
            .then(({ data }) => {
                localStorage.setItem('user', JSON.stringify(data))
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },
}

const setHeadersAndStorage = ({ user, token }) => {
    API.defaults.headers['Authorization'] = `Bearer ${token}`
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
}

export default AuthService