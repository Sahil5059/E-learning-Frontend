//imports
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useRouter } from "next/navigation";
import { FC, useState } from "react"
import Loader from "../Loader/Loader";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { FaUserGraduate } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import { FaUserNinja } from "react-icons/fa";
import { motion } from 'framer-motion';

type Props = {}

const Hero: FC< Props > = ( props ) => {
    const {data, isLoading} = useGetHeroDataQuery("Banner", {});
    const [search, setSearch] = useState("");
    const router = useRouter();
    const [ isButtonHovered, setIsButtonHovered ] = useState( false );
    const [ isSearchHovered, setIsSearchHovered ] = useState( false );

    const handleSearch = () => {
        if ( search === "" ) {
            return;
        } else {
            router.push( `/courses?title=${search}` );
        }
    }

    return (
        <div>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className="max-w-[1920px] bg-white rounded-[30px] mt-[130px] p-[30px] hero-height">
                        <div className="w-[100%] h-[100%] flex items-center justify-between bg-[#FAF4E5] rounded-[30px] border-[2px] border-[#000000] px-[70px]">
                            <div className="w-[450px] h-[450px] flex items-center justify-center rounded-full bg-[#CBEDCE] border-[2px] border-[#000000]">
                                <Image src={data?.layout?.banner?.image?.url} width={400} height={400} alt="" className="rounded-full" />
                            </div>
                            <div className="w-[1000px] h-[400px] flex flex-col items-start justify-center">
                                <h1 className="font-workSans text-[62px] font-[700] leading-[65px] text-[#000000]">
                                    {data?.layout?.banner?.title}
                                </h1>
                                <p className="w-[70%] font-Josefin text-[26px] text-[#000000] leading-[28px] mt-[10px]">
                                    {data?.layout?.banner?.subTitle}
                                </p>
                                <div className="w-[450px] flex items-center justify-center mt-[35px]">
                                    <input
                                        type="search"
                                        placeholder="Search Courses..."
                                        className="w-full h-[45px] border-[2px] border-[#000000] bg-[#FEEEBE] placeholder:text-[#000000] rounded-[5px] p-2 outline-none text-[#000000] font-[500] font-workSans"
                                        value={search} onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <motion.div
                                        onClick={handleSearch}
                                        className="cursor-pointer ml-[5px] bg-[#B4E0F9]"
                                        onMouseEnter={ () => setIsSearchHovered( true )}
                                        onMouseLeave={ () => setIsSearchHovered( false )}
                                        initial={{
                                            scale: 1,
                                        }}
                                        animate={{
                                            backgroundColor: isSearchHovered ? "rgba(180,224,249,0.6)" : "#B4E0F9",
                                        }}
                                        whileTap={{
                                            backgroundColor: "rgba(180,224,249,0.6)",
                                        }}
                                        transition={{
                                            ease: "linear",
                                            duration: 0.1,
                                        }}
                                    >
                                        <BiSearch
                                            className="text-[#000000] rounded-[5px] border-[2px] border-[#000000]"
                                            size={45}
                                        />
                                    </motion.div>
                                </div>
                                <div className="flex items-center justify-start mt-[35px]">
                                    <FaUserGraduate className="text-[40px] text-[#000000]" />
                                    <FaUserMd className="text-[40px] text-[#000000]" />
                                    <FaUserNinja className="text-[40px] text-[#000000]" />
                                    <p className="font-workSans text-[#000000] text-[15px] font-[600] ml-[5px]">
                                        50K+ Parents already trusted us.
                                    </p>
                                </div>
                                <Link
                                    className='h-[50px] mt-[15px]'
                                    href="/courses"
                                    onMouseEnter={ () => setIsButtonHovered( true )}
                                    onMouseLeave={ () => setIsButtonHovered( false )}
                                >
                                    <motion.div
                                        className={`w-[200px] h-[50px] flex items-center justify-center bg-[#FCBEBD] font-Josefin text-[20px] text-[#000000] rounded-[40px] border-[2px] border-[#000000]`}
                                        initial={{
                                            scale: 1,
                                        }}
                                        animate={{
                                            scale: isButtonHovered ? 1.1 : 1,
                                            backgroundColor: isButtonHovered ? "#f8d8d7" : "#FCBEBD"
                                        }}
                                        whileTap={{
                                            scale: 1.1,
                                            backgroundColor: "#f8d8d7",
                                        }}
                                        transition={{
                                            ease: "linear",
                                            duration: 0.1,
                                        }}
                                    >
                                        Start your journey
                                    </motion.div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Hero;