//STEP: 97 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
//defining-props
type Props = {
    videoUrl: string;
    title: string;
}
//creating-data
const CoursePlayer:FC<Props> = ({videoUrl}) => {
  {/* watch- 6:12:00 to 6:20:40 */}
  const [videoData, setVideoData] = useState({otp:"", playbackInfo:""});
  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {videoId: videoUrl}).then(
        (res) => {setVideoData(res.data)}
    );
  }, [videoUrl]);
  //sending-data
  return (
    <div style={{paddingTop:"56.25%", position:"relative", overflow:"hidden"}}>
        {videoData.otp && videoData.playbackInfo !== "" && (
            //first, watch- 2:23:40 to 6:27:20
            <iframe src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=ipluvidKBjAtdSaU`} style={{border:0, width:"100%", height:"100%", position:"absolute", top:0, left:0}} allowFullScreen={true} allow="encrypted-media"></iframe>
        )}
    </div>
  )
}
//exporting-data
export default CoursePlayer;
//OVER: 97("c": ./Ratings and "m": ./Ratings.tsx)