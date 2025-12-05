import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();

    const handleLogin = (data) => {
        console.log(data)
        signInUser(data.email, data.password)
            .then((result) => {
                console.log( result.user);
            })
            .catch((error) => {
                console.error('Error logging in:', error);
            });
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Login to Your Account</h2>
                <p className="text-gray-500 text-center mt-2">Enter your credentials to access your account</p>

                <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"{...register('email', { required: true })}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.email?.type === 'required' && <span className='text-red-500'>This field is required</span>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"{...register('password', { required: true })}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                        {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must be at least 6 characters long</span>}
                        {
                            errors.password?.type === 'pattern' && <span className='text-red-600'>Password must contain uppercase and lowercase letters.</span>
                        }
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors mt-4"
                    >
                        Login
                    </button>
                </form>

                {/* OR divider */}
                <div className="flex items-center justify-center my-4">
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                    <span className="text-xs text-gray-500 uppercase mx-2">or</span>
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                </div>

                {/* Google Login */}
                <button className="btn w-full bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>

                {/* Register Link */}
                <p className="text-center text-gray-500 text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-green-500 font-medium hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
