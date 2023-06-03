import request from "@/api/request";
import {useQuery} from "@tanstack/react-query";

export const StoryApi = {
    search: (query, entity) => request.post('/stories/search', { entity, query })
};
