import { useState } from "react"

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    if (email) {
        fetch(`https://doctors-portal-server-kappa-bice.vercel.app/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.isAdmin);
                setIsAdmin(data.isAdmin);
                setIsAdminLoading(false);
        })
    }
    return [isAdmin, isAdminLoading];
}
export default useAdmin;