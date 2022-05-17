import React, { useState, useEffect } from "react";
import "./EditPostForm.css";
//materia UI
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/styles'
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";
import LunchDiningIcon from '@mui/icons-material/LunchDining';

//services
import { useCreatePostMutation, useGetPostsStateMutation } from '../../../app/services/posts';
import { useGetAllCategoriesQuery } from '../../../app/services/categories';
import { fontSize } from "@mui/system";


/*const useStyles = makeStyles(theme => ({
    customButtonPost: {
        color: '#000',
        '&:hover': { backgroundColor: '' },
        margin: '0 2px',
        padding: '5px',
        alignItems: 'center',
        fontSize: '1.1rem'
    }
}))
*/

export default function EditPostForm({
    postTitle,
    postDescription,
    handleCancel,
    handleEdit,
}) {
   // const classes = useStyles()
    const [title, setTitle] = useState(postTitle);
    const [description, setDescription] = useState(postDescription);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleRefreshfields = () => {
        setTitle('')
        setDescription('')
        setCategories(null)
    }

    const {
        data,
        error,
        isLoading,
        isSuccess,
        isError,
        refetch
    } = useGetAllCategoriesQuery();

    const handleChange = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else if (e.target.name === "textarea") {
            setDescription(e.target.value);
        }
    };

    const handleRefreshPosts = () => {
        getGetPostsState()
    }

    const [getGetPostsState] = useGetPostsStateMutation();

    //states Modal
    const [open, setOpen] = React.useState(false)
    //handle open modal
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        handleRefreshfields()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) return;
        handleEdit({
            title,
            description,
        });
    };

    return (
        <div>
            <IconButton
                tooltip='Editar'
                flow='down'
                onClick={handleOpen}
                className='editButton'
            /*classes={{
            root: classes.customButtonPost
            }}*/
            >
                <LunchDiningIcon />Editar post
            </IconButton>{' '}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <div className='creatPostContainer'>
                    <form className='formPost' onSubmit={handleSubmit}>
                        <div className='createPostTitle'>
                            <h2>Edita tu post</h2>
                            <IconButton className='closeButtonContainer' onClick={() => setOpen(false)}>
                                <CloseIcon className='closeButton' />
                            </IconButton>
                        </div>
                        <div className='descriptions'>
                            <input
                                className='createTitle'
                                type='text'
                                placeholder='Edita el título de tu post'
                                name='title'
                                onChange={handleChange}
                            ></input>

                            <textarea
                                className='createDescription'
                                type='text'
                                placeholder='Edita tu post'
                                name='description'
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className='selectDiv'>
                            <select className='selectCategory' onChange={handleChange}>
                                <option disabled>Elige una categoría</option>
                                <>
                                    {isLoading && <option disabled>Loading...</option>}
                                    {isError && <option disabled>{error.message}</option>}

                                    {isSuccess &&
                                        categories &&
                                        categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))
                                    }
                                </>
                            </select>
                        </div>
                        <div className="updateButtons">
                            <button
                                className='updatePostButton'
                                disabled={loading}
                                type='submit'
                                
                            >
                                Actualizar{' '}
                                <svg
                                    height='25'
                                    width='25'
                                    fill='#fff'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 448 512'
                                >
                                    <path d='M96.06 288.3H351.9L252.6 493.8C250.1 499.2 246 503.8 240.1 507.1C235.9 510.3 230 512 224 512C217.1 512 212.1 510.3 207 507.1C201.1 503.8 197.9 499.2 195.4 493.8L96.06 288.3zM386.3 164C392.1 166.4 397.4 169.9 401.9 174.4C406.3 178.8 409.9 184.1 412.3 189.9C414.7 195.7 415.1 201.1 416 208.3C416 214.5 414.8 220.8 412.4 226.6C409.1 232.4 406.5 237.7 402 242.2C397.6 246.6 392.3 250.2 386.5 252.6C380.7 255 374.4 256.3 368.1 256.3H79.88C67.16 256.3 54.96 251.2 45.98 242.2C37 233.2 31.97 220.1 32 208.3C32.03 195.5 37.1 183.4 46.12 174.4C55.14 165.4 67.35 160.4 80.07 160.4H81.06C80.4 154.9 80.06 149.4 80.04 143.8C80.04 105.7 95.2 69.11 122.2 42.13C149.2 15.15 185.8 0 223.1 0C262.1 0 298.7 15.15 325.7 42.13C352.7 69.11 367.9 105.7 367.9 143.8C367.9 149.4 367.6 154.9 366.9 160.4H367.9C374.2 160.4 380.5 161.6 386.3 164z' />
                                </svg>
                            </button>
                            <button
                                className='cancelPostButton'
                                disabled={loading}
                                type='submit'
                                onClick={handleCancel}
                            >
                                Cancelar{' '}
                                <svg height='25'
                                    width='25'
                                    fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362 149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1 362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448 256V256z" /></svg>
                            </button>
                        </div>
                </form>
            </div>                
        </Modal >
    </div >
)}

