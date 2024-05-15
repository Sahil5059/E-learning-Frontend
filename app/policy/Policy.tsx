import React from 'react';
import { styles } from '../styles/style';

type Props = {}

const Policy = (props: Props) => {
  return (
    <div>
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 text-black px-3 pt-10 dark:text-white">
            <h1 className={`${styles.title} !text-[50px] !text-center pt-2 text-gradient`}>Platform Terms and Condition</h1>
            <br />
            <ul style={{listStyle:"unset", marginLeft:"15px"}}>
                <h1 className='py-2 ml-[-15px] text-[30px] font-Poppins leading-8 whitespace-pre-line underline'>Privacy Policy</h1>
                <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line'>At E-learning, we are committed to protecting your privacy and ensuring that any information you provide to us is handled with care and respect. This privacy policy outlines how we collect, use, and safeguard your personal information when you interact with our website or use our services.</p>
                <br />
                <h1 className='py-2 ml-[-15px] text-[30px] font-Poppins leading-8 whitespace-pre-line underline'>Information Collection and Use</h1>
                <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line'>We may collect personal information such as your name, email address, and payment details when you register an account, make a purchase, or communicate with us. This information is used to provide you with access to our courses, track your progress, and communicate important updates or offers.</p>
                <br />
                <h1 className='py-2 ml-[-15px] text-[30px] font-Poppins leading-8 whitespace-pre-line underline'>Data Security</h1>
                <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line'>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                <br />
                <h1 className='py-2 ml-[-15px] text-[30px] font-Poppins leading-8 whitespace-pre-line underline'>Cookies</h1>
                <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line'>Our website may use cookies to enhance your browsing experience and provide personalized content. You have the option to disable cookies in your browser settings, although this may affect the functionality of our website.</p>
                <br />
                <h1 className='py-2 ml-[-15px] text-[30px] font-Poppins leading-8 whitespace-pre-line underline'>Contact Us</h1>
                <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line'>If you have any questions or concerns about our privacy policy or the handling of your personal information, please contact us at e-learning@gmail.com.</p>
                <br />
            </ul>
        </div>
    </div>
  )
}

export default Policy;