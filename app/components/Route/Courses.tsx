//STEP: 137 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { useGetAllCoursesQuery } from '../../../redux/features/courses/courseApi';
import React, { useEffect, useState } from 'react';
import CourseCard from '../Course/CourseCard';
import Loader from '../Loader/Loader';
import { styles } from '../../../app/styles/style';
import Link from 'next/link';
//defining-props
type Props = {}
//creating-data
const Courses = (props: Props) => {
  const {data, isLoading} = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);
  return (
      <div>
        {
          isLoading ? (<Loader />) : (
            <>
              <div>
                <div className={`w-[90%] 800px:w-[80%] m-auto`}>
                  <div className='h-[2px] bg-slate-500 mb-10'></div>
                  <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-5xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">Expand Your Career {" "}<span className="text-gradient">Opportunity</span> <br/>Opportunity With Our Courses</h1>
                  <br />
                  <br />
                  <div className='flex flex-col'>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] ld:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-20 border-0">
                      {/* first, create a folder named "Course" inside the "components" folder and then create a file named "CourseCard.tsx" inside the "Course" folder, code in it and then come back here */}
                      {
                        courses && courses.map((item:any, index:number) => (
                          index < 8 && (<CourseCard item={item} key={index} />)
                        ))
                      }
                    </div>
                    <div className='grid place-content-center pb-10'>
                      <div className={`${styles.button} !w-[200px] !h-[60px]`}>
                        <Link href="/courses">
                          <h2 className={`${styles.label} !text-[16px] !text-white`}>Explore Courses</h2>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
  )
}
//exporting-data
export default Courses;
//OVER: 137("m": ../../page.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////