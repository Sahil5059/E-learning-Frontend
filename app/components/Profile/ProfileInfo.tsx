//STEP: 59 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Image from "next/image";
import { styles } from '../../../app/styles/style';
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/avatar.jpg";
import { useEditProfileMutation, useUpdateAvatarMutation } from "../../../redux/features/user/userApi"; //imported in the 62nd step
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";
//defining-props
type Props = {
    avatar: string | null;
    user: any;
}
//creating-data
const ProfileInfo:FC<Props> = ({avatar,user}) => {
  const [name, setName] = useState(user && user.name);
  //now, go open "next.config.js" and put the following code inside the const "nextConfig" : "images: { domains: ['res.cloudinary.com']}," or else the image will not be upuploaded on cloudinary

  //STEP: 62 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [updateAvatar,{isSuccess,error}] = useUpdateAvatarMutation();

  //STEP: 66 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [editProfile,{isSuccess:success,error:updateError}] = useEditProfileMutation(); //we renamed isSuccess as "success" and "error" as "updateError" because it is already used in the above const
  //OVER: 66 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [loaduser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, {skip: loaduser ? false : true});
  //OVER: 62 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const imageHandler = async(e:any) => {
    //console.log("yyy");

    //STEP: 63 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //first comment the above line before procceding further
    const fileReader = new FileReader();
    fileReader.onload = () => {
        if(fileReader.readyState === 2){
            const avatar = fileReader.result;
            updateAvatar(avatar);
        }
    }
    fileReader.readAsDataURL(e.target.files[0]);
    //OVER: 63 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }

  //STEP: 64 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   useEffect(() => {
//     if(isSuccess){
//         setLoadUser(user);
//     }
//     if(error){
//         console.log(error);
//     }
//     //eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isSuccess,error]);

  //STEP: 68 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //first comment the above "useEffect()" code before proceeding further
  useEffect(() => {
    if(isSuccess || success){
        setLoadUser(user);
    }
    if(error || updateError){
        console.log(error);
    }
    if(isSuccess || success){
        toast.success("Profile Updated Successfully");
        location.reload();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess,error,success,updateError]);
  //now, you can try updating your "avatar" or "username" from the website
  //now, we will set-up code for updating user-password
  //OVER: 68("c": ./ChangePassword.tsx and "m": ./ChangePassword.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //watch- 3:51:45 to 3:57:30
  //TODO: There is a bug in updataing profile picture: when clicking on open for the first time , the image is automaticllay rendered on our site but if you try opening image another time, you will ahve to reload the page to see the effect on the profile picture. One solution is to use "location.reload" to refresh the page after opening image but I'll see that later.
  //OVER: 64("m": ../../../redux/features/user/userApi.ts) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = async(e:any) => {
    //console.log("submit");

    //STEP: 67 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //first comment the above "console.log()" statement before proceeding further
    e.preventDefault();
    if(name !== ""){
        await editProfile({
            name: name,
        });
    }
    //OVER: 67 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }
  return (
    <>
        <div className="w-full flex justify-center">
            <div className="relative">
                <Image src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon} alt="" width={120} height={120} className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"/>
                <input type="file" name="" id="avatar" className="hidden" onChange={imageHandler} accept="image/png,image/jpg,image/jpeg,image/webp"/>
                <label htmlFor="avatar">
                    <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                        <AiOutlineCamera size={20} className="z-1 text-white"/>
                    </div>
                </label>
            </div>
        </div>
        <br />
        <br />
        <div className="w-full pl-6 800px:pl-10">
            <form onSubmit={handleSubmit}>
                <div className="800px:w-[50%] m-auto block pb-4">
                    <div className="w-[100%]">
                        <label className="block pb-2">Full Name</label>
                        <input type="text" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="w-[100%] pt-2">
                        <label className="block pb-2">Email Address</label>
                        <input type="text" readOnly className={`${styles.input} !w-[95%] mb-1 800px:mb-0`} required value={user?.email} /> { /* we basically don't want people to edit their email. REASON:  */ }
                    </div>
                    <input type="submit" className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`} required value="Update" />
                </div>
            </form>
            <br />
        </div>
    </>
  )
}
//exporting-data
export default ProfileInfo;
//OVER: 59("m": ./profile.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
