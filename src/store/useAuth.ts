import { create, StateCreator } from 'zustand';
import { LoginResponse } from '@/types/authType';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';
interface AuthState {
    isAuthenticated: boolean;
    error: string | null;
    loading: boolean;
    username: string;
    password: string;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    login: () => Promise<void>;
    logout: () => void;
}

interface TokenState {
    token: string | null;
    setToken: (token: string | null) => void;
}

const useAuth = create<AuthState>(
    (set, get) => ({
        isAuthenticated: false,
        error: null,
        loading: false,
        username: '',
        password: '',
        setUsername: (username) => set({ username }),
        setPassword: (password) => set({ password }),
        login: async () => {
            const { username, password } = get();
            set({ loading: true });
            try {
                const response = await fetch('https://api.mudoapi.tech/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
                const result: LoginResponse = await response.json();
                if (response.ok && result.success) {
                    useTokenStore.getState().setToken(result.data.token);
                    set({
                        isAuthenticated: true,
                        error: null,
                    });
                } else {
                    useTokenStore.getState().setToken(null);
                    set({
                        isAuthenticated: false,
                        error: result.message,
                    });
                }
            } catch (error) {
                set({ error: 'Login failed. Please try again.', loading: false });
            } finally {
                set({ loading: false });
            }
        },
        logout: () => {
            useTokenStore.getState().setToken(null);
            set({
                isAuthenticated: false,
                username: '',
            });
        },
    }),
);

type MyPersist = (
    config: StateCreator<TokenState>,
    options: PersistOptions<TokenState>
) => StateCreator<TokenState>

const useTokenStore = create<TokenState>(
    (persist as MyPersist)(
        (set) => ({
            token: null,
            setToken: (token) => set({ token }),
        }),
        {
            name: 'auth-token',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export { useAuth, useTokenStore };
