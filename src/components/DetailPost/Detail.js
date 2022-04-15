import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery } from "../../app/services/posts";
import { useSelector } from "react-redux";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./Detail.css";
import Share from '../Share/Share';
const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useGetPostQuery(id);
  const { token } = useSelector((state) => state.authUsers);
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
        <div className="container">
          <div className="user">
            <img src={data?.avatar} alt="avatar" className="avatar" />
            <p>{data?.username} </p>
            <hr />
          </div>
          <div className="description">
            <hr />
            <p>
              <span>@{data?.username}</span>
              {data?.description}
            </p>
            <hr />
          </div>
          <div className="actions">
            <button>
              <HeartBrokenIcon />
            </button>
            <button>
              <CommentIcon />
            </button>
            <Share id={data?.id}/>
          </div>
          <div className="likes">
            <p>
              {data?.likes} <span>Me gusta</span>
            </p>
            <p className="date">
              {new Date(data?.created_at)
                .toString()
                .split(" ")
                .slice(0, 3)
                .join(" ")}{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;
