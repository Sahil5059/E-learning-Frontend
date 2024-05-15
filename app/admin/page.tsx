//STEP: 77 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'use client';
import React from 'react';
import Heading from '../utils/Heading';
import AdminProtected from '../hooks/adminProtected';
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'; //imported in the 79th step
import DashboardHero from '../components/Admin/DashboardHero'; //imported in the 81th step
//defining-props
type Props = {}
//creating-data
const page = (props: Props) => {
  const highlight = "Dashboard";
  return (
    <div className="max-w-[1920px]">
        <AdminProtected>
            <Heading title="Elearning - Admin" description="Elearning is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learning"/>
            <div className="flex h-[200vh]">
                <div className="1500px:w-[16%] w-1/5">
                    
                    {/* STEP: 79 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                    <AdminSidebar highlight={highlight} />
                    {/* OVER: 79("c": ../components/Admin/DashboardHero.tsx and "m": ../components/Admin/DashboardHero.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

                </div>
                <div className="w-[85%]">

                  {/* STEP: 81 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                  <DashboardHero isDashboard={true} />
                  {/* OVER: 81("c": ../components/Admin/DashboardHeader.tsx and "m": ../components/Admin/DashboardHeader.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

                </div>
            </div>
        </AdminProtected>
    </div>
  )
}
//exporting-data
export default page
//OVER: 77("c": ../components/Admin & ../components/Admin/Sidebar & ../components/Admin/Sidebar/AdminSidebar.tsx and "m": ../components/Admin/Sidebar/AdminSidebar.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
