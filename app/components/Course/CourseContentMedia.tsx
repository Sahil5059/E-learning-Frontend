import { styles } from '../../../app/styles/style';
import CoursePlayer from '../../../app/utils/CoursePlayer';
import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation, useAddReplyInReviewMutation, useAddReviewInCourseMutation, useGetCourseDetailsQuery } from '../../../redux/features/courses/courseApi';
import { format } from 'timeago.js';
import { BiMessage } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import Ratings from '../../../app/utils/Ratings';
import avatar from "../../../public/assets/avatar.jpg";
import socketIO from "socket.io-client"; //imported in 153th step
//defining-props
type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo:number) => void;
    user: any;
    refetch: any;
}
//creating-data

//STEP: 153 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, {transports: ["websocket"]});
//OVER: 153 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const CourseContentMedia = ({data,id,activeVideo,setActiveVideo,user,refetch}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [review, setReview] = useState("");
  const {data:courseData, refetch:courseRefetch} = useGetCourseDetailsQuery(id, {refetchOnMountOrArgChange:true});
  const course = courseData?.course;
  const [addNewQuestion, {isSuccess,error,isLoading:questionCreationLoading}] = useAddNewQuestionMutation();
  const [addAnswerInQuestion, {isSuccess:answerSuccess, error:answerError, isLoading:answerCreationLoading}] = useAddAnswerInQuestionMutation();
  const [addReviewInCourse, {isSuccess:reviewSuccess, error:reviewError, isLoading:reviewCreationLoading}] = useAddReviewInCourseMutation();
  const [addReplyInReview, {isSuccess:replySuccess, error:replyError, isLoading:replyCreationLoading}] = useAddReplyInReviewMutation();
  const isReviewExits = course?.reviews?.find((item:any) => item.user._id === user._id); //checking if the user has already reviewed the course or not, if he has, then he can't review again because you can post only a single review for a product
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [reply, setReply] = useState("");
  
  const handleQuestion = () => {
    if(question.length === 0){
      toast.error("Question can't be empty");
    }else{
      addNewQuestion({question, courseId:id, contentId:data[activeVideo]._id});
    }
  }
  
  const handleAnswerSubmit = () => {
    addAnswerInQuestion({answer, courseId:id, contentId:data[activeVideo]._id, questionId:questionId});
  }

  const handleReviewSubmit = async () => {
    if(review.length === 0){
      toast.error("Review can't be empty");
    }
    else{
      addReviewInCourse({review, rating, courseId:id});
    }
  }

  const handleReviewReplySubmit = async () => {
    if(!replyCreationLoading){
      if(reply.length === 0){
        toast.error("Review reply can't be empty");
      }
      else{
        addReplyInReview({comment:reply, courseId:id, reviewId});
      }
    }
  }

  useEffect(() => {
    if(isSuccess){
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
      //STEP: 154 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question in ${data[activeVideo]?.title}`,
        userId: user._id,
      });
      //OVER: 154 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
    if(answerSuccess){
      setAnswer("");
      refetch();
      toast.success("Answer added successfully!!");

      //STEP: 155 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if(user.role !== "admin"){
        socketId.emit("notification", {
          title: "New Reply Received",
          message: `You have a new question reply in ${data[activeVideo]?.title}`,
          userId: user._id,
        });
      }
      //OVER: 155 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
    if(error){
      if("data" in error){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if(answerError){
      if("data" in answerError){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if(reviewSuccess){
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review added successfully!!");

      //STEP: 156 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      socketId.emit("notification", {
        title: "New Review Received",
        message: `You have a new review in ${data?.course?.name}`,
        userId: user._id,
      });
      //OVER: 156("c": ../../../redux/faeatures/notifications & ../../../redux/faeatures/notifications/notificationsApi.ts and "m": ../../../redux/faeatures/notifications/notificationsApi.ts) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
    if(reviewError){
      if("data" in reviewError){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if(replySuccess){
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully!!");
    }
    if(replyError){
      if("data" in replyError){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess,error,answerSuccess,answerError,reviewSuccess,reviewError,replySuccess,replyError]);
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer title={data[activeVideo]?.title} videoUrl={data[activeVideo]?.videoUrl} />
      <div className="w-full flex items-center justify-between my-3">
        <div className={`${styles.button} text-white !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[1.8]"}`} onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}>
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div className={`${styles.button} text-white !w-[unset] !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[1.8]"}`} onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}>
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black">{data[activeVideo].title}</h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {
          ["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
            <h5 key={index} className={`800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : "dark:text-white text-black"}`} onClick={() => setActiveBar(index)}>{text}</h5>
          ))
        }
      </div>
      <br />
      {
        activeBar === 0 && (
          <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">{data[activeVideo]?.description}</p>
        )
      }
      {
        activeBar === 1 && (
          <div>
            {
              data[activeVideo]?.links.map((item:any, index:number) => (
                <div key={index} className="mb-5">
                  <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">{item.title && item.title + " :"}</h2>
                  <a href={`https://${item.url}`} className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2">{item.url}</a>
                </div>
              ))
            }
          </div>
          //watch- 2:20:00 to 2:20:45
        )
      }
      {
        activeBar === 2 && (
          <>
            <div className="flex w-full">
              <Image src={user.avatar ? user.avatar.url : avatar} alt="avatar" width={50} height={50} className="w-[50px] h-[50px] rounded-full object-full" />
              <textarea name="" value={question} onChange={(e) => setQuestion(e.target.value)} id="" cols={40} rows={5} placeholder="Write your question..." className="ouline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"></textarea>
            </div>
            <div className="w-full flex justify-end">
              <div className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionCreationLoading && "cursor-not-allowed"}`} onClick={questionCreationLoading ? () => {} : handleQuestion}>
                Submit
              </div>
            </div>
            <br />
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div>
              <CommentReply data={data} activeVideo={activeVideo} answer={answer} setAnswer={setAnswer} handleAnswerSubmit={handleAnswerSubmit} user={user} setQuestionId={setQuestionId} answerCreationLoading={answerCreationLoading} />
            </div>
          </>
        )
      }
      {
        activeBar === 3 && (
          <div className="w-full">
            <>
              {
                !isReviewExits && (
                  <>
                    <div className="flex w-full">
                      <Image src={user.avatar ? user.avatar.url : avatar} alt="avatar" width={50} height={50} className="w-[50px] h-[50px] rounded-full object-full" />
                      <div className="w-full">
                        <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">Give a Rating <span className="text-red-500">*</span></h5>
                        <div className="flex w-full ml-2 pb-3">
                          {
                            //watch- 2:30:40 to 3:31:45
                            [1, 2, 3, 4, 5].map((i) => rating >= i ? (<AiFillStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)} />) : (<AiOutlineStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)} />))
                          }
                        </div>
                        <textarea name="" id="" cols={40} rows={5} value={review} placeholder="Write your comment..." className="ouline-none bg-transparent 800px:ml-3 border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins" onChange={(e) => setReview(e.target.value)}></textarea>
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      <div className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${reviewCreationLoading && "cursor-no-drop"}`} onClick={reviewCreationLoading ? () => {} : handleReviewSubmit}>
                        Submit
                      </div>
                    </div>
                    {/* watch- 2:33:40 to 2:36:42 */}
                  </>
                )
              }
              <br />
              <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
              <div className="w-full">
                {
                  (course?.reviews && [...course.reviews].reverse())?.map((item:any, index:number) => (
                    <div key={index} className="w-full my-5 dark:text-white text-black">
                      <div className="w-full flex">
                        <div>
                          <Image src={item.user.avatar ? item.user.avatar.url : avatar} alt="avatar" width={50} height={50} className="w-[50px] h-[50px] rounded-full object-full" />
                        </div>
                        <div className="ml-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{item.user.name}</h5>
                            {item.user.role === "admin" && <MdVerified className="text-[#496ee6] ml-2 text-[20px]" />}
                          </div>
                          <Ratings rating={item.rating} />
                          <p>{item.comment}</p>
                          <small className="text-[#0000009e] dark:text-[#ffffff83]">{format(item.createdAt)} ·</small>
                        </div>
                      </div>
                      {
                        user.role === "admin" && item.commentReplies.length === 0 && (
                          <span className={`${styles.label} !ml-10 cursor-pointer`} onClick={() => 
                              {
                                setIsReviewReply(true);
                                setReviewId(item._id);
                              }
                            }>Add Reply</span>
                        )
                      }
                      {
                          isReviewReply && reviewId === item._id && (
                          <div className="w-full flex relative">
                            <input type="text" value={reply} className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%]" onChange={(e:any) => setReply(e.target.value)} />
                            <button type="submit" className="absolute right-0 bottom-1" onClick={handleReviewReplySubmit}>Submit</button>
                          </div>
                          )
                      }
                      {
                        item.commentReplies.map((i:any, index:number) => (
                          <div key={index} className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                            <div className="w-[50px] h-[50px]">
                              <Image src={i.user.avatar ? i.user.avatar.url : avatar} alt="avatar" width={50} height={50} className="w-[50px] h-[50px] rounded-full object-full" />
                            </div>
                            <div className="pl-3">
                              <div className="flex items-center">
                                <h5 className="text-[20px]">{i.user.name}</h5>
                                {i.user.role === "admin" && <MdVerified className="text-[#496ee6] ml-2 text-[20px]" />}
                              </div>
                            <p>{i.comment}</p>
                            <small className="text-[#ffffff83]">{format(i.createdAt)} ·</small>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </>
          </div>
        )
      }
    </div>
  )
}

const CommentItem = ({setQuestionId,questionId,item,answer,setAnswer,handleAnswerSubmit,answerCreationLoading}:any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
          <Image src={item.user.avatar ? item.user.avatar.url : avatar} alt="avatar" width={50} height={50} className="w-[50px] h-[50px] rounded-full object-full" />
          </div>
          <div className="pl-3 dark:text-white text-black">
            <div className="flex items-center">
              <h5 className="text-[20px]">{item?.user.name}</h5>
              {item.user.role === "admin" && <MdVerified className="text-[#496ee6] ml-2 text-[20px]" />}
            </div>
            <p>{item?.question}</p>
            <small className="text-[#000000b8] dark:text-[#ffffff83]">{format(item?.createdAt)} ·</small>
          </div>
        </div>
        <div className="w-full flex">
          <span className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2" onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}> 
              {!replyActive ? item.questionReplies.length !== 0 ? "All Replies" : "Add Reply" : "Hide Replies"}
          </span>
          <BiMessage size={20} className="cursor-pointer dark:text-[#ffffff83] text-[#000000b8]" />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">{item.questionReplies.length}</span>
        </div>
        {
          replyActive && (
            <>
              {
                item.questionReplies.map((item:any, index:any) => (
                  <div key={index} className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                    <div>
                      <Image src={item.user.avatar ? item.user.avatar.url : avatar} alt="avatar" width={50} height={50} className="w-[50px] h-[50px] rounded-full object-full" />
                    </div>
                    <div className="pl-3">
                      <div className="flex items-center">
                        <h5 className="text-[20px]">{item.user.name}</h5>
                        {item.user.role === "admin" && <MdVerified className="text-[#496ee6] ml-2 text-[20px]" />}
                      </div>
                      <p>{item.answer}</p>
                      <small className="text-[#ffffff83]">{format(item.createdAt)} ·</small>
                    </div>
                  </div>
                ))
              }
              <>
                <div className="w-full flex relative dark:text-white text-black">
                  <input type="text" placeholder="Enter your answer..." value={answer} className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:border-[#fff] border-[#00000027] dark:text-white text-black p-[5px] w-[95%] ${answer === "" || answerCreationLoading && "cursor-not-allowed"}`} onChange={(e:any) => setAnswer(e.target.value)} />
                  <button type="submit" className="absolute right-0 bottom-1" disabled={answer === "" || answerCreationLoading} onClick={handleAnswerSubmit}>Submit</button>
                </div>
                <br />
              </>
            </>
          )
        }
      </div>
    </>
  )
}

const CommentReply = ({data,activeVideo,answer,setAnswer,handleAnswerSubmit,user,setQuestionId,questionId,answerCreationLoading}:any) => {
  return (
    <>
      <div className="w-full my-3">
        {
          data[activeVideo].questions.map((item:any, index:any) => (
            <CommentItem key={index} data={data} activeVideo={activeVideo} item={item} index={index} answer={answer} setAnswer={setAnswer} setQuestionId={setQuestionId} handleAnswerSubmit={handleAnswerSubmit} questionId={questionId} answerCreationLoading={answerCreationLoading} />
          ))
        }
      </div>
    </>
  )
}
//exporting-data
export default CourseContentMedia;