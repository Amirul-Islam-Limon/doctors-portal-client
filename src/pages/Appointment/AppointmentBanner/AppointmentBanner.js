import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({selectedDate, setSelectedDate}) => {
    

    return (
        <header>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className='lg:w-1/2'>
                        <img className='' src={chair} alt=''/>
                    </div>
                    <div className='lg:w-1/2 flex justify-center'>
                        <div>
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                            ></DayPicker>
                        </div>
                    </div>
                </div>
            </div>            
        </header>
    );
};

export default AppointmentBanner;