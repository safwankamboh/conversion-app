"use client";

import Link from "next/link";
import { FileText, Facebook, Mail, Lock } from "lucide-react";
import FormInput from "@/components/form-input";
import { useState } from "react";
import { login } from "@/lib/services/auth.service";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    
    const handleSubmit = async() => {
        setIsLoading(true);
        const paylaod = {
            email,
            password
        }
        try{
            const response = await login(paylaod)
            if(response && response.Success){
                console.log('res',response);
                const accessToken = response.Data.AccessToken;
                const userInfo = response.Data.User
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('userInfo',JSON.stringify(userInfo))
            }
            else{
                console.log('Something went wrong')
            }
        }catch(error){
            console.log('error',error)
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <div className="min-h-[calc(100vh-64px)] flex bg-gray-50 dark:bg-gray-900">
            {/* Left Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white dark:bg-gray-800">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Login to your account
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    {/* Social Logins */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm">
                            <Facebook className="w-5 h-5 text-blue-600" />
                            <span>Facebook</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>Google</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm">
                            <span>SSO</span>
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <FormInput
                                    type="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    leftIcon={Mail}
                                    size="md"
                                    fullWidth
                                    variant="default"
                                />
                            </div>

                            <div>
                                <FormInput
                                    type="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    placeholder="Password"
                                    leftIcon={Lock}
                                    size="md"
                                    fullWidth
                                    variant="default"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <Link
                                href="/forgot-password"
                                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02]"
                            onClick={handleSubmit}
                        >
                            Log in
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Branding/Image */}
            <div className="hidden lg:flex w-1/2 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 relative items-center justify-center p-12">
                <div className="max-w-md text-center space-y-6">
                    <div className="relative w-full aspect-square max-w-sm mx-auto flex items-center justify-center">
                        {/* Decorative background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[60px]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-[50px] translate-x-10 -translate-y-10" />

                        {/* Placeholder for illustration */}
                        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 w-full transform rotate-3 hover:rotate-0 transition-all duration-500">
                            <div className="w-full h-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4 w-3/4" />
                            <div className="space-y-3">
                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full" />
                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-5/6" />
                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-4/6" />
                            </div>
                            <div className="mt-8 flex justify-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30" />
                                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30" />
                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Log in to your workspace
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                            Enter your email and password to access your ConvertAll account. You are one step closer to boosting your document productivity.
                        </p>
                        <div className="pt-4">
                            <Link href="/tools" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center justify-center gap-1">
                                See all tools <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
