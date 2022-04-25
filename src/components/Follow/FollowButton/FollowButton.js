import React, { useEffect, useState } from "react";
import './FollowButton.css'
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useCreateFollowerMutation, useDeleteFollowerMutation, useGetFollowingQuery, } from "../../../app/services/followers";
import Spinner from "../../Spinner/Spinner";
import toast from 'react-hot-toast'

const FollowButton = (props) => {
    const { id, sizeWidth, sizeHeight, disableIcon, fontSize } = props;
    const { user, isAuthenticated } = useSelector((state) => state.authUsers);

    const actualUserId = user ? user.id : 0;
    console.log(actualUserId)
    console.log(id)


    const [idVinculo, setIdVinculo] = useState(null)
    const [isFollowing, setIsFollowing] = useState(false)
    const [loadingButtom, setLoadingButtom] = useState(false)
    const [follow, setFollow] = useState("seguir")

    const { data: followData, isLoading } = useGetFollowingQuery(actualUserId);

    console.log(isLoading)
    console.log(followData)

    const [createFollower] = useCreateFollowerMutation();
    const [deleteFollower] = useDeleteFollowerMutation();



    useEffect(() => {
        if (followData) {
            const vinculo = followData.filter((user) => user.followerId === parseInt(id))
            console.log(vinculo)

            if (vinculo.length > 0) {
                setIdVinculo(vinculo[0].id)
            }

            setIsFollowing(followData.some((user) => user.followerId === parseInt(id)))
        }

    }, [followData, id, isLoading])

    console.log(idVinculo)

    useEffect(() => {
        if (isFollowing) {
            setFollow("siguiendo")
        }
    }, [isFollowing])
    // const display = disableIcon === true ? "none" : ""

    const handleFollow = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {

            const confirm = window.confirm("Deseas dejar de seguir a este usuario?")

            setLoadingButtom(true)


            if (confirm) {
                const res = await createFollower({
                    userid: actualUserId,
                    followerId: id,
                });


                setLoadingButtom(false)
                console.log(res)

                if (res.ok === true) {
                    console.log("create follower");
                    console.log(res.msg)
                } else {
                    console.log(res.msg)
                }
            }

        } else {
            toast.error("Debes iniciar sesión para seguir a otros usuarios")
        }
    };


    const handleUnfollow = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            setLoadingButtom(true)

            const res = await deleteFollower(idVinculo);
            setLoadingButtom(false)
            console.log(res)

            if (res.ok === true) {
                console.log("unfollower done");
                console.log(res.msg)
            } else {
                console.log(res.msg)
            }
        } else {
            toast.error("Debes iniciar sesión")
        }
    };


    return (
        <button
            className="followButton"
            style={{ width: `${sizeWidth}px`, fontSize: `${fontSize}px`, height: `${sizeHeight}px` }}
            type="button"
            onClick={
                idVinculo > 0 ? handleUnfollow : handleFollow
            }>
            {loadingButtom && <Spinner />}
            {!loadingButtom && follow}
        </button>
    );
};

export default FollowButton;
