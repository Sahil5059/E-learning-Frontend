//imports
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useRouter } from "next/navigation";
import { FC, useState } from "react"
import Loader from "../Loader/Loader";

type Props = {}

const Hero: FC< Props > = ( props ) => {
    const {data, isLoading} = useGetHeroDataQuery("Banner", {});
    const [search, setSearch] = useState("");
    const router = useRouter();

    return (
        <div>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className="w-[100%] h-[100vh] 1921px:h-[1080px] 1921px:max-w-[1080px] bg-white rounded-[30px] mt-[130px]">

                    </div>
                )
            }
        </div>
    )
}

export default Hero;