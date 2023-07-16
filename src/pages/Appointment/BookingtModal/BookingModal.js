import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
    const { name, slots } = treatment;
    const date = format(selectedDate, "PP");

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        
        const booking = {
            appointmentDate: date,
            treatment: treatment.name,
            slot,
            name,
            email,
            phone
        }

        console.log(booking);
        // send data to the server and set a seccessfull toast;
        setTreatment(null);
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
                        <input name='name' type="text" placeholder="Your Name" className="input input-bordered  w-full mt-2" />
                        <input name='email' type="email" placeholder="Email Address" className="input input-bordered  w-full mt-2" />
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