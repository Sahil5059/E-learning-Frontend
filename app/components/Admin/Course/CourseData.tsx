//STEP: 90 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { styles } from '@/app/styles/style';
import React, { FC } from 'react';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from 'react-hot-toast';
//defining-props
type Props = {
    benefits: {title:string}[];
    setBenefits: (benefits: {title:string}[]) => void;
    prerequisits: {title: string}[];
    setprerequisits: (prerequisits: {title:string}[]) => void;
    active: number;
    setActive: (active:number) => void;
}
//creating-data
const CourseData:FC<Props> = ({benefits,setBenefits,prerequisits,setprerequisits,active,setActive}) => {
  const handleBenefitChange = (index:number, value:any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = {title: value};
    setBenefits(updatedBenefits);
  }
  const handleAddBenefits = () => { //to understand it's use, watch- 5:14:35 to 5:15:00
    setBenefits([...benefits, {title: ""}]);
  }
  const handleprerequisitsChange = (index:number, value:any) => {
    const updatedprerequisits = [...prerequisits];
    updatedprerequisits[index] = {title: value};
    setprerequisits(updatedprerequisits);
  }
  const handleAddprerequisits = () => {
    setprerequisits([...prerequisits, {title: ""}]);
  }
  const prevButton = () => {
    setActive(active - 1);
  }
  const handleOptions = () => { //This code is not good, will update my later (I think that we should use "map()" here because right now, it's only checking the last benefit and length)
    if(benefits[benefits.length - 1]?.title !== "" && prerequisits[prerequisits.length - 1]?.title !== ""){
        setActive(active + 1);
    }else{
        toast.error("Please fill the field(s) in order to go further");
    }
  }
  //Also, there is no "delete" benefit/prerequisits code set-up, will set up later, INSHALLAH!!
  return (
    <div className="w-[80%] m-auto mt-24 block">
        <div>
            <label htmlFor="email" className={`${styles.label} text-[20px]`}>What are the benefits for students in this course?</label>
            <br />
            {benefits.map((benefit:any, index:number) => (<input type="text" key={index} name="Benefit" placeholder="You will be able to build a full stack LMS Platform..." required className={`${styles.input} my-2`} value={benefit.title} onChange={(e) => handleBenefitChange(index, e.target.value)} />))}
            <AddCircleIcon style={{margin: "10px 0px", cursor: "pointer", width: "30px"}} onClick={handleAddBenefits} />
        </div>
        <div>
            <label htmlFor="email" className={`${styles.label} text-[20px]`}>What are the prerequisits for starting this course?</label>
            <br />
            {prerequisits.map((prerequisits:any, index:number) => (<input type="text" key={index} name="prerequisits" placeholder="You nedd a basic knowledge of MERN stack" required className={`${styles.input} my-2`} value={prerequisits.title} onChange={(e) => handleprerequisitsChange(index, e.target.value)} />))}
            <AddCircleIcon style={{margin: "10px 0px", cursor: "pointer", width: "30px"}} onClick={handleAddprerequisits} />
        </div>
        <div className="w-full flex items-center justify-between">
            <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer" onClick={() => prevButton()}>Prev</div>
            <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer" onClick={() => handleOptions()}>Next</div>
        </div>
    </div>
  )
}
//exporting-data
export default CourseData;
//OVER: 90("m": ./CreateCourse.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
