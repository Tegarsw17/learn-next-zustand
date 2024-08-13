'use client'

import { useAuth } from '@/store/useAuth'
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react'

function Login() {
    const router = useRouter();
    const { isAuthenticated, error, loading, setUsername, setPassword, login } = useAuth(useShallow((state) => ({ isAuthenticated: state.isAuthenticated, error: state.error, loading: state.loading, setUsername: state.setUsername, setPassword: state.setPassword, login: state.login })))
    const handleSubmit = async () => {
        await login();
    };

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated])

    return (
        <div>
            <h1 className='text-3xl'>Ini adalah halaman login</h1>
            {error && (
                <div className='text-red-500'>{error}</div>
            )}
            <div className='flex flex-col gap-2 w-1/5 m-2'>
                <input className='h-7 text-black p-2' type='text' name='username' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
                <input className='h-7 text-black p-2' type='text' name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <button className='bg-white text-black' onClick={handleSubmit}>{loading ? "Loading..." : "Login"}</button>
            </div>
        </div>
    )
}

export default Login