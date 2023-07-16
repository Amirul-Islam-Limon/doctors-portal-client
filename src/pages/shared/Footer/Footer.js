import React from 'react';
import { Link } from 'react-router-dom';
import footerBg from '../../../assets/images/footer.png'

const Footer = () => {
    return (
        <section style={{backgroundImage:`url(${footerBg})`, backgroundPosition:"center"}}>
            <footer className="footer p-10">
                <div className='ps-14'>
                    <span className="footer-title">Services</span> 
                    <Link to="/" className="link link-hover">Branding</Link>
                    <Link to="/" className="link link-hover">Design</Link>
                    <Link to="/" className="link link-hover">Marketing</Link>
                    <Link to="/" className="link link-hover">Advertisement</Link>
                </div> 
                <div>
                    <span className="footer-title">Company</span> 
                    <Link to="/" className="link link-hover">About us</Link>
                    <Link to="/" className="link link-hover">Contact</Link>
                    <Link to="/" className="link link-hover">Jobs</Link>
                    <Link to="/" className="link link-hover">Press kit</Link>
                </div> 
                <div>
                    <span className="footer-title">Legal</span> 
                    <Link to="/" className="link link-hover">Terms of use</Link>
                    <Link to="/" className="link link-hover">Privacy policy</Link>
                    <Link to="/" className="link link-hover">Cookie policy</Link>
                </div>
            </footer>
            <footer className="footer footer-center p-4 text-base-content">
            <div>
                <p>Copyright © 2023 - All right reserved by <Link className='text-primary font-semibold border-b-2 border-secondary' to="https://github.com/amirul-Islam-Limon/">Amirul Islam Limon</Link></p>
            </div>
            </footer>
        </section>
    );
};


export default Footer;