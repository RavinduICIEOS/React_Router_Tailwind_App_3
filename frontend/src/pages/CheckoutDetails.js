import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";
import CartItem from "../UI/CartItem";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
};

export default function CheckoutDetails() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const navigate = useNavigate(); // Initialize the navigate functio
    

   // Using finalTotal from CartContext instead of recalculating
   const finalTotal = cartCtx.finalTotal;  
    /* const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );*/

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    // Check if data is available and no error occurred, then finish checkout
    if (data && !error) {
        handleFinish();
    }
    
    function handleClose() {
        navigate('/shoppingcart');       // Navigate back to Shopping Cart page
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
        navigate('/purchase'); // Navigate to the purchase page
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData,
            },
        }));
    }

    let actions = (
        <> 
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button type="submit" textOnly /*disabled={isSending}*/>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span className="text-gray-600">Sending order data...</span>;
        console.log('orderrsss ');
    }

    if(error){
        actions = <span className="text-gray-600">Sending order data errrror...</span>;       
         console.log('orderrsss error ');
    }
    
    return (
    <div>
        <div onClose={handleClose} className="relative  -left-80 font-josefin p-8 rounded-lg mx-auto w-[720px] h-[2227px] gap-12  ">
            <h2 className="mt-4 text-[50px] relative top-[100px]">
                <span className="text-[50px] leading-[1.1]">Checkout</span> 
                <span className="text-[50px] text-skyblue leading-[1.1]"> Details </span> </h2>

            <form onSubmit={handleSubmit} className="space-y-6 p-6 relative top-[160px]  text-black   border border-gray-300">
                <h2 className="text-2xl font-semibold mb-4">Contact Information </h2>
                <p className="text-lg font-medium">
                    Total Amount: <span className="font-semibold">{currencyFormatter.format(finalTotal)}</span>
                </p>

            <div className="flex space-x-4 ">
                <Input
                    label="FIRST NAME"
                    type="text"
                    id="firstname"
                    placeholder="Last Name"
                    className="block w-[295px] border border-gray-300 rounded-md p-2"
                />
                <Input
                    label="LAST NAME"
                    type="text"
                    id="lastname"
                    placeholder="Last Name"
                    className="block w-[295px] border border-gray-300 rounded-md p-2"
                />
            </div>
                <Input
                    label="PHONE NUMBER"
                    type="text"
                    id="phone"
                    placeholder="Phone Number"
                    className="block w-full border border-gray-300 rounded-md p-2"
                />
                 <Input
                    label="E-Mail Address"
                    type="email"
                    id="email"
                    placeholder="Youe Email"
                    className="block w-full border border-gray-300 rounded-md p-2"
                />
                  <p className='text-[28px]'>Shipping Address</p>
                {/* Embed Google Map below the Billing Address */}
            <div className="mt-6 mb-6">
                <iframe 
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093413!2d144.9537363153166!3d-37.81720997975167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577e4e2c05c5d0!2sFlinders%20St%20Station!5e0!3m2!1sen!2sau!4v1615493621441!5m2!1sen!2sau"
                    width="612" 
                    height="269" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy">
                </iframe>
            </div>           
                    <Input
                        label="Street Address *"
                        type="text"
                        id="streetaddress"
                        placeholder="Street Address"
                        className="block w-full border border-gray-300 rounded-md p-2"
                    />                 
                    <Input
                        label="TOWN / CITY *"
                        type="text"
                        id="city"
                        placeholder="Town / City"
                        className="block w-full border border-gray-300 rounded-md p-2"
                    />
                      <Input
                        label="Postal Code"
                        type="text"
                        id="postal-code"
                        className="w-1/2 border border-gray-300 rounded-md p-2"
                    />
                                         
                <div className="modal-actions flex justify-end mt-6 space-x-4">
                    {actions}
                </div>
            </form>
        </div>
<div className="relative left-[1000px] -top-[1940px]">
    <h2 className="text-[30px] font-semibold ">Order Summary</h2>

  <ul className="max-h-[1000px] overflow-y-auto">
   {cartCtx.items.map((item) => (
     <CartItem
        key={item.id}
        name={item.name}
        description={item.description}
        quantity={item.quantity}
        color={item.color}
        price={item.price}
        image={`http://localhost:3000/${item.image}`} 
        onIncrease={() => cartCtx.addItem(item)}
        onDecrease={() => cartCtx.removeItem(item.id)}
        remove={() => cartCtx.clearItem(item.id)}       
     />
))}
        <div className="mt-20 pb-10 pl-20">
            <span className="text-2xl  ">Have a coupon?</span><br/>
            <span className="text-sm mb-4 mt-2 block text-gray-600">Add your code for an instant cart discount</span>
            <input type="text" className={`p-2 rounded-lg  bg-transparent w-[300px] focus:outline-none border border-gray-800 'text-red-500' : ''}`}
              placeholder="Coupon Code" />
        </div>
     </ul>
  </div>
</div>

        
    );
}

       