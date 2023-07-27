import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingtModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../shared/Loading/Loading';

const AvailableAppointments = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, "PP");

    const { data:appointmentOptions, refetch, isLoading} = useQuery({
        queryKey: ["appointmentOptions", date],
        queryFn: async () => {
            const { data } = await axios.get(`https://doctors-portal-server-kappa-bice.vercel.app/appointmentOptions?date=${date}`)
            return data;
        }
    })
    
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='my-16'>
            <p className='text-center text-secondary font-semibold'>Available Services on {format(selectedDate, "PP")}</p>
            <div className='mt-5 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOptions?.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>

            {/* modal component */}
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    setTreatment={setTreatment}
                    selectedDate={selectedDate}
                    refetch={refetch}
                ></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointments;