import React, { useContext } from 'react';
import { Link, useRouteError } from "react-router-dom";
import { AuthContext } from '../../../context/AuthProvider';

const ErrorPage = () => {
    const {logOut} = useContext(AuthContext)
    const error = useRouteError();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                localStorage.removeItem("accessToken");
            })
            .catch(error => console.log(error));
    }
    
    return (
        <div className='h-screen flex justify-center items-center'>
            <div id="error-page">
            <h1 className='text-center text-3xl'>Oops!</h1>
            <h1 className='text-center text-3xl text-red-500'> Something went wrong</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Link to="/" onClick={handleLogOut} className='flex justify-center underline text-primary text-2xl'>Go to home</Link>
            <p className='text-center'>
            <i className=''>{error.statusText || error.message}</i>
            </p>
        </div>
        </div>
    );
};

export default ErrorPage;