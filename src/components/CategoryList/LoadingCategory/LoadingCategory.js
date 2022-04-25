import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
export default function LoadingCategory() {

    const dataCategory = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        dataCategory.map(category => (
            <div className="textContainer" key={category}>
                <span className={`nickName nickName-small`}><Skeleton/></span>
            </div>
        )
        )
    )
}
