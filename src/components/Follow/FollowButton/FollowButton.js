import React, { useEffect, useState } from "react";
import './FollowButton.css'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import Spinner from "../../Spinner/Spinner";
import toast from 'react-hot-toast'
// import Follow from "./Follow";
// import Unfollow from "./UnFollow";
import { useCreateFollowerMutation, useDeleteFollowerMutation, useGetAllFollowersStateMutation } from '../../../app/services/followers';

const FollowButton = (props) => {
    const { id, sizeWidth, sizeHeight, disableIcon, fontSize, bg1, bg2, color1, color2 } = props;
    const { user, isAuthenticated } = useSelector((state) => state.authUsers);
    const { data: followData, loading: isLoading } = useSelector((state) => state.followers.usersAllFollowers);
    const [getAllFollowersState] = useGetAllFollowersStateMutation()
    const [createFollower] = useCreateFollowerMutation();
    const [deleteFollower] = useDeleteFollowerMutation();


    const actualUserId = user.id ? user.id : 0;
    // console.log("actualUserId", actualUserId)
    console.log("id", id)
    console.log("followData", followData)
    // console.log("isLoading: ", isLoading)




    const [idVinculo, setIdVinculo] = useState(null)
    const [isFollowing, setIsFollowing] = useState(false)
    const [loadingButtom, setLoadingButtom] = useState(false)
    const [follow, setFollow] = useState(null)
    console.log("isFollowing: ", isFollowing)
    console.log("idVinculo: ", idVinculo)


    useEffect(() => {
        getAllFollowersState()
    }, [getAllFollowersState]);



    useEffect(() => {
        const searchIdVinculo = () => {
            if (!isLoading && followData) {
                const vinculo = followData.filter((user) => user.userid === id)
                console.log(vinculo)

                if (vinculo.length > 0) {
                    setIdVinculo(vinculo[0].id)
                    setIsFollowing(true)
                }

            }
        }

        searchIdVinculo()

    }, [isLoading, followData, id])


    useEffect(() => {
        if (isFollowing) {
            setFollow("Siguiendo")
        } else {
            setFollow("Seguir")
        }
    }, [isFollowing])

    const handleFollow = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {

            setLoadingButtom(true)

            const res = await createFollower({
                userid: id,
                followerId: actualUserId,
            });

            console.log(res)

            if (res.ok === true) {
                console.log("create follower");
                console.log(res.msg)
                setFollow("Siguiendo")
                getAllFollowersState()
            } else {
                console.log(res.msg)
            }
            setIdVinculo(res.id)
            getAllFollowersState()
            setLoadingButtom(false)

        } else {
            toast.error("Debes iniciar sesión para seguir a otros usuarios")
        }
    };
    const handleUnfollow = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {

            const confirm = window.confirm("Deseas dejar de seguir a este usuario?")

            if (confirm) {
                setLoadingButtom(true)
                
                const res = await deleteFollower(idVinculo);
                console.log(res)

                if (res.ok === true) {
                    console.log("unfollower done");
                    setIsFollowing(false)
                    console.log(res.msg)
                    setFollow("Seguir")
                    getAllFollowersState()

                } else {
                    console.log(res.msg)
                }
                setIdVinculo(null)
                setIsFollowing(false)
                getAllFollowersState()
                setLoadingButtom(false)
            }

        } else {
            toast.error("Debes iniciar sesión")
        }
    };
    const display = disableIcon === true ? "none" : ""


    return (
        <button
            className="followButton"
            style={{ width: `${sizeWidth}px`, fontSize: `${fontSize}px`, height: `${sizeHeight}px`, backgroundColor: `${isFollowing ? bg1 : bg2}`, color: `${isFollowing ? color1 || "#000" : color2 || "#fff"}`, border: `${isFollowing ? "1px solid #c2c2c6" : "none"}` }}
            type="button"
            onClick={
                idVinculo ? handleUnfollow : handleFollow
            }>
            {loadingButtom && <Spinner />}
            {!loadingButtom && (
                <>
                    {follow || <Spinner />}
                    {isFollowing ? <AiOutlineHeart style={{ marginRight: "0.5rem", display: `${display}` }} /> : <AiFillHeart style={{ marginRight: "0.5rem", color: "red", display: `${display}` }} />}
                </>
            )}
        </button>
    );
};

export default FollowButton;
