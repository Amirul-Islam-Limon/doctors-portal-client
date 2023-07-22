import React, { useContext } from 'react';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ForgotPassword = () => {
    const { passwordReset } = useContext(AuthContext);

    const MySwal = withReactContent(Swal)

    const handleForgotPassword = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        passwordReset(email)
            .then(() => {
                Swal.fire({
                    title: 'We have sent a password-reset Email to your registered Email Address Successfully. Please check your Email.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                form.reset();
            })
            .catch(error => {
                console.log(error);
        })
        console.log(email);
    }

    return (
        <div className='h-[550px] flex justify-center items-center'>
            <div className='text-center'>
            <h1 className='text-4xl font-semibold'>forgot password</h1>
                <form onSubmit={handleForgotPassword}>
                    <div className="form-control mt-10">
                        <label className="label flex justify-center">
                            <span className="label-text pb-1">Enter your registered email here to reset your password.</span>
                        </label>
                        <input type="text" name='email' placeholder="Required your Email" className="input input-bordered" />
                    </div>
                    <div className='form-control mt-10'>
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default ForgotPassword;