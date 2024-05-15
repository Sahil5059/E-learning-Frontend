import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '../../../redux/features/orders/ordersApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { styles } from '../../../app/styles/style';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import socketIO from "socket.io-client"; //imported in 151th step
//defining-props
type Props = {
    setOpen: any;
    data: any;
    user: any;
}
//creating-data

//STEP: 151 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, {transports: ["websocket"]});
//OVER: 151 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const CheckOutForm = ({setOpen,data,user}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, {data:orderData, error, isSuccess}] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {isSuccess:LoadUserSuccess } = useLoadUserQuery({skip:loadUser ? false : true}); //watch- 1:38:15 to 1:38:50
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    if(!stripe || !elements){
        return; //i.e. return nothing
    }
    setIsLoading(true);
    const {error,paymentIntent} = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
    });
    if(error){
        setMessage(error.message);
        setIsLoading(false);
    }else if(paymentIntent && paymentIntent.status === "succeeded"){
        setIsLoading(false);
        createOrder({
            courseId: data._id,
            payment_info: paymentIntent,
        });
    }
  }
  useEffect(() => {
    if(isSuccess){
        setLoadUser(true);

        //STEP: 152 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //watch- 4:58:30 to 4:58:45
        socketId.emit("notification", {
            title: "New Order",
            message: `You have a new order from ${data?.name}`,
            userId: user._id,
        });
        //OVER: 152("m": ../Course/CourseContentMedia.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
    if(LoadUserSuccess){
        location.reload();
    }
    if(error){
        if("data" in error){
            const errorMessage = error as any;
            toast.error(errorMessage.data.message);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData,error]);
  //watch- 1:39:18 to 1:40:40
  return (
    <div className="pt-7">
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text" className={`${styles.button} mt-7 !h-[35px]`}>{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}</span>
            </button>
            {/* Show any error or success messages */}
            {
                message &&
                <div id="payment-message" className="text-[red] font-Poppins pt-2">
                    {message}
                </div>
            }
        </form>
    </div>
  )
}
//exporting-data
export default CheckOutForm;