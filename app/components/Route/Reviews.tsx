//STEP: 139 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { styles } from '../../../app/styles/style';
import Image from 'next/image';
import React from 'react';
import ReviewCard from '../Review/ReviewCard';
//defining-props
type Props = {}
//creating-data
export const reviews = [
    {
        name: "Linus Sebastian",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        profession: "Founder | Linus Tech Tips",
        comment: "I had the pleasure of exploring E-Learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out E-Learning!"
    },
    {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/13.jpg",
        profession: "Student | Oxford University",
        comment: "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!"
    },
    {
        name: "Sahil Akhtar",
        avatar: "https://randomuser.me/api/portraits/men/23.jpg",
        profession: "Web Developer | Reach Rocket",
        comment: "Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in details. for that any person had beginner-level can complete an integrated project when he watches the videos. Thank you very much. Im very excited for the next videos Keep doing this amazing work"
    },
    {
        name: "Mushir Alam",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        profession: "Web Designer | Reach Rocket",
        comment: "I recently purchased a course from E-Learning, and I must say, it exceeded my expectations! The website offers a wide range of tech-related courses, and I was thoroughly impressed with the quality and affordability of the course I chose. The course provided a wealth of knowledge and insights that I found invaluable. I highly recommend this website to anyone looking to learn something new, regardless of their skill level. With its comprehensive selection of courses and excellent instructors, E-Learning is the perfect place to expand your knowledge and skills in the tech industry."
    },
    {
        name: "Sashank",
        avatar: "https://randomuser.me/api/portraits/men/62.jpg",
        profession: "Co-Founder | CredShields",
        comment: "E-Learning does a good job of explaining the concepts in a clear and concise way, and the examples are well-chosen. Overall, this is a valuable resource for anyone who is new to programming"
    },
    {
        name: "Linus Torvalds",
        avatar: "https://randomuser.me/api/portraits/men/72.jpg",
        profession: "Tech Guy | GitHub",
        comment: "Join E-Learning! E-Learning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend E-Learning to anyone looking to improve their programming skills and build practical projects. E-Learning is a great resource that will help you take your skills to the next level."
    },
]
const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto ">
        <div className='h-[2px] bg-slate-500 mb-10'></div>
        <div className="w-full 800px:flex items-center bg-transparent rounded-lg">
            <div className="800px:w-[70%] w-full">
                <Image src={require("../../../public/assets/business-img.jpg")} alt='Business' width={700} height={700} className='rounded-lg' />
            </div>
            <div className="w-[100%] grid place-content-center mt-[40px]">
                <h3 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-5xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight"><span className="text-gradient">Our Students Are Our Strength</span>{" "}</h3>
                <br />
                <p className={`${styles.label} !text-[20px] leading-7 text-center !font-Josefin`}>At our e-learning platform for coding, we firmly believe that {'"'}our students are our strength.{'"'} Each learner who joins our community brings unique perspectives, diverse backgrounds, and a shared passion for mastering the art of coding. We empower our students with comprehensive resources, personalized guidance, and a supportive environment to foster their growth and success in the ever-evolving field of technology. Together, we thrive on the exchange of knowledge, collaboration, and continuous learning, harnessing the collective strength of our student community to drive innovation and make a meaningful impact in the world of coding.</p>
            </div>
            <br />
            <br />
        </div>
        <div className='h-[2px] bg-slate-500 mt-10'></div>
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-5xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">Let{`'`}s hear from our <span className="text-gradient">Students</span></h1>
        {/* first, create a folder named "Review" inside the "components" folder and then create a file named "ReviewCard.tsx" inside the "Review" folder, code in it and then come back here */}
        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0  pt-20">
                {
                    reviews && reviews.map((i, index) => <ReviewCard item={i} key={index} />)
                }
        </div>
        <br />
        <br />
        <div className='h-[2px] bg-slate-500'></div>
    </div>
  )
}
//exporting-data
export default Reviews
//OVER: 139("m": ../../../page.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////