import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';


const axiosSecure = axios.create({
    baseURL: 'https://microloan-request-server.vercel.app'
})

const useAxiosSecure = () => {
    const { user } = useAuth();
    useEffect(() => {
        axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user.accessToken}`
        })
    }, [user])

    return axiosSecure;
};

export default useAxiosSecure;