import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingtModal/BookingModal';

const AvailableAppointments = ({ selectedDate }) => {
    const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect(() => {
        fetch("appointmentOptions.json")
            .then(res => res.json())
            .then(data => setAppointmentOptions(data));
    },[])
    return (
        <div className='my-16'>
            <p className='text-center text-secondary font-semibold'>Available Services on {format(selectedDate, "PP")}</p>
            <div className='mt-5 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    setTreatment={setTreatment}
                    selectedDate={selectedDate}    
                ></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointments;