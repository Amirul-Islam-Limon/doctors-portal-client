import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);
    
    const {data:bookings=[], isLoading } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
                headers: {
                    "authorization": `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        <div>
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-lg"></span>
        </div>
    }
    console.log(bookings);
    return (
        <div>
            <h3 className='text-3xl mb-5'>My Appointment</h3>
            <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Treatment</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                        {
                            bookings?.map((booking, i) => <tr
                            key={booking._id}
                            >
                                <th>{i+1}</th>
                                <td>{ booking?.userName}</td>
                                <td>{ booking.treatmentName}</td>
                                <td>{ booking.appointmentDate}</td>
                                <td>{ booking.slot}</td>
                            </tr> )
                        }
                </tbody>
            </table>
            </div>


        </div>
    );
};

export default MyAppointment;