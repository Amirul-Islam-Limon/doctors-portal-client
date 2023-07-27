import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/Loading/Loading';
import { Link } from 'react-router-dom';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const handlePayButton = () => {
        fetch("/https://doctors-portal-server-kappa-bice.vercel.app/create-checkout-session", {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                items: [
                    { id: 1, quantity: 5 },
                    {id:2, quantity:2}
                ]
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return res.json().then(json=> Promise.reject(json))
        })
        .then(({ url }) => {
            window.location = url;
        })
        .catch(error => {
            console.log(error);
    })
    }
    
    const {data:bookings=[], isLoading } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async() => {
            const res = await fetch(`https://doctors-portal-server-kappa-bice.vercel.app/bookings?email=${user?.email}`, {
                headers: {
                    "authorization": `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
       return <Loading></Loading>
    }
    console.log(bookings);
    return (
        <div>
            <h3 className='text-3xl mb-5 font-semibold ps-4'>My Appointment</h3>
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
                    <th>Payment</th>
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
                                <td>{booking.slot}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}><button onClick={handlePayButton} className='btn btn-primary btn-sm text-white'>Pay</button></Link>
                                    }
                                    {
                                        booking.price && booking.paid && <span className='text-green-500'>Paid</span>
                                    }
                                </td>
                                
                            </tr> )
                        }
                </tbody>
            </table>
            </div>


        </div>
    );
};

export default MyAppointment;