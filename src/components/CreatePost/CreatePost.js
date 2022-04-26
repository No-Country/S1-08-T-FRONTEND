import React, { useState, useEffect } from 'react'
import './CreatePost.css'
import { useNavigate } from 'react-router-dom';


//toast
import toast from 'react-hot-toast'

//redux
import { useSelector } from 'react-redux'

//services
import { useCreatePostMutation, useGetPostsStateMutation } from '../../app/services/posts'
import { uploadImage, uploadVideo } from '../../app/services/images'
import { useGetAllCategoriesQuery } from '../../app/services/categories'

//materia UI
import Modal from '@mui/material/Modal'
import { makeStyles } from '@material-ui/styles'
import MicrowaveIcon from '@mui/icons-material/Microwave'

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";

//FilePond library
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


const useStyles = makeStyles(theme => ({
  customButtonPost: {
    color: '#fff',
    '&:hover, &.Mui-focusVisible': { backgroundColor: '' },
    margin: '0 2px',
    padding: '5px',
    alignItems: 'center'
  }
}))

export default function CreatePost() {
  const navigate = useNavigate();

  const classes = useStyles()

  //state global auth
  const { user, isAuthenticated } = useSelector(state => state.authUsers) //solo puede postear un usuario logueado

  // services
  const {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch
  } = useGetAllCategoriesQuery()
  const [createPost] = useCreatePostMutation()
  const [getGetPostsState] = useGetPostsStateMutation();

  //states categories
  const [categories, setcategories] = useState([])

  //states Modal
  const [open, setOpen] = React.useState(false)
  //handle open modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    handleRefreshfields()
  }

  //states post
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [category, setCategory] = useState(null)
  const [image, setImage] = useState(null) //para que sea una array, deberia tener[]
  const [video, setVideo] = useState(null) //para que sea una array, deberia tener[]
  const [videoUp, setVideoUp] = useState(null)
  const [loading, setLoading] = useState(false)

  //efeects categories
  useEffect(() => {
    if (data) {
      setcategories(data)
    }
  }, [data]) // eslint-disable-line

  useEffect(() => {
    refetch()
  }, []) // eslint-disable-line

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'title') {
      setTitle(value)
    } else if (name === 'description') {
      setDescription(value)
    } else if (name === 'category') {
      setCategory(value)
    }
  }

  const handleRefreshPosts = () => {
    getGetPostsState()
  }

  const handleRefreshfields = () => {
    setTitle('')
    setDescription('')
    setCategory(null)
    setImage(null)
    setVideo(null)
    setVideoUp(null)
  }

  const handleVideo = (e) => {
    setVideo(URL.createObjectURL(e.target.files[0]));
    setVideoUp(e.target.files[0]);
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (isAuthenticated) {
      if (image && title) {
        const loginToast = toast.loading('Publicando...')
        setLoading(true)
        let imageUrl = image
        let videoUrl = videoUp
        imageUrl = image !== null ? await uploadImage(image[0].file) : null
        videoUrl = videoUp !== null ? await uploadVideo(videoUp) : null

        const post = {
          userid: user.id,
          title: title,
          description: description,
          image: imageUrl,
          video: videoUrl,
          category: category || 2
        }

        const { data } = await createPost(post)
        setLoading(false)
        toast.dismiss(loginToast)

        console.log(data)

        if (data.ok === true) {
          toast.success(data.msg)

          console.log(data.msg)
          setOpen(false)
          //refesh state posts
          handleRefreshPosts()
          handleRefreshfields()
          navigate("/")
        } else {
          toast.error(data.msg)
          console.log(data.msg)
        }
      } else {
        toast.error(
          'Para publicar  debes subir por lo menos una imagen y un titulo'
        )
        setLoading(false)
      }
    } else {
      toast.error('Debes iniciar sesion para publicar')
    }
  }

  return (
    <div>
      <IconButton
        tooltip='Publicar'
        flow='down'
        onClick={handleOpen}
        classes={{
          root: classes.customButtonPost
        }}
      >
        <MicrowaveIcon />
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
              <h2>Crea tu post</h2>
              <IconButton className='closeButtonContainer' onClick={() => setOpen(false)}>
                <CloseIcon className='closeButton' />
              </IconButton>
            </div>
            <div className='descriptions'>
              <input
                className='createTitle'
                type='text'
                placeholder='Escribe el título de tu post'
                name='title'
                onChange={handleChange}
              ></input>

              <textarea
                className='createDescription'
                type='text'
                placeholder='Escribe tu post'
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
                    ))}
                </>
              </select>
            </div>

            <div className='uploadMedia'>
              <div className='uploadImg'>
                <FilePond
                  files={image}
                  onupdatefiles={setImage}
                  allowMultiple={false}
                  maxFiles={1}
                  name="imagePost"
                  id='file_img'
                  labelIdle="Elige o arrastra tus imágenes <svg height='25' width='25' fill='#fff' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z'/></svg>"
                  className='imageInput'
                />

              </div>
              <div className="uploadVideo">
                {video !== null ?
                  <video
                    className='previewReproducer'
                    width='288'
                    height='194'
                    src={video}
                    id='video_player'
                    controls
                  />
                  : null
                }
                <input
                  className='videoInput'
                  type='file'
                  name='file'
                  id='file_video'
                  accept='video/*'
                  onChange={handleVideo}
                />
                <label for="file_video" className='videoLabel'>Elige o arrastra tu video <svg height='25' width='25' fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z" /></svg></label>
              </div>
            </div>

            <button
              className='createPostButton'
              disabled={loading}
              type='submit'
            >
              Publicar{' '}
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
          </form>
        </div>
      </Modal>
    </div>
  )
}
