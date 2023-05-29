import request from './request'
import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";

export const UserApi = {
    checkUsername: (username) => {
        return request.get(`/users/username/${username}/available`)
    },
    register: (credentials) => request.post('/users', credentials),
    logIn: (credentials) => request.post('/auth/local', credentials),
    getCurrentUser: () => request.get('/users/current')

}

export const useLocalAuth = (isLogin, { onError, delay }) => {
    const [isLoading, setIsLoading] = useState(false);
    const prevIsLoading = useRef(null);
    const timeoutRef = useRef(null);

    const mutation = useMutation({
        mutationFn: isLogin ? UserApi.logIn : UserApi.register,
        onError
    });

    useEffect(() => {
        if (!mutation.isLoading && prevIsLoading.current && delay) {
            timeoutRef.current = setTimeout(() => setIsLoading(false), delay);
        } else {
            setIsLoading(mutation.isLoading);
        }
        prevIsLoading.current = mutation.isLoading;

        return () => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, [mutation.isLoading, delay]);

    return { ...mutation, isLoading };
};

export const useCurrentUser = () => {
    const result = useQuery({
        key: 'currentUser',
        queryFn: UserApi.getCurrentUser,
    });

    return { user: result.data, ...result };
}
