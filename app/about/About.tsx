import React from 'react';
import { styles } from '../styles/style';
//defining-props
type Props = {}
//creating-data
const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white h-[70vh] grid place-content-center">
        <br />
        <h1 className={`${styles.title} 800px:!text-[45px]`}>What is <span className="text-gradient">E-Learning?</span></h1>
        <br />
        <div className="w-[95%] 800px:w-[85%] m-auto">
            <p className="text-[18px] font-Poppins">
                Welcome to E-Learning, where technology meets education in the most innovative and accessible way possible. At E-Learning, we believe in the power of learning to transform lives. In today{`'`}s fast-paced world, staying ahead in the tech industry requires continuous education and skill development. That{`'`}s where we come in.
                <br />
                <br />
                Our platform is designed to provide you with top-quality e-learning resources that cater to all levels of expertise, from beginners to seasoned professionals. Whether you{`'`}re looking to delve into programming languages, master data science concepts, or explore the latest trends in artificial intelligence, we have the courses and resources to help you succeed.
                <br />
                <br />
                What sets us apart is our commitment to excellence. Our team consists of industry experts and experienced educators who are passionate about sharing their knowledge and expertise with learners like you. We curate our content carefully, ensuring that it{`'`}s up-to-date, relevant, and practical.
                <br />
                <br />
                With our user-friendly interface and interactive learning tools, you{`'`}ll have the flexibility to learn at your own pace, on your own schedule, from anywhere in the world. Whether you prefer video tutorials, interactive quizzes, or hands-on projects, we have something for everyone. Join our community of learners and unlock your full potential in the world of technology. Whether you{`'`}re aiming for a career change, seeking to enhance your skills, or simply exploring new interests, E-Learning is here to support you every step of the way.
                <br />
                <br />
                Start your learning journey with us today and discover a world of endless possibilities. Welcome to E-Learning - where knowledge meets innovation.
            </p>
        </div>
    </div>
  )
}
//exporting-data
export default About;