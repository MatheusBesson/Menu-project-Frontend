import { useEffect, useState } from "react";
import { useDishDataMutate } from "../hooks/useDishDataMutate";
import type { DishData } from "../interface/DishData";

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number
    updateValue(value: any): void
    

}

interface ModalProps {
    closeModal():void;
}



const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    )
}


export function CreateModal({closeModal}: ModalProps) {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const { mutate, isSuccess, isLoading}= useDishDataMutate();

    const submit = () => {
        const dishData: DishData = {
            title,
            price,
            imageUrl
        }
        mutate(dishData)
    }

    useEffect(() => {
        if(!isSuccess) return;
        closeModal();
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Register a new Dish</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}></Input>
                    <Input label="price" value={price} updateValue={setPrice}></Input>
                    <Input label="imageUrl" value={imageUrl} updateValue={setImageUrl}></Input>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'Posting...' : 'Post'}
                </button>
            </div>
        </div>
    )
}