import React from 'react';
import treatment from '../../../../assets/images/treatment.png'
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';

const DentalTerms = () => {
    return (
        <div className="hero sm:py-5">
            <div className="hero-content flex-col lg:flex-row">
                <img src={treatment} className="rounded-lg lg:w-2/5 lg:mx-32 lg:my-32 shadow-2xl" alt='' />
                <div>
                <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page.</p>
                {/* <button className="btn btn-primary text-white">Get Started</button> */}
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default DentalTerms;