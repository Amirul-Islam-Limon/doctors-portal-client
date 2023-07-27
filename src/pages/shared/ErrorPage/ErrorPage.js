import React from 'react';
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='h-screen flex justify-center items-center'>
            <div id="error-page">
            <h1 className='text-center text-3xl'>Oops!</h1>
            <h1 className='text-center text-3xl text-red-500'> Something went wrong</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Link to="/" className='flex justify-center underline text-primary text-2xl'>Go to home</Link>
            <p className='text-center'>
            <i className=''>{error.statusText || error.message}</i>
            </p>
        </div>
        </div>
    );
};

export default ErrorPage;