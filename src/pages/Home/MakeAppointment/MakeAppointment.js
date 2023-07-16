import React from 'react';
import doctor from '../../../assets/images/doctor.png'
import appointBg from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section className='mt-10' style={{backgroundImage:`url(${appointBg})`}}>
            <div className="hero">
            <div className="hero-content p-0 flex-col lg:flex-row">
                <img src={doctor} className="-mt-36 hidden md:block lg:w-1/2 rounded-lg shadow-2xl" alt=''/>
                <div className='p-2'>
                    <h5 className='text-primary text-xl font-semibold mb-4'>Appointment</h5>  
                    <h1 className="text-4xl font-bold text-white">Make an appointment Today</h1>
                    <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page.</p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
            </div>
        </section>
    );
};

export default MakeAppointment;