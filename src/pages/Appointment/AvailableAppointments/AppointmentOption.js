import React, { useContext } from 'react';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import { AuthContext } from '../../../context/AuthProvider';
import { Link, Navigate, Route, Router, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import AvailableAppointments from './AvailableAppointments';

const AppointmentOption = ({appointmentOption, setTreatment}) => {
    const { name, price, slots } = appointmentOption;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)

    const handleModalAndBookAppointment = (appointmentOption) => {
        if (!user?.email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You can't book appointment before login !",
                footer:'Go to Login Page .'
            })
            navigate("/login");
        }
        else {
            setTreatment(appointmentOption) 
        }
            
    }
   
    return (
        <div className="card text-center bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-2xl  text-secondary font-semibold text-center">{name}</h2>
                <p>{ slots.length > 0? slots[0]:"Try another day"}</p>
                <p>{ slots.length} {slots.length > 1?"spaces":"space" } Available</p>
                <p><small>Price: ${price}</small></p>
                <div className="flex justify-center">
                    
                    <label
                        onClick={()=>handleModalAndBookAppointment(appointmentOption)}
                        htmlFor="booking-modal" className="btn btn-primary text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary">Book Appointment</label>
                    
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;