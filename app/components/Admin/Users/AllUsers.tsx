//STEP: 109 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { FC, useEffect, useState } from 'react';
import { format } from "timeago.js";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiEdit2 } from "react-icons/fi";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '../../../../redux/features/user/userApi';
import Loader from '../../Loader/Loader';
import { styles } from '../../../../app/styles/style';
import toast from 'react-hot-toast';
//defining-props
type Props = {
    isTeam: boolean; //for "Manage Team" section of our website
}
//creating-data
const AllCourses:FC<Props> = ({isTeam}) => {
  const {theme, setTheme} = useTheme();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
      id: "",
      role: "",
  });
  const [userId, setUserId] = useState("");
  const [updateUserInfo, {error:updateError,isSuccess}] = useUpdateUserRoleMutation();
  const {isLoading, data, refetch} = useGetAllUsersQuery({}, {refetchOnMountOrArgChange:true});
  const [deleteUser, {isSuccess:deleteSuccess, error:deleteError}] = useDeleteUserMutation({});
  const handleDelete = async() => {
    const id = userId;
    await deleteUser(id);
  }
  const handleUpdateUserRole = async(e:any) => {
    e.preventDefault();
    const userUpdateData = userInfo;
    await updateUserInfo(userUpdateData);
  }
  useEffect(() => {
    if(updateError){
        if("data" in updateError){
            const errorMessage = updateError as any;
            toast.error(errorMessage.data.message);
        }
    }
    if(isSuccess){
        refetch();
        toast.success("User role updated successfully");
        setActive(false);
    }
    if(deleteSuccess){
        setOpen(false);
        refetch();
        toast.success("Deleted user successfully!");
        setOpen(false);
    }
    if(deleteError){
        if("data" in deleteError){
            const errorMessage = deleteError as any;
            toast.error(errorMessage.data.message);
        }
    }
  }, [updateError,isSuccess,deleteSuccess,deleteError,refetch]);
  //we will be using "DataGrid" to create rows-columns
  const columns = [
    {field:"id", headerName:"ID", flex:0.5},
    {field:"name", headerName:"Name", flex:.5},
    {field:"email", headerName:"Email", flex:.5},
    {field:"role", headerName:"Role", flex:.5},
    {field:"courses", headerName:"Purchased Courses", flex:0.5},
    {field:"created_at", headerName:"Joined At", flex:0.5},
    {field:"", headerName:"Delete", flex:0.2, renderCell:(params:any) => {
        return (
            <>
                <Button onClick={() => {setOpen(!open); setUserId(params.row.id);}}><AiOutlineDelete className="dark:text-white text-black" size={20} /></Button>
            </>
        )
    }},
    {field:"  ", headerName:"Email", flex:0.2, renderCell:(params:any) => {
        return (
            <>
                <a href={`mailto:${params.row.email}`}><AiOutlineMail className="dark:text-white text-black" size={20} /></a>
            </>
        )
    }},
  ];
  const rows:any = [];
  if(isTeam){
    const newData = data && data.users.filter((item:any) => item.role === "admin");
    newData && newData.forEach((item:any) => {
        rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            courses: item.courses.length,
            created_at: format(item.createdAt), //this will display time in a more readable manner
        })
    })
  }else{
    data && data.users.forEach((item:any) => {
        rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            courses: item.courses.length,
            created_at: format(item.createdAt), //this will display time in a more readable manner
        })
    })
  }
  return (
    <div className="mt-[120px] relative">
        {isLoading ? ( <Loader /> ) : (
        <Box>
            <div className="w-full  flex justify-end">
                <div className={`${styles.button} !w-[200px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`} onClick={() => setActive(!active)}>
                    Update A User
                </div>
            </div>
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
                <Modal open={open} onClose={() => setOpen(!open)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" className='ml-[16%]'>
                    <Box className="absolute inset-0 m-auto h-[194px] rounded-lg w-[500px] border-[1px] border-white border-opacity-60 glassmorphism p-5">
                        <h1 className={`${styles.title}`}>Are you sure you want to delete this user?</h1>
                        <div className="w-full flex items-center justify-between inset-0 m-auto pb-7">
                            <div className={`${styles.button} !w-[120px] bg-[#57c7a3] border-[1px] border-white border-opacity-60`} onClick={() => setOpen(!open)}>
                                Cancel
                            </div>
                            <div className={`${styles.button} !w-[120px] bg-[#e24949] border-[1px] border-white border-opacity-60`} onClick={handleDelete}>
                                Delete
                            </div>
                        </div>
                    </Box>
                </Modal>
            )}
            {active && (
                <div className="absolute rounded-lg w-[500px] h-[300px] border-[1px] border-white border-opacity-60 glassmorphism inset-0 m-auto p-5">
                    <form onSubmit={handleUpdateUserRole} className={`${styles.label}`}>
                        <div>
                            <label className={`${styles.label} text-[17px]`}>Enter User ID:</label>
                            <input type="text" name="" required value={userInfo.id} onChange={(e:any) => setUserInfo({...userInfo, id: e.target.value})} id="id" placeholder="Enter user id" className={`${styles.input} !w-[100%]`} />
                        </div>
                        <br />
                        <div>
                            <label className={`${styles.label} text-[17px]`}>Enter User Role:</label>
                            <input type="text" name="" required value={userInfo.role} onChange={(e:any) => setUserInfo({...userInfo, role: e.target.value})} id="role" placeholder="Enter user role" className={`${styles.input} !w-[100%]`} />
                        </div>
                        <br />
                        <div className="w-full flex items-center justify-between pb-7">
                            <div className={`${styles.button} !w-[120px] bg-[#e24949] border-[1px] border-white border-opacity-60`} onClick={() => setActive(!active)}>
                                Cancel
                            </div>
                            <input type="submit" value="Submit" className={`${styles.button} !w-[120px] bg-[#37a39a] border-[1px] border-white border-opacity-60`} />
                        </div>
                    </form>
                </div>
            )}
        </Box>
        )}
    </div>
  )
}
//exporting-data
export default AllCourses;
//OVER: 109("m": ../../../admin/users/page.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
