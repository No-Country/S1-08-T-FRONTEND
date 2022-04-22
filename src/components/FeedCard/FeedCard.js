import React from "react";
import "./FeedCard.css";
import Share from "../Share/Share";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import avatarDefault from "../../Assets/images/avatar-chef.jpg";

export default function FeedCard({ post }) {
  const {
    userid,
    username,
    description,
    avatar,
    image,
    created_at,
    category,
    likes,
  } = post;

  return (
    <div className="feedCard">
      <Card sx={{ maxHeight: 620, marginLeft: 2, marginRight: 2, width: 645 }}>
        <Link to={`/me/${userid}`}>
          <CardHeader
            className="userIntro"
            avatar={
              <Avatar
                sx={{ border: "1px solid #b1b1b5" }}
                src={avatar ? avatar : avatarDefault}
                aria-label="recipe"
                alt={description}
              />
            }
            titleTypographyProps={{ variant: "h5", marginBottom: -1 }}
            title={username}
            subheaderTypographyProps={{ variant: "subtitle2" }}
            subheader={description}
          />
        </Link>
        <CardMedia
          component="img"
          image={image}
          alt={description}
          className="mainImg"
          sx={{
            maxWidth: 614,
            maxHeight: 409.33,
            marginLeft: 2,
            marginRight: 2,
            borderRadius: 1,
          }}
        />

        <CardActions
          disableSpacing
          className="social"
          sx={{
            backgroundColor: "#EC5853",
            justifyContent: "space-around",
            marginTop: 3,
            marginLeft: 2,
            maxWidth: 614,
            paddingTop: 1.5,
            paddingBottom: 1.5,
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          <div className="socialButton">
            <button className="socialRatingA">
              <svg
                width="22"
                height="22"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M639.4 433.6c-8.374-20.37-31.75-30.12-52.12-21.62l-22.12 9.249l-38.75-101.1c47.87-34.1 64.87-100.2 34.5-152.7l-86.62-150.5c-7.999-13.87-24.1-19.75-39.1-13.62l-114.2 47.37L205.8 2.415C190.8-3.71 173.8 2.165 165.8 16.04L79.15 166.5C48.9 219 65.78 284.3 113.6 319.2l-38.75 101.9L52.78 411.9c-20.37-8.499-43.62 1.25-52.12 21.62c-1.75 4.124 .125 8.749 4.25 10.5l162.4 67.37c3.1 1.75 8.624-.125 10.37-4.249c8.374-20.37-1.25-43.87-21.62-52.37l-22.12-9.124l39.37-103.6c4.5 .4999 8.874 1.25 13.12 1.25c51.75 0 99.37-32.1 113.4-85.24l20.25-75.36l20.25 75.36c13.1 52.24 61.62 85.24 113.4 85.24c4.25 0 8.624-.7499 13.12-1.25l39.25 103.6l-22.12 9.124c-20.37 8.499-30.12 31.1-21.62 52.37c1.75 4.124 6.5 5.999 10.5 4.249l162.4-67.37C639.1 442.2 641.1 437.7 639.4 433.6zM275.9 162.1L163.8 115.6l36.5-63.37L294.8 91.4L275.9 162.1zM364.1 162.1l-18.87-70.74l94.49-39.12l36.5 63.37L364.1 162.1z" />
              </svg>
            </button>
            <button className="socialRatingB">
              <svg
                width="22"
                height="22"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M232 464h-40.01v-117.3c68.52-15.88 118-79.86 111.4-154.1L287.5 14.5C286.8 6.25 279.9 0 271.8 0H48.23C40.1 0 33.22 6.25 32.47 14.5L16.6 192.6c-6.625 74.25 42.88 138.2 111.4 154.2V464H87.98c-22.13 0-40.01 17.88-40.01 40c0 4.375 3.625 8 8.002 8h208c4.377 0 8.002-3.625 8.002-8C272 481.9 254.1 464 232 464zM180.4 300.2c-13.64 3.16-27.84 3.148-41.48-.0371C91.88 289.2 60.09 245.2 64.38 197.1L77.7 48h164.6L255.6 197.2c4.279 48.01-27.5 91.93-74.46 102.8L180.4 300.2z" />
              </svg>
            </button>
            <Share />
            <button className="socialIcon">
              <svg
                width="25"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M384 0H96C60.65 0 32 28.65 32 64v384c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64V64C448 28.65 419.3 0 384 0zM240 128c35.35 0 64 28.65 64 64s-28.65 64-64 64c-35.34 0-64-28.65-64-64S204.7 128 240 128zM336 384h-192C135.2 384 128 376.8 128 368C128 323.8 163.8 288 208 288h64c44.18 0 80 35.82 80 80C352 376.8 344.8 384 336 384zM496 64H480v96h16C504.8 160 512 152.8 512 144v-64C512 71.16 504.8 64 496 64zM496 192H480v96h16C504.8 288 512 280.8 512 272v-64C512 199.2 504.8 192 496 192zM496 320H480v96h16c8.836 0 16-7.164 16-16v-64C512 327.2 504.8 320 496 320z" />
              </svg>
              GUARDAR
            </button>
            <Link className="socialIcon" to={`/${post.id}`}>
              <svg
                width="25"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M560 448H512V113.5c0-27.25-21.5-49.5-48-49.5L352 64.01V128h96V512h112c8.875 0 16-7.125 16-15.1v-31.1C576 455.1 568.9 448 560 448zM280.3 1.007l-192 49.75C73.1 54.51 64 67.76 64 82.88V448H16c-8.875 0-16 7.125-16 15.1v31.1C0 504.9 7.125 512 16 512H320V33.13C320 11.63 300.5-4.243 280.3 1.007zM232 288c-13.25 0-24-14.37-24-31.1c0-17.62 10.75-31.1 24-31.1S256 238.4 256 256C256 273.6 245.3 288 232 288z" />
              </svg>
              VER POST
            </Link>
          </div>
        </CardActions>

        <CardContent
          className="descriptionFeed"
          sx={{
            marginTop: 2.5,
            marginBottom: 3,
            marginLeft: 2,
            maxWidth: 614,
            paddingTop: 1,
            paddingBottom: 1,
            paddingRight: 0.5,
            paddingLeft: 0.5,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            sx={{ fontSize: "1.1rem" }}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
