// src/types.ts

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    type: string;
    price: number;
    priceFormatted: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaginationData {
    perPage: number;
    total: number;
    currentPage: number;
    previousPage: number;
    nextPage: number;
    Data: MenuItem[];
}

export interface ApiResponse {
    success: boolean;
    messageTitle: string;
    message: string;
    responseTime: string;
    data: PaginationData | null;
}

export interface ErrorResponse {
    success: boolean;
    messageTitle: string;
    message: string;
    responseTime: string;
    data: null;
}
