//STEP: 143 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { useGetCourseDetailsQuery } from '../../../redux/features/courses/courseApi';
import CourseDetails from "./CourseDetails"
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Heading from '../../utils/Heading';
import Header from '../Header';
import Footer from '../Footer/Footer';
import { useCreatePaymentIntentMutation, useGetStripePublishablekeyQuery } from '../../../redux/features/orders/ordersApi';
import { loadStripe } from "@stripe/stripe-js";
//defining-props
type Props = {
    id: string;
}
//creating-data
const CourseDetailsPage = ({id}: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false); //to pop-up login/sign-up menu if the user is unauthenticated
  const {data, isLoading} = useGetCourseDetailsQuery(id);
  const {data:config} = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, {data:paymentIntentData}] = useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  //now, open the "client" folder in the terminal and type: "npm i @stripe/stripe-js @stripe/react-stripe-js"
  useEffect(() => {
    if(config){
        const publishablekey = config?.publishableKey;
        setStripePromise(loadStripe(publishablekey));
    }
    if(data){
        const amount = Math.round(data.course.price * 100);
        createPaymentIntent(amount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config,data]);
  //watch: 1:31:35 to 1:32:20
  useEffect(() => {
    if(paymentIntentData){
        setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);


  return (
    <>
        {
            isLoading ? (<Loader />) : (
                <div>
                    <Heading title={data.course.name + " - Elearning"} description="Elearning is a platform for students to learn and get help from teachers" keywords={data?.course?.tags} />
                    <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
                    {
                        stripePromise && (<CourseDetails data={data.course} stripePromise={stripePromise} clientSecret={clientSecret} setRoute={setRoute} setOpen={setOpen} />)
                        //watch- 1:41:45 to 1:44:00
                    }
                    <Footer />
                </div>
            )
        }
    </>
  )
}
//exporting-data
export default CourseDetailsPage;
//OVER: 143("c": ../../courses & ../../courses/[id] & ../../courses/[id]/page.tsx and "m": ../../courses/[id]/page.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////