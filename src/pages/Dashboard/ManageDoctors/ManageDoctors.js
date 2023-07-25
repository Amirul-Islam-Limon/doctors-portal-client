import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmationModal from '../../shared/ConfirmationModal/ConfirmationModal';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    
    const MySwal = withReactContent(Swal)
    
    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey:["doctors"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/doctors", {
                headers: {
                    "authorization": `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const closeModal = () => {
        setDeletingDoctor(null);
    }

    const successModal = (modalData) => {
        console.log(modalData._id);
        fetch(`http://localhost:5000/doctors/${modalData._id}`, {
            method: "DELETE",
            headers: {
                "authorization":`bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Doctor ${modalData.name} Deleted Successfully`,
                        showConfirmButton: false,
                        timer: 2000
                      })
                   refetch(); 
                };
                
        })
    }
    return (
        <div>
            <h3 className='text-3xl mb-5 font-semibold ps-4'>Manage Doctors: { doctors?.length}</h3>



            <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Specialty</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>

                {
                    doctors.map((doctor, i) => <tr
                    key={doctor._id}
                    >
                    <th>{i+1}</th>
                    <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            {doctor.image? <img src={doctor.image} alt="Doctor img" />:<img src="/tailwind-css-component-profile-2@56w.png" alt="" />}
                        </div>
                        </div>
                    </div>
                    </td>
                    <td>
                    {doctor.name}
                    {/* <br/>
                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                    </td>
                    <td>{doctor.email}</td>
                    <td>{doctor.specialty}</td>
                    <th>
                        <label onClick={()=>setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-error text-white btn-sm">Delete</label>
                    </th>
                </tr>)                   
                } 
                </tbody>
                
            </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are You Sure You Want to Delete?`}
                    message={`If You Delete ${deletingDoctor.name}. You can not be undone.`}
                    successButtonName = "Delete"
                    closeModal={closeModal}
                    successModal={successModal}
                    modalData = {deletingDoctor}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;