//STEP: 100 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { apiSlice } from "../api/apiSlice";
export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: 'include' as const,
            }),
        }),

        //STEP: 104 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getAllCourses: builder.query({
            query: () => ({
                url: "get-all-courses",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        //also, adding code for deleting course
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),
        //also, adding code for editing course
        editCourse: builder.mutation({
            query: ({id,data}) => ({
                url: `edit-course/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            }),
        }),
        //also, adding code for editing course
        getUsersAllCourses: builder.query({
            query: () => ({
                url: "get-courses",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        //also, adding code for editing course
        getCourseDetails: builder.query({
            query: (id) => ({
                url: `get-course/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getCourseContent: builder.query({
            query: (id) => ({
                url: `get-course-content/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        addNewQuestion: builder.mutation({
            query: ({question,courseId,contentId}) => ({
                url: "add-question",
                body: {
                    question,
                    courseId,
                    contentId,
                },
                method: "PUT",
                credentials: "include" as const,
            }),
        }),
        addAnswerInQuestion: builder.mutation({
            query: ({answer,courseId,contentId,questionId}) => ({
                url: "add-answer",
                body: {
                    answer,
                    courseId,
                    contentId,
                    questionId
                },
                method: "PUT",
                credentials: "include" as const,
            }),
        }),
        addReviewInCourse: builder.mutation({
            query: ({review,rating,courseId}) => ({
                url: `add-review/${courseId}`,
                body: {
                    review,
                    rating,
                },
                method: "PUT",
                credentials: "include" as const,
            }),
        }),
        addReplyInReview: builder.mutation({
            query: ({comment,courseId,reviewId}:any) => ({
                url: `add-reply`,
                body: {
                    comment,
                    courseId,
                    reviewId,
                },
                method: "PUT",
                credentials: "include" as const,
            }),
        }),
        //don't forget to add "useGetAllCoursesQuery", "useDeleteCourseMutation", "useEditCourseMutation" & "useGetCourseDetailsQuery" in the export before procceding to the next step
        //OVER: 104("c": ../../../app/components/Course/AllCourses.tsx and "m": ../../../app/components/Course/AllCourses.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
    }),
});
export const {useCreateCourseMutation,useGetAllCoursesQuery,useDeleteCourseMutation,useEditCourseMutation,useGetUsersAllCoursesQuery,useGetCourseDetailsQuery,useGetCourseContentQuery,useAddNewQuestionMutation,useAddAnswerInQuestionMutation,useAddReviewInCourseMutation,useAddReplyInReviewMutation} = courseApi;
//OVER: 100("m": ../../../app/components/Course/CreateCourse.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
