import { useContext, useEffect } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
};

export default function CheckoutDetails() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const navigate = useNavigate();

    const finalTotal = cartCtx.finalTotal;

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    // Use useEffect to navigate after successful order submission
    useEffect(() => {
        if (data && !error) {
            navigate('/purchase');
        }
    }, [data, error, navigate]);  // Ensure navigate runs when data or error changes

    function handleClose() {
        navigate('/shoppingcart');
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
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
            <Button type="submit" textOnly disabled={isSending}>
                Submit Order
            </Button>
        </>
    );

    if (isSending) {
        actions = <span className="text-gray-600">Sending order data...</span>;
    }

    if (error) {
        actions = <span className="text-red-600">Error submitting order. Please try again later.</span>;
    }

    return (
        <div className="relative top-[50px] font-['Josefin_Sans'] p-8 rounded-lg w-[1000px] h-auto mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 p-6 text-black font-['Josefin_Sans']">
                <h2 className="text-2xl font-bold mb-4">Checkout Details</h2>
                <p className="text-lg font-medium">
                    Total Amount: <span className="font-semibold">{currencyFormatter.format(finalTotal)}</span>
                </p>

                <Input
                    label="FIRST NAME"
                    type="text"
                    id="name"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <Input
                    label="LAST NAME"
                    type="text"
                    id="lname"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <Input
                    label="Phone Number"
                    type="text"
                    id="phone"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <Input
                    label="E-Mail Address"
                    type="email"
                    id="email"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                
                <div className="modal-actions flex justify-end mt-6 space-x-4">
                    {actions}
                </div>
            </form>
        </div>
    );
}
