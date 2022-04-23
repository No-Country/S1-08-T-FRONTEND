import React, { useEffect, useState } from "react";
import './FollowButton.css'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useCreateFollowerMutation, useDeleteFollowerMutation, useGetFollowingQuery, } from "../../../app/services/followers";
import Spinner from "../../Spinner/Spinner";
import toast from 'react-hot-toast'

const FollowButton = (props) => {
    const { userid, sizeWidth, sizeHeight, disableIcon, fontSize } = props;
    const { user, isAuthenticated } = useSelector((state) => state.authUsers);

    const actualUserId = user;
    console.log(actualUserId)

    const [idVinculo, setIdVinculo] = useState(null)
    const [isFollowing, setIsFollowing] = useState(false)
    const [loadingButtom, setLoadingButtom] = useState(false)
    const { data: followData , isLoading} = useGetFollowingQuery(actualUserId);

    console.log(isLoading)
    console.log(followData)

    const [createFollower] = useCreateFollowerMutation();
    const [deleteFollower] = useDeleteFollowerMutation();



    console.log(idVinculo)
    useEffect(() => {
        if(!isLoading){
        if (followData) {
            const vinculo = followData.filter((user) => user.userid === parseInt(userid))
            console.log(vinculo)

            if (vinculo.length > 0) {
                setIdVinculo(vinculo[0].id)
            }

            setIsFollowing(followData.some((user) => user.userid === parseInt(userid)))
        }
    }

    }, [followData, userid,isLoading])



    const display = disableIcon === true ? "none" : ""

    const handleFollow = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            setLoadingButtom(true)

            const { data } = await createFollower({
                userid: actualUserId,
                followerId: userid,
            });



            setLoadingButtom(false)
            console.log(data)

            if (data.ok === true) {
                console.log("create follower");
                console.log(data.msg)
            } else {
                console.log(data.msg)
            }
            window.location.reload(false);
        } else {
            toast.error("Debes iniciar sesión para seguir a otros usuarios")
        }
    };


    const handleUnfollow = async (e) => {
        e.preventDefault();
        await deleteFollower(idVinculo);
        console.log("unfollower done");
        window.location.reload(false);
    };

    return (
        <button
            className="followButton"
            style={{ width: `${sizeWidth}px`, fontSize: `${fontSize}px`, height: `${sizeHeight}px` }}
            type="button"
            onClick={
                idVinculo ? handleUnfollow : handleFollow
            }>
            {
                loadingButtom ? <Spinner /> :
                    <>
                        {isFollowing ?
                            <>
                                <AiFillHeart style={{ marginRight: "0.5rem", display: `${display}` }} />
                                Dejar de seguir
                            </>
                            :
                            <>
                                <AiOutlineHeart style={{ marginRight: "0.5rem", display: `${display}` }} />
                                Seguir
                            </>
                        }
                    </>
            }
        </button>
    );
};

export default FollowButton;
