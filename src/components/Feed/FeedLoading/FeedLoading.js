import React from 'react'

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import whiteBackground from '../../../Assets/images/whiteBackground.jpg';
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

export default function FeedLoading() {

    const dataFeed = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        dataFeed.map((post) => (
            <div className="feedCardContainer" key={post}>
                <div className="feedCard">
                    <Card sx={{ maxHeight: 620, marginLeft: 2, marginRight: 2, width: 645 }}>
                        <CardHeader
                            className="userIntro"
                            avatar={
                                <Avatar sx={{ border: '1px solid #b1b1b5' }} src={<Skeleton />} aria-label="recipe" alt="description" />
                            }
                            titleTypographyProps={{ variant: "h6", marginBottom: -1, fontWeight: "bold", textTransform: "capitalize" }}
                            title={<Skeleton width={150} />}
                            subheaderTypographyProps={{ variant: "subtitle2" }}
                            subheader={<Skeleton width={150}/>}
                        />
                        <CardMedia
                            component="img"
                            image={whiteBackground}
                            alt={"whiteBackground"}
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
                                    <Skeleton />
                                </button>
                                <button className="socialRatingB">
                                    <Skeleton />
                                </button>
                                <button className="shareButton">
                                    <Skeleton />
                                </button>
                                <Link className="socialIcon" to={`/post/`}>
                                    <Skeleton />
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
                                sx={{ fontSize: "1.3rem", color: "#000", }}
                                variant="body2"
                            >
                                {<Skeleton />}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
        )
    )
}
