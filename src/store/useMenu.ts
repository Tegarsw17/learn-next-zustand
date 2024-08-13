import { ApiResponse, ErrorResponse, MenuItem, PaginationData } from '@/types/menuType'
import { create } from 'zustand';

interface DataState {
    data: MenuItem[];
    pagination: Omit<PaginationData, 'Data'>;
    error: string | null;
    loading: boolean;
    currentPage: number;
    fetchData: (page?: number) => Promise<void>;
}

const useMenu = create<DataState>((set) => ({
    data: [],
    pagination: {
        perPage: 0,
        total: 0,
        currentPage: 0,
        previousPage: 0,
        nextPage: 0,
    },
    error: null,
    loading: false,
    currentPage: 1,
    fetchData: async (page = 1) => {
        set({ loading: true });
        try {
            const response = await fetch(`https://api.mudoapi.tech/menus?page=${page}`); // Replace with your API endpoint
            if (response.ok) {
                const result: ApiResponse = await response.json();
                set({
                    data: result.data?.Data || [],
                    pagination: {
                        perPage: result.data?.perPage || 0,
                        total: result.data?.total || 0,
                        currentPage: result.data?.currentPage || 0,
                        previousPage: result.data?.previousPage || 0,
                        nextPage: result.data?.nextPage || 0,
                    },
                    error: null,
                    currentPage: page
                });
            } else {
                const errorResult: ErrorResponse = await response.json();
                set({
                    data: [],
                    pagination: {
                        perPage: 0,
                        total: 0,
                        currentPage: 0,
                        previousPage: 0,
                        nextPage: 0,
                    },
                    error: errorResult.message,
                });
            }
        } catch (error) {
            console.error('Failed to fetch data', error);
            set({ error: 'Failed to fetch data' });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useMenu;