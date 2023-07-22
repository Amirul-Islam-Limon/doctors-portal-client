import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <div>
            <button className="btn btn-primary text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary hover:border-primary">{ children}</button>
        </div>
    );
};

export default PrimaryButton;