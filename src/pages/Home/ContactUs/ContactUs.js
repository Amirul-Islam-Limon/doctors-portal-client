import React from 'react';
import contactBg from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const ContactUs = () => {
    return (
        <div className='mt-16 py-16' style={{backgroundImage:`url(${contactBg})`}} >
            <div className='text-center'>
                <h5 className='text-primary text-xl font-semibold'>Contact Us</h5>
                <h3 className='text-4xl text-white pb-3'>Stay connected with us</h3>
            </div>
            <from className="lg:w-1/2 mx-auto">
                <input type="text" placeholder="Email Address" className="input block input-bordered lg:w-1/3 mx-auto my-3 " />
                <input type="text" placeholder="Subject" className="input block input-bordered lg:w-1/3 mx-auto my-3" />
                <textarea placeholder="Your message" className="textarea block textarea-bordered textarea-lg lg:w-1/3 mx-auto my-3" ></textarea>
                <div className='text-center'>
                    <PrimaryButton>Submit</PrimaryButton>
                </div>
            </from>
        </div>
    );
};

export default ContactUs;