import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUser = () => {

    const {data:users=[], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/users", {
                headers: {
                    "authorization": `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: "PUT",
            headers: {
                authorization:`bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                }
        })
    }
    return (
        <div>
            <h3 className='text-3xl mb-5 font-semibold ps-4'>All Users</h3>


            <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User Role</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,i)=><tr key={user._id}>
                            <th>{ i+1}</th>
                            <td>{ user.name}</td>
                            <td>{ user.email}</td>
                            <td>{user.role !== "admin"? <button onClick={()=>handleMakeAdmin(user._id)} className='btn btn-xs btn-primary text-white'>Make Admin</button>:<span className='text-green-600 font-bold ms-5'>Admin</span>}</td>
                            <td><button className='btn btn-xs btn-error text-white'>Delete</button></td>
                            </tr>)
                    }
                </tbody>
            </table>
            </div>


        </div>
    );
};

export default AllUser;