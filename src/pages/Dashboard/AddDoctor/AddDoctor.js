import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from "react-hook-form";
import Loading from '../../shared/Loading/Loading';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const MySwal = withReactContent(Swal)
    const imageHostKey = process.env.REACT_APP_imagebbApiKey;
    const navigate = useNavigate();

    const {data:specialties=[], isLoading } = useQuery({
        queryKey: ["specialty"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentSpecialty`)
            const data = await res.json();
            return data;
        }
    })
    
    const handleAddDoctor = async(data) => {
        const image = data.image[0];
        console.log(image);
        const formData = new FormData();
        formData.append("image", image);
        // save image to imagebb third party database;
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        const res = await fetch(url, {
            method: "POST",
            body: formData
        });
        const imageData = await res.json();
        if (imageData.success) {
            console.log(imageData.data.url);
            const doctor = {
                name: data.name,
                email: data.email,
                specialty: data.specialty,
                image: imageData.data.url
            }
            // save doctor information to database
            fetch("http://localhost:5000/doctors", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization":`bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(doctor)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.acknowledged) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `${data.name} is added successfully`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/dashboard/manageDoctors')
                    }
                });
        }
        
    }
    
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h3 className='text-3xl mb-5 font-semibold ps-7'>Add Doctor</h3>
            <div className='w-96 p-7'>
                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                        <input type="text" className={`input input-bordered ${errors.name && "border-red-400"}`} {...register('name', {
                            required: 'name is required',

                        })} />
                        {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                    </div>
                    
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                        <input type="text" className={`input input-bordered ${errors.email && "border-red-400"}`} {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })} />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Specialty</span>
                        </label>

                        <select {...register("specialty", {required:"Specialty is required"})} className="select select-bordered w-full max-w-xs">
                            {/* <option disabled selected>Please Select a Specialty</option> */}
                            {
                                specialties?.map(specialty => <option
                                    key={specialty._id}
                                    value={specialty.name}
                                >{ specialty.name}</option>)
                            }
                            
                        </select>

                    </div>

                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Upload Image</span>
                    </label>
                        <input type="file" className={`file-input file-input-primary file-input-bordered w-full max-w-xs${errors.image && "border-red-400"}`} {...register('image', {
                            required: 'Image is required',

                        })} />
                        {errors.image && <p className='text-red-600' role="alert">{errors.image?.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />
                </form>
            </div>


        </div>
    );
};

export default AddDoctor;