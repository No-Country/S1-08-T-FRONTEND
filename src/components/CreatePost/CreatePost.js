import * as React from 'react'
import './CreatePost.css'
import Modal from '@mui/material/Modal'

import { makeStyles } from '@material-ui/styles'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useCreatePostMutation } from '../../app/services/posts'
import { useUploadPostsImageMutation } from '../../app/services/images'
import { useUploadPostsVideoMutation } from '../../app/services/images'

import MicrowaveIcon from '@mui/icons-material/Microwave'
import { IconButton } from '@mui/material'

const useStyles = makeStyles(theme => ({
  customButtonPost: {
    color: '#fff',
    '&:hover, &.Mui-focusVisible': { backgroundColor: '' },
    margin: '0 2px',
    padding: '5px',
    alignItems: 'center'
  }
}))

export default function CreatePost () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('') //para que sea una array, deberia tener[]
  const [imageUrl, setImageUrl] = useState('')
  const [video, setVideo] = useState('') //para que sea una array, deberia tener[]
  const [videoUrl, setVideoUrl] = useState('')

  const { user, isAuthenticated } = useSelector(state => state.authUsers) //solo puede postear un usuario logueado
  const [createPost] = useCreatePostMutation()
  const [createImage] = useCreatePostMutation()
  const [createVideo] = useCreatePostMutation()

  useEffect(() => {
    async function getImageUrl () {
      if (image) {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(image)
        fileReader.onload = () => {
          setImageUrl(fileReader.result)
        }
      }
    }
    getImageUrl()
  }, [image])

  useEffect(() => {
    async function getVideoUrl () {
      if (video) {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(video)
        fileReader.onload = () => {
          setVideoUrl(fileReader.result)
        }
      }
    }
    getVideoUrl()
  }, [image])

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

  const handleImage = e => setImage(...e.target.files)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!title || !description || !image) return
    const imageUrl = await createImage(image)
    const videoUrl = await createVideo(video)
    const post = {
      userid: user.id,
      title: title,
      description: description,
      image: imageUrl,
      video: videoUrl,
      category: category
    }
    const res = await createPost(post)
  }

  return (
    <div>
      <IconButton
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
          <div className='createPostTitle'>
            <h2>Crea tu post</h2>
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
          <div className='selectCategory'>
            <select>
              <option>Elige una categoría</option>
              <option>Desayunos y meriendas</option>
              <option>Almuerzos</option>
              <option>Cenas</option>
              <option>Restaurantes recomendados</option>
              <option>Postres</option>
              <option>Comidas regionales</option>
              <option>Vegetarianas y veganas</option>
              <option>Aptas para celíacos</option>
            </select>
          </div>

          <div className='uploadMedia'>
            <div className='uploadImg'>
              <input
                className='imageInput'
                id='fileid'
                placeholder='Selecciona tus imagenes'
                name='image'
                type='file'
                accept='image/*'
                onChange={handleImage}
                required
              />
              <div className='confirmImg'>
                {imageUrl && <img src={imageUrl} />}
              </div>
            </div>
            <div className='uploadVideo'>
              <input
                className='videoInput'
                id='fileid'
                placeholder='Puedes sumar videos'
                name='video'
                type='file'
                accept='video/*'
                onChange={handleImage}
                required
              />
              <div className='confirmVideo'>
                {videoUrl && <img src={videoUrl} />}
              </div>
            </div>
          </div>

          <button
            className='createPostButton'
            type='submit'
            onClick={handleSubmit}
          >
            Postear{' '}
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
        </div>
      </Modal>
    </div>
  )
}
