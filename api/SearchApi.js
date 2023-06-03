import request from "@/api/request";
import {useQuery} from "@tanstack/react-query";
import { StoryApi } from "@/api/StoryApi";

export const SearchApi = {
    checkUsername: (username) => {
        return request.get(`/users/username/${username}/available`)
    },
    search: (term, entity, options) => request.get(`/search/${term}`, options)
};

export const useSearch = (term, entity = 'all', { enabled }) => {
    const queryFn = entity === 'all' ? SearchApi.search : StoryApi.search;
    const result = useQuery({
        queryKey: ['search', term],
        queryFn: ({ signal }) => queryFn(term, entity, { signal }),
        enabled
    });

    return { matches: result?.data?.matches, ...result };
}
