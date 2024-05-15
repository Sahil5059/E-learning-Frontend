//STEP: 115 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { AiOutlineCamera } from 'react-icons/ai';
import { useEditLayoutMutation, useGetHeroDataQuery } from '../../../redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { styles } from '@/app/styles/style';
import toast from 'react-hot-toast';
//defining-props
type Props = {}
//creating-data
const EditHero:FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const {data, refetch} = useGetHeroDataQuery("Banner", {refetchOnMountOrArgChange:true}); //watch- 8:36:20 to 8:36:35
  const [editLayout, {isLoading,isSuccess,error}] = useEditLayoutMutation();
  useEffect(() => {
    if(data){
        setTitle(data?.layout?.banner.title);
        setSubTitle(data?.layout?.banner.subTitle);
        setImage(data?.layout?.banner?.image?.url);
    }
    if(isSuccess){
      refetch();
      toast.success("Hero Updated Successfully!!")
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data,isSuccess,error,refetch]);
  //for updating image
  const handleUpdate = (e:any) => {
    const file = e.target.files?.[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e:any) => {
        if(reader.readyState === 2){
          setImage(e.target.result as string);
        }
      }
      reader.readAsDataURL(file);
    }
  }
  const handleEdit = async() => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  }
  return (
    <div className="w-full mx-auto 1000px:flex items-center justify-center min-h-[80vh] 1000px:min-h-[90vh]">
            <div className="grid place-content-center pt-10 pb-10 1000px:ml-10">
                <div className="relative 1000px:w-[480px] 1000px:h-[480px] 700px:w-[480px] 700px:h-[480px] 400px:h-[350px] 400px:w-[350px] h-[200px] w-[200px] hero_animation rounded-full">
                    <img src={image} alt="" className="absolute object-cover 1000px:w-[260px] 1100px:w-[300px] 400px:w-[200px] w-[100px] inset-0 m-auto" />
                    <div>
                    <input type="file" name="" id="banner" accept="image/*" onChange={handleUpdate} className="hidden" />
                    <label htmlFor="banner" className="absolute right-0 z-20">
                      <AiOutlineCamera className="dark:text-white text-black text-[40px] cursor-pointer" />
                    </label>
                </div>
                </div>
                
            </div>
            <div className="relative 1000px:w-[60%] 1500px:w-[60%] grid place-content-center 1000px:mt-[0px] text-center 1000px:text-left 1000px:ml-[200px]">
                <textarea className="dark:text-white text-[#000000c7] text-[30px] 700px:text-[30px] 1200px:text-[74px] 1000px:text-[50px]  font-[600] font-Josefin py-2 1000px:leading-[75px] bg-transparent" placeholder="Improve Your Online Learning Experience Better Instantly" value={title} rows={4} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <textarea className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:w-[78%] bg-transparent" value={subTitle} placeholder="We have 40k+ Online courses & 500k+ Online registered students. Find your desired Courses from them." onChange={(e) => setSubTitle(e.target.value)} rows={3}></textarea>
                <br />
                <br />
                <br />
                <div className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${data?.layout?.banner?.title !== title || data?.layout?.banner?.subTitle !== subTitle || data?.layout?.banner?.image?.url !== image ? "!cursor-pointer !bg-[#42d383]" : "!cursor-not-allowed"} !rounded absolute bottom-12 right-12`} onClick={data?.layout?.banner?.title !== title || data?.layout?.banner?.subTitle !== subTitle || data?.layout?.banner?.image?.url !== image ? handleEdit : () => null}>
                  Save
                </div>
            </div>
    </div>
  )
}
//exporting-data
export default EditHero;
//OVER: 115("c": ../../admin/hero & ../../admin/hero/page.tsx and"c": ../../admin/hero/page.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////