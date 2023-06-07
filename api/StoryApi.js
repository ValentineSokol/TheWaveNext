import request from "@/api/request";
import {useMutation, useQuery} from "@tanstack/react-query";

export const StoryApi = {
    search: (query, entity) => request.post('/stories/search', { entity, query }),
    post: (payload) => request.post('/stories', payload)
};

export const usePostStory = () => {
    const mutation = useMutation({
        mutationFn: (payload) => StoryApi.post(payload)
    });

    return mutation;
}
