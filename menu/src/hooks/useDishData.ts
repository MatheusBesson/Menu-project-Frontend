import axios, { type AxiosPromise } from "axios"
import type { DishData } from "../interface/DishData";
import { useQuery } from "@tanstack/react-query";


const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<DishData[]> => {
    const response = axios.get(API_URL + '/menu');
    return response;
}

export function useDishData() {
    const query = useQuery ({
        queryFn: fetchData,
        queryKey: ['dish-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}