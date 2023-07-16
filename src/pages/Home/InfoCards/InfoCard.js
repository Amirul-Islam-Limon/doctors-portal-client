import React from 'react';

const InfoCard = ({ card }) => {
    const {icon, title, description, bgClass} = card
    return (
        <div className={`card p-6 text-white md:card-side shadow-xl ${bgClass}`}>
            <figure><img src={icon} alt="Movie"/></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;