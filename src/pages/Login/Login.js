import React, { useContext} from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [data, setData] = useState("");
    const [loginError, setLoginError] = useState("");
    const { loginWithEmailAndPassword, loginWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (data) => {
        setLoginError("")
        loginWithEmailAndPassword(data.email, data.password)
            .then(result => {
                const user = result.user;
                navigate(from, {replace:true});
                console.log(user);
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message)
            })
        console.log(data);
    }

    const handleGoogleLogIn = () => {
        loginWithGoogle()
            .then(result => {
                const user = result.user;
                navigate(from, {replace:true});
                console.log(user);
            })
            .catch(error => {
                console.log(error);
        })
    }
    return (
        <div className='h-[550px] flex justify-center items-center'>
            <div className='w-96'>
                <h2 className='text-4xl font-semibold text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                        <input type="text" className={`input input-bordered ${errors.email && "border-red-400"}`} {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })} />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    </div>

                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    {/* <input {...register("password", {required:"Password is required"})} type="password" className={`input input-bordered ${errors.email? "border-red-400":""}`} /> */}



                    <input type="password" className={`input input-bordered ${errors.password && "border-red-400"}`} {...register('password', {
                            required: 'Password is required',
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d).{6,}$/i,
                                message: 'At least 6 characters with 1 number and 1 uppercase letter',
                            },
                        })} />

                    
                    {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                    </div>
                    
                    <div className="form-control">
                    <Link to="/forgotPassword" className='text-secondary'><small className='text-xs'>Forgot password?</small></Link>
                    </div>
                    <input className='btn btn-accent w-full mt-4' type="submit" />
                </form>
                <div>
                    {loginError && <p className='text-red-600'>{ loginError}</p>}
                </div>
                <div className='text-center mt-3'>
                    <p className='text-center'><small>New to Doctors Portal? <Link className='text-secondary' to="/signUp"> Create new account</Link></small></p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleLogIn} className='btn btn-outline btn-accent w-full'>Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;