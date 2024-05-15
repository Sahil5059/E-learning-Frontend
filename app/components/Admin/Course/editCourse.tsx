//STEP: 112 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
"use client";
import React, { FC, useEffect, useState } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useEditCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/courseApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { number } from 'yup';
//defining-props
type Props = {
    id: string;
}
//creating-data
const EditCourse:FC<Props> = ({id}) => {
  //watch- 7:45:10 to 7:47:00 (important concept)
  const [editCourse, {isSuccess,error}] = useEditCourseMutation();
  const {data, isLoading} = useGetAllCoursesQuery({}, {refetchOnMountOrArgChange:true});
  const editCourseData = data && data.courses.find((i:any) => i._id === id);
  useEffect(() => {
    if(isSuccess){
      toast.success("Course Edited Successfully");
      redirect("/admin/courses");
    }
    if(error){
      if("data" in error){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  },[isSuccess,error]);
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisits, setPrerequisits] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "Untitled Section",
        videoLength: 0,
        links: [{ title: "", url: "", }],
        suggestion: "",
    }
  ]);
  const [courseData, setCourseData] = useState({});
  useEffect(() => {
    if(editCourseData){
        setCourseInfo({
            name: editCourseData.name,
            description: editCourseData.description,
            price: editCourseData.price,
            estimatedPrice: editCourseData?.estimatedPrice,
            tags: editCourseData.tags,
            categories: editCourseData.categories,
            level: editCourseData.level,
            demoUrl: editCourseData.demoUrl,
            thumbnail: editCourseData?.thumbnail?.url,
        });
        setBenefits(editCourseData.benefits);
        setPrerequisits(editCourseData.prerequisits);
        setCourseContentData(editCourseData.courseData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCourseData]);
  const handleSubmit = async() => {
    //formatting benefits array
    const formattedBenefits = benefits.map((benefit) => ({title: benefit.title}));
    //formatting prerequisits array
    const formattedprerequisits = prerequisits.map((prerequisite) => ({title: prerequisite.title}));
    //formatting course content array
    const formattedCourseContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoLength: courseContent.videoLength,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion
    }));
    //preparing our data-object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      categories: courseInfo.categories,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisits: formattedprerequisits,
      courseData: formattedCourseContentData
    }
    setCourseData(data);
  }
  const handleCourseEdit = async(e:any) => {
    const id = editCourseData?._id;
    const data = courseData;
    await editCourse({id, data});
  }
  //returning-data
  return (
    <div className="w-full flex min-h-screen">
        <div className="w-[80%]">
            {active === 0 && (
                <CourseInformation courseInfo={courseInfo} setCourseInfo={setCourseInfo} active={active} setActive={setActive} />
            )}
            {active === 1 && (
                <CourseData benefits={benefits} setBenefits={setBenefits} prerequisits={prerequisits} setprerequisits={setPrerequisits} active={active} setActive={setActive} />
            )}
            {active === 2 && (
                <CourseContent active={active} setActive={setActive} courseContentData={courseContentData} setCourseContentData={setCourseContentData} handleSubmit={handleSubmit} />
            )}
            {active === 3 && (
                <CoursePreview active={active} setActive={setActive} courseData={courseData} handleCourseCreate={handleCourseEdit} isEdit={true} />
            )}
        </div>
        <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
            <CourseOptions active={active} setActive={setActive}/>
        </div>
    </div>
  )
}
//exporting-data
export default EditCourse;
//OVER: 112("m": ../../../admin/create-course/page.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////