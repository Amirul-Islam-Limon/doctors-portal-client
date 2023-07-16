import React from 'react';

const Review = ({review}) => {
    const { _id, name, location, review:userReview, photo } = review;
    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <p>{ userReview}</p>
                <div className='flex items-center mt-3'>
                    <div className="avatar mr-5">
                        <div className="w-16 rounded-full ring ring-primary p-1">
                                <img src={ photo} alt=''/>
                        </div>
                    </div>
                    <div>
                        <h5 className='text-lg font-semibold'>{ name}</h5>
                        <p>{ location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;