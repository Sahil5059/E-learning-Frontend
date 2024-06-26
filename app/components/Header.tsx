//imports
"use client";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { GiFox } from "react-icons/gi";
import Link from "next/link";
import Navitems from "../utils/Navitems";
import { motion } from 'framer-motion';

type Props = {
    open: boolean;
    setOpen: ( open: boolean ) => void;
    activeItem: number;
    route: string;
    setRoute: ( route:string ) => void;
}

const Header: FC< Props > = ({ activeItem, open, setOpen, route, setRoute}) => {
    const [active, setActive] = useState( false );
    const [openSidebar, setOpensidebar] = useState( false );
    const [ isLogoHovered, setIsLogoHovered ] = useState( false );
    const {user} = useSelector((state:any) => state.auth);
    const {data} = useSession();
    const [socialAuth,{isSuccess,error}] = useSocialAuthMutation();

    useEffect(() => {
        if(!user){
            if(data){
                socialAuth({
                    email: data?.user?.email,
                    name: data?.user?.name,
                    avatar: data?.user?.image,
                });
            }
        }
        if(data === null){
            if(isSuccess){
                toast.success("Logged in Successfully");
            }
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    },[data,user]);

    const handleClose = (e:any) => {
        if(e.target.id === "screen"){
            {
                setOpensidebar(false);
            }
        }
    }

    return (
        <div className="w-[1700px] h-[90px] 1921px:max-w-[1080px] fixed top-0 inset-x-0 mx-auto bg-white rounded-[30px] border-[2px] border-[#000000] mt-[20px]">
            <div className="w-[100%] h-[100%] flex items-center justify-between px-[50px]">
                <motion.div
                    onMouseEnter={ () => setIsLogoHovered( true )}
                    onMouseLeave={ () => setIsLogoHovered( false )}
                    initial={{
                        scale: 0
                    }}
                    animate={{
                        scale: isLogoHovered ? 1.05 : 1,
                    }}
                    whileTap={{
                        scale: 1.05
                    }}
                    transition={{
                        ease: "linear",
                        duration: 0.1,
                    }}
                >
                    <Link href={"/"}>
                        <GiFox className="text-[70px] text-[#000000] hover:scale-[1.1]" />
                    </Link>
                </motion.div>
                <div>
                    <Navitems
                        activeItem={activeItem}
                        isMobile={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;