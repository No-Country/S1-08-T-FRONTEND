import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditPostForm from './EditPostForm';

//toast
import toast from 'react-hot-toast'

//redux
import { useSelector } from 'react-redux'

//materia UI
import { makeStyles } from '@material-ui/styles'

//services
import { useGetAllCategoriesQuery } from '../../../app/services/categories';
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../../app/services/posts";

const useStyles = makeStyles(theme => ({
    customButtonPost: {
      color: '#fff',
      '&:hover, &.Mui-focusVisible': { backgroundColor: '' },
      margin: '0 2px',
      padding: '5px',
      alignItems: 'center'
    }
  }))

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetPostQuery(id);
    const [updatePost] = useUpdatePostMutation();
    //state global auth
    const { user, isAuthenticated } = useSelector(state => state.authUsers) //solo puede postear un usuario logueado

    // services
   /* const {
        data,
        error,
        isLoading,
        isSuccess,
        isError,
        refetch
    } = useGetAllCategoriesQuery()*/

    const handleCancel = () => {
      navigate(`/post/${id}`);
    };

    const handleEdit = async (post) => {
      const creatingToast = toast.loading("Editando publicación...");  
      const res = await updatePost({post, id});
  
      console.log(res);
      toast.dismiss(creatingToast);
  
      if (res.data.ok) {
        toast.success("Publicación editada correctamente");
        navigate(`/`);
      } else {
        toast.error("Error al editar publicación");
      }
    };
  
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error!</div>;
    
    return (
        <div>
          <EditPostForm
            postTitle={data?.title}
            postDescription={data?.description}
            handleCancel={handleCancel}
            handleEdit={handleEdit}
          />
        </div>
    );
}

export default EditPost;
