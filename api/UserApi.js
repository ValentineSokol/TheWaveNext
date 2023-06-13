import request from './request'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";

export const UserApi = {
    checkUsername: (username) => {
        return request.get(`/users/username/${username}/available`)
    },
    register: (credentials) => request.post('/users', credentials),
    logIn: (credentials) => request.post('/auth/local', credentials),
    logOut: () => request.delete('/auth/logout'),
    getCurrentUser: () => request.get('/users/current'),
    getUser: (id) => request.get(`/users/${id}`),

}

export const useLocalAuth = (isLogin, { onSuccess, onError } = {}) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: isLogin ? UserApi.logIn : UserApi.register,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['currentUser'] });
            onSuccess();
        },
        onError
    });
    return mutation;
}
export const useCurrentUser = () => {
    const result = useQuery({
        key: ['currentUser'],
        queryFn: UserApi.getCurrentUser,
    });

    return { user: result.data, ...result };
};

export const useUser = (id, { initialData } = {}) => {
    const result = useQuery({
       queryKey: ['user', id],
       queryFn: () => UserApi.getUser(id),
       initialData
    });
    return { user: result?.data?.user, ...result };
}

export const useLogout = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn: UserApi.logOut,
      onSuccess: () => queryClient.setQueryData(['currentUser'], { isLoggedIn: false } )
  });
  return mutation.mutate;
};
