import React, { useState, } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Mail, User, Lock, EyeOff, Eye, Loader2, MessageCircleHeart } from 'lucide-react';
import { Link} from 'react-router-dom';
import toast from 'react-hot-toast';

const SignupPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: ""
    });

    const { signup, isSiginingUp } = useAuthStore();

    //function to validate the form 
    const validateForm = () => { 
        if(!formData.fullname.trim()) return toast.error("Full Name is required");
        if(!formData.email.trim()) return toast.error("Email is required");
        //chech for corret Email syntax
        if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format");
        if(!formData.password.trim()) return toast.error("Password is required");
        if(formData.password.trim().length<6) return toast.error("Password must be atleast 6 Characters");

        return true;

    }

    //to stop the refreshong of the page .
    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if(success===true) {
            signup(formData);
        } ;
    }


    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            {/* left Side:  */}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>

                    {/* LOGO */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageCircleHeart className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                            <p className='text-base-content/60'>Its Free to Start</p>
                        </div>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* FullName */}
                        <label className="input input-bordered flex items-center gap-2">
                            <User className='size-5 text-base-content/40' />
                            <input type="text" className="grow" placeholder="Your name" value={formData.fullname} onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} />
                        </label>
                        {/* Email */}
                        <label className="input input-bordered flex items-center gap-2">
                            <Mail className='size-5 text-base-content/40' />
                            <input type="text" className="grow" placeholder="example@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </label>
                        {/* Password */}
                        <label className="input input-bordered flex items-center gap-2 relative">
                            <Lock className="size-5 text-base-content/40" />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="grow"
                                placeholder="Shh... it's a secret!"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="size-5 text-base-content/40" />
                                ) : (
                                    <Eye className="size-5 text-base-content/40" />
                                )}
                            </button>
                        </label>
                        <button type='submit' className='btn btn-primary w-full' disabled={isSiginingUp}>
                            {isSiginingUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ):(
                                "Created Account "
                            )
                            }
                        </button>
                    </form>
                    {/* Link for Login Page */}
                    <div className='text-center'>
                        <p className='text-base-content/60' />
                        Already have an Account?{" "}
                        <Link to="/login" className='link link-primary'>
                        login
                        </Link> 
                    </div>
                </div>
            </div>
            {/* Right Side */}
        </div>
    )
}

export default SignupPage