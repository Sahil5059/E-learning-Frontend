//STEP: 105 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
//first open the "client" folder in the terminal and type : "npm i @mui/x-data-grid timeago.js"
import { format } from "timeago.js";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiEdit2 } from "react-icons/fi";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/courseApi';
import Loader from '../../Loader/Loader';
import { styles } from '../../../../app/styles/style';
import toast from 'react-hot-toast';
import Link from 'next/link';
//defining-props
type Props = {}
//creating-data
const AllCourses = (props: Props) => {
  const {theme, setTheme} = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const {isLoading,data,error,refetch} = useGetAllCoursesQuery({}, {refetchOnMountOrArgChange:true}); //watch- 7:30:20 to 7:35:45
  const [deleteCourse, {isSuccess:deleteSuccess, error:deleteError}] = useDeleteCourseMutation({});
  const handleDelete = async() => {
    const id = courseId;
    await deleteCourse(id);
  }
  useEffect(() => {
    if(deleteSuccess){
        setOpen(false);
        refetch();
        toast.success("Course deleted successfully!");
        setOpen(false);
    }
    if(deleteError){
        if("data" in deleteError){
            const errorMessage = deleteError as any;
            toast.error(errorMessage.data.message);
        }
    }
  }, [deleteSuccess,deleteError,refetch]);
  //we will be using "DataGrid" to create rows-columns
  const columns = [
    {field:"id", headerName:"ID", flex:0.5},
    {field:"title", headerName:"Course Title", flex:1},
    {field:"ratings", headerName:"Ratings", flex:.5},
    {field:"purchased", headerName:"Purchased", flex:.5},
    {field:"created_at", headerName:"Created At", flex:0.5},
    {field:"  ", headerName:"Edit", flex:0.2, renderCell:(params:any) => {
        return (
            <>
                <Link href={`/admin/edit-course/${params.row.id}`}><FiEdit2 className="dark:text-white text-black" size={20} /></Link>
            </>
        )
    }},
    {field:" ", headerName:"Delete", flex:0.2, renderCell:(params:any) => {
        return (
            <>
                <Button onClick={() => {setOpen(!open); setCourseId(params.row.id);}}><AiOutlineDelete className="dark:text-white text-black" size={20} /></Button>
            </>
        )
    }},
  ];
const rows:any = [];
{data && data.courses.forEach((item:any) => {
    rows.push({
        id: item._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: format(item.createdAt), //this will display time in a more readable manner
    })
})}
  return (
    <div className="mt-[120px]">
        {isLoading ? ( <Loader /> ) : (
        <Box>
            <Box m="40px 0 0 0" height="80vh" sx={{
                "& .MuiDataGrid-root": {border:"none", outline:"none"},
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {color:theme === "dark" ? "#fff" : "#000"},
                "& .MuiDataGrid-row": {color:theme === "dark" ? "#fff" : "#000", borderBottom:theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important"},
                "& .MuiTablePagination-root": {color:theme === "dark" ? "#fff" : "#000"},
                "& .MuiDataGrid-cell": {borderBottom:"none"},
                "& .name-column--cell": {color:theme === "dark" ? "#fff" : "#000"},
                "& .MuiDataGrid-columnHeaders": {backgroundColor:theme === "dark" ? "#3e4396" : "#A4A9FC", borderBottom:"none", color:theme === "dark" ? "#fff" : "#000"},
                "& .MuiDataGrid-virtualScroller": {backgroundColor:theme === "dark" ? "#1F2A40" : "#F2F0F0"},
                "& .MuiDataGrid-footerContainer": {color:theme === "dark" ? "#fff" : "#000", borderTop:"none", backgroundColor:theme === "dark" ? "#3e4396" : "#A4A9FC"},
                "& .MuiCheckbox-root": {color:theme === "dark" ? `#b7ebde !important` : `#000 !important`},
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {color: `#fff !important`}
            }}>
                <DataGrid rows={rows} columns={columns} />
            </Box>
            {open && (
                <Modal open={open} onClose={() => setOpen(!open)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" className="relative ml-[16%]">
                    <Box className="absolute inset-0 m-auto h-[194px] rounded-lg w-[500px] border-[1px] border-white border-opacity-60 bg-[#3e4396] glassmorphism p-5">
                        <h1 className={`${styles.title}`}>Are you sure you want to delete this course?</h1>
                        <div className="w-full flex items-center justify-between">
                            <div className={`${styles.button} !w-[120px] bg-[#e24949] border-[1px] border-white border-opacity-60`} onClick={() => setOpen(!open)}>
                                Cancel
                            </div>
                            <div className={`${styles.button} !w-[120px] bg-[#37a39a] border-[1px] border-white border-opacity-60`} onClick={handleDelete}>
                                Delete
                            </div>
                        </div>
                    </Box>
                </Modal>
            )}
        </Box>
        )}
    </div>
  )
}
//exporting-data
export default AllCourses;
//OVER: 105("m": ../../../admin/courses/page.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
