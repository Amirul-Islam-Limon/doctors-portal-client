import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../../pages/shared/Loading/Loading';

const AdminRoute = ({ children }) => {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    if (loading || isAdminLoading) {
        return <Loading></Loading>;
    }
    if (user && isAdmin) {
        return children
    }
    return navigate("/");
};

export default AdminRoute;