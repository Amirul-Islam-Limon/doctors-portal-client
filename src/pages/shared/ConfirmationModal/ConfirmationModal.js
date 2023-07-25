import React from 'react';

const ConfirmationModal = ({title, message, successButtonName, closeModal, successModal, modalData}) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{ title}</h3>
                <p className="py-4">{ message}</p>
                <div className="modal-action flex justify-between">
                    <label onClick={() => successModal(modalData)} htmlFor="confirmation-modal" className="btn btn-outline btn-success btn-md">{ successButtonName}</label>
                    <label onClick={()=>closeModal()} htmlFor="confirmation-modal" className="btn btn-outline btn-error btn-md">Close!</label>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;