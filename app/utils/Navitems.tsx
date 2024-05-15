//STEP: 7 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Link from 'next/link';
import React from 'react';
//creating the data of nav-items
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
        name: "About",
        url: "/about",
    },
    {
        name: "Policy",
        url: "/policy",
    },
    {
        name: "FAQ",
        url: "/faq",
    },
];
//defining props
type Props = {
    activeItem: number;
    isMobile: boolean;
}
//creating page
//According to "FreeCodeCamp", you should use "React.FC<>" over "FC<>" when you want to define a function component in your React application and you want to specify the type of props that the component expects to receive.
const Navitems:React.FC<Props> = ({activeItem,isMobile}) => {
  return (
    <>
       <div className={"hidden 800px:flex"}>
            {
                navItemsData && navItemsData.map((i, index) => (
                    <Link href={`${i.url}`} key={index} passHref>
                        <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>{i.name}</span>
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
//OVER: 7("c": ./ThemeSwitcher.tsx and "m": ./ThemeSwitcher.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////