import axios, { type AxiosPromise } from "axios"
import type { DishData } from "../interface/DishData";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const API_URL = 'http://localhost:8080';

const postData = async (data: DishData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/menu', data);
    return response;
}

export function useDishDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dish-data'] })
    }
})

return mutate;
}