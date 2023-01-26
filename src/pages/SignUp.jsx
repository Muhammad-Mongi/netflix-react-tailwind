import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

export default function SignUp() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, signUp } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='w-full h-screen'>
                <img className='w-full h-full sm:block object-cover absolute' src="https://assets.nflxext.com/ffe/siteui/vlv3/e451379a-dd0a-4657-b530-4ca4c0cb2aee/9983004b-a5d0-4c0f-9172-5b5ea5b16411/EG-en-20230123-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="signup background" />
                {/* OVERLAY */}
                <div className='w-full absolute h-screen bg-black/60'></div>


                <div className='fixed py-24 w-full px-4 z-50'>
                    <div className='text-white max-w-[450px] h-[600px] mx-auto bg-black/75'>
                        <div className="mx-auto max-w-[320px] py-16">
                            <h1 className='text-3xl font-bold'>Sign Up</h1>

                            <form onSubmit={handleSubmit} className='flex flex-col py-4'>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='p-3 my-2 bg-gray-700 rounded focus:outline-none' type="email"
                                    placeholder='Email'
                                />
                                <input
                                    onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700 rounded focus:outline-none' type="password" placeholder='Password'
                                />

                                <button
                                    className='bg-red-600 py-2 my-6 rounded font-bold' type="submit">Sign Up</button>

                                <div className='flex items-center text-sm text-gray-600 justify-between'>
                                    <p>
                                        <input className='mr-2' type="checkbox" />
                                        Remember me
                                    </p>
                                    <p>
                                        Need help?
                                    </p>
                                </div>
                                <p className='mt-7'>
                                    <span className='text-gray-600 mr-2'>
                                        Already subscribed to Netflix?
                                    </span>
                                    <span>
                                        <Link to={'/signin'}>
                                            Sign In
                                        </Link>
                                    </span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
