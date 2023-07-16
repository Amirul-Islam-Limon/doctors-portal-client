import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg'
import InfoCard from './InfoCard';

const cardData = [
    {
        id: 1,
        title: "Opening Hours",
        description: "Open 24 hours",
        icon: clock,
        bgClass:'bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary'
    },
    {
        id: 2,
        title: "Visit our location",
        description: "130/10-kha, Basabo, Dhaka-1214",
        icon: marker,
        bgClass:'bg-accent'
    },
    {
        id: 3,
        title: "Contact us now",
        description: "+8801515650460",
        icon: phone,
        bgClass:'bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary'
    },
]

const InfoCards = () => {
    return (
        <div className='grid mt-20 gap-6 sm:grid-cols-1 lg:grid-cols-3 mg:grid-cols-2'>
            {
                cardData.map(card => <InfoCard
                    key={card.id}
                    card={card}
                ></InfoCard>)
            }
        </div>
    );
};

export default InfoCards;