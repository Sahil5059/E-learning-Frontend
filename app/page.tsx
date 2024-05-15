//imports
"use client";
import { FC, useState } from "react";
import Heading from "./utils/Heading";
import Hero from "./components/Route/Hero";
import Header from "./components/Header";

interface Props {}

const HomePage: FC< Props > = ( props ) => {
	const [open, setOpen] = useState(false);
  	const [activeItem, setActiveItem] = useState(0);
  	const [route,setRoute] = useState("Login");

	return (
		<div className="min-h-[100vh] w-[1700px] bg-[#000000] inset-x-0 mx-auto">
			<Heading
				title="ELearning"
				description="Elearning is a platform for students to learn and get help from teachers"
				keywords="Programming,MERN,Redux,Machine Learning"
			/>
			<Header 
				open={open}
				setOpen={setOpen}
				activeItem={activeItem}
				setRoute={setRoute}
				route={route}
			/>
			<Hero />
		</div>
	)
}

export default HomePage;