import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch}) => {
    const { user } = useContext(AuthContext);
    const { name, slots, price } = treatment;
    const date = format(selectedDate, "PP");
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const userName = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        
        const booking = {
            appointmentDate: date,
            treatmentName: treatment.name,
            price,
            slot,
            userName,
            email,
            phone
        }

        fetch("https://doctors-portal-server-kappa-bice.vercel.app/bookings", {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Booking Confirmed!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    setTreatment(null);
                    refetch();
                    navigate("/dashboard");
                    
                }
                else {
                    setTreatment(null);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${data.message}`,
                        footer: "You can't book multiple appointment a day !"
                      })
                }
                
            })

        console.log(booking);
        // send data to the server and set a seccessfull toast;
        
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
                <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">{ name}</h3>
                    <form onSubmit={handleBooking}>
                        <input type="text" disabled defaultValue={date} placeholder="Type here" className="input input-bordered  w-full mt-4" />
                            <select name='slot' className="select select-bordered w-full mt-2">
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}>{slot}</option>)
                            }
                            </select>
                        <input name='name' defaultValue={user?.displayName} readOnly type="text" placeholder="Your Name" className="input input-bordered  w-full mt-2" />
                        <input name='email' defaultValue={user?.email} readOnly type="email" placeholder="Email Address" className="input input-bordered  w-full mt-2" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered  w-full mt-2 mb-3" />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                    <div className="modal-action">
                    <label htmlFor="booking-modal" className="btn">Close!</label>
                    </div>
                </div>
            </div>  
        </>
    );
};

export default BookingModal;