//STEP: 148 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
"use client";
import { useGetAllCoursesQuery } from '../../redux/features/courses/courseApi';
import { useGetHeroDataQuery } from '../../redux/features/layout/layoutApi';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import { styles } from '../styles/style';
import CourseCard from '../components/Course/CourseCard';
import Footer from '../components/Footer/Footer';
import { BiSearch } from 'react-icons/bi';
//defining-props
type Props = {}
//creatining-data
const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title"); //watch- 4:25:25 to 4:26:10
  const {data, isLoading} = useGetAllCoursesQuery(undefined, {});
  const {data:categoriesData} = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");
  const categories = categoriesData?.layout.categories;
  const [searchData, setsearchData] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    if(searchData === ""){
        return
    }else{
        setCourses(data?.courses.filter((item:any) => item.name.toLowerCase().includes(search?.toLowerCase())));
        router.push(`?title=${searchData}`);
    }
  }
  const handleCategoryClick = (category: string) => {
    setsearchData("");
    router.push(`/courses`);
    setCategory(category);
  };

  useEffect(() => {
    if(category === "All"){
        setCourses(data?.courses);
    }
    if(category !== "All"){
        setCourses(data?.courses.filter((item:any) => item.categories === category));
    }
    if(search){
        setCourses(data?.courses.filter((item:any) => item.name.toLowerCase().includes(search?.toLowerCase())));
    }
  }, [data,category,search]);
  return (
    <div className="max-w-[1920px]">
        {
            isLoading ? (<Loader />) : (
                <>
                    <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
                    <div className="w=[95%] 800px:w-[85%] m-auto min-h-[70vh]">
                        <Heading title={"All courses - Elearning"} description={"Elearning is a programming community"} keywords={"programming community, coding skills, expert insights, collaboration, growth"} />
                        <br />
                                <div className="w-full flex items-center flex-wrap">
                                    <div className={`h-[35px] ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`} onClick={() => setCategory("All")}>
                                        All
                                    </div>
                                    {
                                        categories && categories.map((item:any, index:number) => (
                                            <div key={index}>
                                                <div className={`h-[35px] ${category === item.title ? "bg-[crimson]" : "bg-[#505cb]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`} onClick={() => handleCategoryClick(item.title)}>
                                                    {item.title}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        <div className="w-[50%] mt-7 mx-auto left-0 right-0 h-[47px] relative flex">
                            <input type="search" placeholder="Search Courses..." className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none dark:text-[white] text-[#0000004e] darl:text-[#ffffffe6] txt-[20px] font-[500] font-Josefin" value={searchData} onChange={(e) => setsearchData(e.target.value)} />
                            <div className="flex items-center justify-center w-[47px] bg-[#21aeff] rounded-r-[5px] cursor-pointer" onClick={handleSearch}>
                                <BiSearch className="text-white" size={50}/ >
                            </div>
                        </div>
                        {
                            courses && courses.length === 0 && (
                                <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>{search ? "No courses found!" : "No courses found in this category. Please try another one!"}</p>
                            )
                        }
                        <br />
                        <br />
                        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                            {courses && courses.map((item:any, index:number) => (
                                <CourseCard item={item} key={index} />
                            ))}
                        </div>
                        {/* watch- 4:33:10 to 4:35:00 */}
                        {/* now, we shall implement real-time notification using socket-io(backend-part), watch- 4:42:55 to 4:45:10 */}
                        {/* now that we have set-up our backend for "socket-io", lets move to the front-end part. First, open the "client" folder in the terminal and type: "npm i socket.io-client" */}
                    </div>
                    <Footer />
                </>
            )
        }
    </div>
  )
}
//exporting-data
export default Page;
//OVER: 148("m": ../../layout.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////