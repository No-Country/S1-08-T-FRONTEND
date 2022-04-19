import * as React from 'react';
import './CreatePost.css'
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useCreatePostMutation } from "../../app/services/posts";
import { uploadImage, uploadVideo } from "../../app/services/images";
//FilePond library
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreatePost() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null); //para que sea una array, deberia tener[]
  const [imageUrl, setImageUrl] = useState(null);
  const [video, setVideo] = useState(null); //para que sea una array, deberia tener[]
  const [videoUrl, setVideoUrl] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.authUsers); //solo puede postear un usuario logueado
  const [createPost] = useCreatePostMutation();

  useEffect(() => {
    async function getImageUrl() {
      if (image) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onload = () => {
          setImageUrl(fileReader.result);
        };
      }
    }
    getImageUrl();
  }, [image]);

  useEffect(() => {
    async function getVideoUrl() {
      if (video) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(video);
        fileReader.onload = () => {
          setVideoUrl(fileReader.result);
        };
      }
    }
    getVideoUrl();
  }, [video]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "category") {
      setCategory(value)
    }
  };


  {/*const handleVideo = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    // const bodyFormData = new FormData();
    // bodyFormData.append('videoPosts', file);
    // setVideo(bodyFormData);
    setVideo(file);
  }*/}

  const handleVideo = (e) => {
    setVideo( URL.createObjectURL(e.target.files[0]));
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      let imageUrl = image
      let videoUrl = video
      imageUrl = image !== null ? await uploadImage(image[0].file) : null;
      videoUrl = video !== null ? await uploadVideo(video) : null;

      const post = {
        userid: user.id,
        title: title,
        description: description,
        image: imageUrl,
        video: videoUrl,
        category: category
      };
      const { data } = await createPost(post);
      console.log(data);
      if (data.ok === true) {
        console.log(data.msg)
        setOpen(false)
      } else {
        console.log(data.msg)
      }
    }
  }


  return (
    <div>
      <button className='addPost' onClick={handleOpen}>Publicar <svg className='addIcon' width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='#fff' d="M221.6 148.7C224.7 161.3 224.8 174.5 222.1 187.2C219.3 199.1 213.6 211.9 205.6 222.1C191.1 238.6 173 249.1 151.1 254.1V472C151.1 482.6 147.8 492.8 140.3 500.3C132.8 507.8 122.6 512 111.1 512C101.4 512 91.22 507.8 83.71 500.3C76.21 492.8 71.1 482.6 71.1 472V254.1C50.96 250.1 31.96 238.9 18.3 222.4C10.19 212.2 4.529 200.3 1.755 187.5C-1.019 174.7-.8315 161.5 2.303 148.8L32.51 12.45C33.36 8.598 35.61 5.197 38.82 2.9C42.02 .602 45.97-.4297 49.89 .0026C53.82 .4302 57.46 2.303 60.1 5.259C62.74 8.214 64.18 12.04 64.16 16V160H81.53L98.62 11.91C99.02 8.635 100.6 5.621 103.1 3.434C105.5 1.248 108.7 .0401 111.1 .0401C115.3 .0401 118.5 1.248 120.9 3.434C123.4 5.621 124.1 8.635 125.4 11.91L142.5 160H159.1V16C159.1 12.07 161.4 8.268 163.1 5.317C166.6 2.366 170.2 .474 174.1 .0026C178-.4262 181.1 .619 185.2 2.936C188.4 5.253 190.6 8.677 191.5 12.55L221.6 148.7zM448 472C448 482.6 443.8 492.8 436.3 500.3C428.8 507.8 418.6 512 408 512C397.4 512 387.2 507.8 379.7 500.3C372.2 492.8 368 482.6 368 472V352H351.2C342.8 352 334.4 350.3 326.6 347.1C318.9 343.8 311.8 339.1 305.8 333.1C299.9 327.1 295.2 320 291.1 312.2C288.8 304.4 287.2 296 287.2 287.6L287.1 173.8C288 136.9 299.1 100.8 319.8 70.28C340.5 39.71 369.8 16.05 404.1 2.339C408.1 .401 414.2-.3202 419.4 .2391C424.6 .7982 429.6 2.62 433.9 5.546C438.2 8.472 441.8 12.41 444.2 17.03C446.7 21.64 447.1 26.78 448 32V472z" /></svg></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className='formPost' onSubmit={handleSubmit}>
          <div className='creatPostContainer'>
            <div className='createPostTitle'>
              <h2>Crea tu post</h2>
            </div>
            <div className='descriptions'>
              <input className='createTitle' type="text" placeholder="Escribe el título de tu post" name="title" onChange={handleChange}></input>

              <textarea className='createDescription' type="text" placeholder="Escribe tu post" name="description" onChange={handleChange}></textarea>
            </div>
            <div className='selectCategory'>
              <select onChange={handleChange}>
                <option disabled>Elige una categoría</option>
                <option value={3}>Desayunos y meriendas</option>
                <option value={4}>Almuerzos</option>
                <option value={5}>Cenas</option>
                <option value={6}>Postres</option>
                <option value={7}>Comidas regionales</option>
                <option  value={8}>Vegetarianas y veganas</option>
                <option  value={9}>Aptas para celíacos</option>
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
                  labelIdle="Elige o arrastra tus imágenes"
                  className='imageInput'
                />
              </div>
              <div className="uploadVideo">
                <video
                  className='previewReproducer'
                  width="400"
                  height="300"
                  src={video}
                  id="video_player"
                  controls
                />

                <input
                  type="file"
                  name="file"
                  id="file_video"
                  accept="video/*"
                  onChange={handleVideo}
                />
              </div>
            

          </div>

          <button className="createPostButton" onClick={handleSubmit} type="submit">
            Publicar <svg height='25' width='25' fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96.06 288.3H351.9L252.6 493.8C250.1 499.2 246 503.8 240.1 507.1C235.9 510.3 230 512 224 512C217.1 512 212.1 510.3 207 507.1C201.1 503.8 197.9 499.2 195.4 493.8L96.06 288.3zM386.3 164C392.1 166.4 397.4 169.9 401.9 174.4C406.3 178.8 409.9 184.1 412.3 189.9C414.7 195.7 415.1 201.1 416 208.3C416 214.5 414.8 220.8 412.4 226.6C409.1 232.4 406.5 237.7 402 242.2C397.6 246.6 392.3 250.2 386.5 252.6C380.7 255 374.4 256.3 368.1 256.3H79.88C67.16 256.3 54.96 251.2 45.98 242.2C37 233.2 31.97 220.1 32 208.3C32.03 195.5 37.1 183.4 46.12 174.4C55.14 165.4 67.35 160.4 80.07 160.4H81.06C80.4 154.9 80.06 149.4 80.04 143.8C80.04 105.7 95.2 69.11 122.2 42.13C149.2 15.15 185.8 0 223.1 0C262.1 0 298.7 15.15 325.7 42.13C352.7 69.11 367.9 105.7 367.9 143.8C367.9 149.4 367.6 154.9 366.9 160.4H367.9C374.2 160.4 380.5 161.6 386.3 164z" /></svg>
          </button>
        </div>
      </form>
    </Modal>
    </div >
  );
}