//STEP: 132 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
"use client";
import AllInvoices from '../../../app/components/Admin/Orders/AllInvoices';
import DashboardHero from '../../../app/components/Admin/DashboardHero';
import AdminSidebar from '../../../app/components/Admin/Sidebar/AdminSidebar';
import AdminProtected from '../../../app/hooks/adminProtected';
import Heading from '../../../app/utils/Heading';
import React from 'react';
//defining-props
type Props = {}
//creating-data
const page = (props: Props) => {
  const highlight = "Invoices";
  return (
    <div className="max-w-[1920px]">
        <AdminProtected>
            <Heading title="Elearning - Admin" description="Elearning is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learning" />
            <div className="flex h-screen">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar highlight={highlight} />
                </div>
                <div className="w-[85%]">
                    <DashboardHero />
                    <AllInvoices />
                </div>
            </div>
        </AdminProtected>
        {/* now, you can see the "Invoices" section*/}
    </div>
  )
}
//exporting-data
export default page;
//OVER: 132("m": ../../components/Route/Hero.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////