//imports
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const navItemsData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Courses",
        url: "/courses",
    },
    {
        name: "About Us",
        url: "/about",
    },
    {
        name: "Policy",
        url: "/policy",
    },
    {
        name: "FAQs",
        url: "/faq",
    },
]

type Props = {
    activeItem: number;
    isMobile: boolean;
}

const Navitems: React.FC< Props > = ({ activeItem, isMobile }) => {
    const [ buttonIndex, setButtonIndex ] = useState< number | null >();

    return (
        <>
        <div className={"hidden 800px:flex"}>
                {
                    navItemsData && navItemsData.map((i, index) => (
                        <Link
                            className='w-[120px] h-[50px] relative mx-[10px]'
                            href={`${i.url}`}
                            key={index}
                            passHref
                            onMouseEnter={ () => setButtonIndex( index )}
                            onMouseLeave={ () => setButtonIndex( null ) }
                        >
                            <motion.div
                                className={`w-[120px] h-[50px] absolute z-[99] top-0 left-0 flex items-center justify-center border-[2px] border-[#000000] text-[20px] font-Josefin font-[400] rounded-[40px] hover-button-1 ${activeItem === index ? "bg-[#000000] text-[#FFFFFF] hover:text-[#000000]" : "bg-[#FFFFFF] text-black"}`}
                                initial={{
                                    x: 0,
                                    y: 0,
                                }}
                                animate={{
                                    x: buttonIndex === index ? 5 : 0,
                                    y: buttonIndex === index ? 5 : 0,
                                }}
                                whileTap={{
                                    x: 5,
                                    y: 5,
                                }}
                                transition={{
                                    ease: "linear",
                                    duration: 0.1,
                                }}
                            >
                                {i.name}
                            </motion.div>
                            <div className={`w-[120px] h-[50px] absolute z-[98] top-[5px] left-[5px] rounded-[40px] ${activeItem !== index ? "bg-[#000000]" : "bg-[#FFFFFF] border-[2px] border-[#000000]"}`}></div>
                        </Link>
                    ))
                }
            </div> 
            {
                isMobile && (
                    <div className="800px:hidden mt-5">
                        <div className="w-full text-center py-6">
                            <Link href={"/"} passHref>
                                <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>Elearning</span>
                            </Link>
                        </div>
                        {navItemsData && navItemsData.map((i, index) => (
                            <Link href={`${i.url}`} key={index} passHref>
                                <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} block py-5 text-[18px] px-6 font-Poppins font-[400]`}>{i.name}</span>
                            </Link>
                        ))}
                    </div>
                )
            }
        </>
  )
}

export default Navitems;