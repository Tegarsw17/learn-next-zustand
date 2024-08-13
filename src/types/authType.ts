export interface LoginSuccessResponse {
    success: true;
    messageTitle: string;
    message: string;
    responseTime: string;
    data: {
        token: string;
    };
}

export interface LoginErrorResponse {
    success: false;
    messageTitle: string;
    message: string;
    responseTime: string;
    data: null;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;