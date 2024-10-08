import PageContent from '../components/PageContent';
import ProImg from '../assets/Group 427320635.png';
import Button from '../UI/Button';
import { useContext } from "react";
import CartContext from "../store/CartContext";
import useHttp from "../hooks/useHttp";
import { currencyFormatter } from "../util/formatting";
import { useNavigate } from 'react-router-dom';

function Purchase() {
       const navigate = useNavigate(); 

    function handleCloseCart() {
        navigate('/merchandise');
      }

          return (    
            <div  className='relative top-60 left-72 font-josefin'>
                <h2 className="text-3xl mb-4">
                <span className="text-[50px] leading-[1.1]">Thank You for your</span> <br />
                <span className="text-[50px] text-skyblue leading-[1.1]"> purchase !</span> </h2>
                <p className="text-lg text-gray-900 mb-4">Your order will be processed within 24 hours during working 
                    days. We will notify<br /> you by email once your order has been shipped.</p>

                <p className='text-[28px] pt-8'>Billing Address</p>
                {/* Embed Google Map below the Billing Address */}
            <div className="mt-6 mb-6">
                <iframe 
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093413!2d144.9537363153166!3d-37.81720997975167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577e4e2c05c5d0!2sFlinders%20St%20Station!5e0!3m2!1sen!2sau!4v1615493621441!5m2!1sen!2sau"
                    width="652" 
                    height="269" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy">
                </iframe>
            </div>

                <div className=" flex justify-center mt-6">              
                    <Button
          className="px-4 py-2 relative right-80 top-[0px]  border-none text-[20px] mt-20 "
          textOnly
          onClick={handleCloseCart}
        >
         ⬅ Continue Shopping
        </Button>
                </div>
            </div>
         
        );
    }

export default Purchase;
