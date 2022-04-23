import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery } from "../../app/services/posts";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FormatDate from "../../utils/formatDate";
import "./Detail.css";
import avatarDefault from '../../Assets/images/avatar-chef.jpg';
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../../app/services/comments";
import { CommentCard } from "../CommentCard/CommentCard";
const Detail = () => {
  const ref = useRef("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading:loading } = useGetPostQuery(id);
  const { token, user } = useSelector((state) => state.authUsers);
  const {
    data: commentsData,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetCommentsQuery(id);
  const [createComment] = useCreateCommentMutation();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const comment = {
      postid: +id,
      userid: user.id,
      comment: ref.current.value,
    };
    await createComment(comment);
    ref.current.value = "";
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return loading ? (
    "Cargando..."
  ) : (
    <>
      <Link to="/" className="btn">
        <ArrowBackIosIcon /> Volver
      </Link>
      <div className="main_container">
        <div className="content">
          <img src={data?.image} alt={data?.id} className="main_image" />
        </div>
        <div className="wrapContainer">
          <div className="containerDetail">
            <div className="user">
              <img src={data?.avatar ? data?.avatar: avatarDefault} alt="avatar" className="avatar" />
              <Link to={`/profile/${data.userid}`}>{data?.username} </Link>
              <hr />
            </div>
            <div className="description">
              <hr />
              <p>
                <Link to={`/profile/${data.userid}`}>@{data?.username}</Link> {""}
                {data?.description}
              </p>
              <hr />
            </div>
            <div>
              {!commentsData && (
                <p className="message_not_found">
                  Todavia no existen comentarios, sé el primero en comentar{" "}
                </p>
              )}
              {!isLoading &&
                commentsData &&
                commentsData.map((comment) => (
                  <CommentCard key={comment.id} {...comment} />
                ))}
            </div>

            <div className="actions">
              <button tooltip="Me gusta">
                <svg
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  
                >
                  <path d="M639.4 433.6c-8.374-20.37-31.75-30.12-52.12-21.62l-22.12 9.249l-38.75-101.1c47.87-34.1 64.87-100.2 34.5-152.7l-86.62-150.5c-7.999-13.87-24.1-19.75-39.1-13.62l-114.2 47.37L205.8 2.415C190.8-3.71 173.8 2.165 165.8 16.04L79.15 166.5C48.9 219 65.78 284.3 113.6 319.2l-38.75 101.9L52.78 411.9c-20.37-8.499-43.62 1.25-52.12 21.62c-1.75 4.124 .125 8.749 4.25 10.5l162.4 67.37c3.1 1.75 8.624-.125 10.37-4.249c8.374-20.37-1.25-43.87-21.62-52.37l-22.12-9.124l39.37-103.6c4.5 .4999 8.874 1.25 13.12 1.25c51.75 0 99.37-32.1 113.4-85.24l20.25-75.36l20.25 75.36c13.1 52.24 61.62 85.24 113.4 85.24c4.25 0 8.624-.7499 13.12-1.25l39.25 103.6l-22.12 9.124c-20.37 8.499-30.12 31.1-21.62 52.37c1.75 4.124 6.5 5.999 10.5 4.249l162.4-67.37C639.1 442.2 641.1 437.7 639.4 433.6zM275.9 162.1L163.8 115.6l36.5-63.37L294.8 91.4L275.9 162.1zM364.1 162.1l-18.87-70.74l94.49-39.12l36.5 63.37L364.1 162.1z" />
                </svg>
              </button>
              <button tooltip="No me gusta">
                <svg
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  
                >
                  <path d="M232 464h-40.01v-117.3c68.52-15.88 118-79.86 111.4-154.1L287.5 14.5C286.8 6.25 279.9 0 271.8 0H48.23C40.1 0 33.22 6.25 32.47 14.5L16.6 192.6c-6.625 74.25 42.88 138.2 111.4 154.2V464H87.98c-22.13 0-40.01 17.88-40.01 40c0 4.375 3.625 8 8.002 8h208c4.377 0 8.002-3.625 8.002-8C272 481.9 254.1 464 232 464zM180.4 300.2c-13.64 3.16-27.84 3.148-41.48-.0371C91.88 289.2 60.09 245.2 64.38 197.1L77.7 48h164.6L255.6 197.2c4.279 48.01-27.5 91.93-74.46 102.8L180.4 300.2z" />
                </svg>
              </button>
              <button tooltip="Compartir">
                <svg
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  
                >
                  <path d="M512 32H120c-13.25 0-24 10.75-24 24L96.01 288c0 53 43 96 96 96h192C437 384 480 341 480 288h32c70.63 0 128-57.38 128-128S582.6 32 512 32zM512 224h-32V96h32c35.25 0 64 28.75 64 64S547.3 224 512 224zM560 416h-544C7.164 416 0 423.2 0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48C576 423.2 568.8 416 560 416z" />
                </svg>
              </button>
              <button tooltip="Guardar post">
                <svg
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  
                >
                  <path d="M384 0H96C60.65 0 32 28.65 32 64v384c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64V64C448 28.65 419.3 0 384 0zM240 128c35.35 0 64 28.65 64 64s-28.65 64-64 64c-35.34 0-64-28.65-64-64S204.7 128 240 128zM336 384h-192C135.2 384 128 376.8 128 368C128 323.8 163.8 288 208 288h64c44.18 0 80 35.82 80 80C352 376.8 344.8 384 336 384zM496 64H480v96h16C504.8 160 512 152.8 512 144v-64C512 71.16 504.8 64 496 64zM496 192H480v96h16C504.8 288 512 280.8 512 272v-64C512 199.2 504.8 192 496 192zM496 320H480v96h16c8.836 0 16-7.164 16-16v-64C512 327.2 504.8 320 496 320z" />
                </svg>
              </button>
            </div>
            <div className="likes">
              <p className="likesLabel">
                {data?.likes} <span>Me gusta</span>
              </p>
              <p className="date">{FormatDate(data?.created_at)} </p>
            </div>
            <hr />
            <div className="commentSection">
              <form onSubmit={handleSubmit}>
                <input
                  ref={ref}
                  className="inputComment"
                  type="text"
                  placeholder="añade un comentario"
                />
                <button className="buttonPublish">Publicar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;
