import React from 'react'
import './UsersFoundModal.css';

export const handleUserFoundModalOpen = () => {
    const userFoundModal = document.querySelector(".userFound-modal-container", ".userFound");
    userFoundModal.style.visibility = "visible"
    userFoundModal.style.opacity = "1";
    userFoundModal.classList.toggle("userFound-Modal-close")
}
export const handleUserFoundModaClose = () => {
    const userFoundModal = document.querySelector(".userFound-modal-container");
    userFoundModal.style.visibility = "hidden"
    userFoundModal.style.opacity = "0";
}


window.addEventListener("click", (e) => {
    const userFoundModal = document.querySelector(".userFound-modal-container");

    if (e.target === userFoundModal) {
        handleUserFoundModaClose()
    }
})

window.addEventListener("click", (e) => {
    const inputSearch = document.querySelector(".MuiInputBase-input");

    if (e.target === inputSearch) {
        handleUserFoundModalOpen()
    }
})


export default function UsersFoundModal({ children, dataOpenResult }) {
    return (
        <div className={`userFound-modal-container ${dataOpenResult.length > 0 ? "open-result" : " "}`}>
            {children}
        </div>
    )
}
