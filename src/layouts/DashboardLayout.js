import React, { useContext } from 'react';
import Navbar from '../pages/shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Loading from '../pages/shared/Loading/Loading';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    if (isAdminLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><Link to="/dashboard">My Appointment</Link></li>
                    {
                        isAdmin && <li><Link to="/dashboard/allUsers">All User</Link></li>
                    }
                    </ul>
                
                </div>
            </div>
            
        </div>
    );
};

export default DashboardLayout;