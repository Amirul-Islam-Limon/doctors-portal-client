import React from 'react';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const AppointmentOption = ({appointmentOption, setTreatment}) => {
    const { name, slots } = appointmentOption;
    return (
        <div className="card text-center bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-2xl  text-secondary font-semibold text-center">{name}</h2>
                <p>{ slots.length > 0? slots[0]:"Try another day"}</p>
                <p>{ slots.length} {slots.length > 1?"spaces":"space" } Available</p>
                <div className="flex justify-center">
                    
                    <label
                        onClick={()=>setTreatment(appointmentOption)}
                        htmlFor="booking-modal" className="btn btn-primary text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary">Book Appointment</label>
                    
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;