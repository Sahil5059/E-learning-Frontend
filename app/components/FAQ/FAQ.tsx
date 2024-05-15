//STEP: 141 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '../../../redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';
//defining-props
type Props = {}
//creating-data
const FAQ = (props: Props) => {
  const {data} = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);
  useEffect(() => {
    if(data){
        setQuestions(data.layout.faq);
    }
  }, [data]);
  const toggleQuestion = (id:any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  }
  return (
    <div>
        <div className="w-[90%] 800px:w-[80%] m-auto pt-20">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-5xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">Frequently Asked <span className="text-gradient">Questions</span> <br/></h1>
            <div className="mt-12 min-h-full">
                <dl className="space-y-8">
                    {
                        questions.map((q) => (
                            <div key={q.id} className={`${q._id !== questions[0]?._id && "border-t"} border-gray-200 pt-6`}>
                                <dt className="text-lg">
                                    <button className="flex items-start justify-between w-full text-left focus:outline-none" onClick={() => toggleQuestion(q._id)}>
                                        <span className="font-medium text-black dark:text-white">{q.question}</span>
                                        <span className="ml-6 flex-shrink-0">{activeQuestion === q._id ? (<HiMinus className="h-6 w-6 text-black dark:text-white" />) : (<HiPlus className="h-6 w-6 text-black dark:text-white" />)}</span>
                                    </button>
                                </dt>
                                {
                                    activeQuestion === q._id && (
                                        <dd className="mt-2 pr-12">
                                            <p className="text-base font-Poppins text-black dark:text-white">{q.answer}</p>
                                        </dd>
                                    )
                                }
                            </div>
                        ))
                    }
                </dl>
            </div>
            <br />
            <br />
            <br />
        </div>
    </div>
  )
}
//exporting-data
export default FAQ;
//OVER: 141("m": ../../page.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////