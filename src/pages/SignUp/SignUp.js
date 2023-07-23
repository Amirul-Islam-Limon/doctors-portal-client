import React, { useContext } from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [data, setData] = useState("");
    const [signUpError, setSignUpError] = useState("");
    const {createUserByEmailPassword, updateUserProfile} = useContext(AuthContext)
    const navigate = useNavigate();
    const [createdUserEmail, setCreatedUserEmail] = useState("");
    const [token] = useToken(createdUserEmail);
    const MySwal = withReactContent(Swal)

    if (token) {
        navigate('/');
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User Created Successfully',
            showConfirmButton: false,
            timer: 1500
            })
    }

    const handleSignIn = (data) => {
        setSignUpError("");
        createUserByEmailPassword(data.email, data.password)
            .then(result => {
                const user = result.user;
                const userInfo = {
                    displayName:data.name
                }
                updateUserProfile(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);
                     })
                    .catch(error => {
                        setSignUpError(error.message);
                        console.log(error)
                    });
                console.log(user);
            })
            .catch(error => {
                setSignUpError(error.message);
                console.log(error)
            });
        console.log(data);
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);  
        })
    }

    console.log(errors);
    return (
        <div className='h-[550px] flex justify-center items-center'>
            <div className='w-96'>
                <h2 className='text-4xl font-semibold text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignIn)}>
                    
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                        <input type="text" className={`input input-bordered ${errors.name && "border-red-400"}`} {...register('name', {
                            required: 'name is required',
                            // pattern: {
                            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //     message: 'Invalid email address',
                            // },
                        })} />
                        {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                    </div>
                    
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
                                message: 'Password must have at least 6 characters with 1 number and 1 uppercase letter.',
                            },
                        })} />

                    
                    {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                    </div>
                    
                    <div className="form-control">
                    <p><small className='text-xs'>Forgot password?</small></p>
                    </div>
                    <input className='btn btn-accent w-full mt-4' type="submit" />
                </form>
                <div>
                    {signUpError && <p className='text-red-600'>{ signUpError}</p>}
                </div>
                <div className='text-center mt-3'>
                    <p className='text-center'><small>Already have an account? <Link className='text-secondary' to="/login"> Please LogIn</Link></small></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline btn-accent w-full'>Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;