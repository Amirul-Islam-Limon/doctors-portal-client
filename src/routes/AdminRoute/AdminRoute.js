import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../../pages/shared/Loading/Loading';

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    if (loading || isAdminLoading) {
        return;
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;