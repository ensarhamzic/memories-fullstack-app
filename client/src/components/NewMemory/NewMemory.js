import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import FormCard from "../FormCard/FormCard";
import FormError from "../FormError/FormError";
import Input from "../Input/Input";
import Button from "../Button/Button";
import axios from "axios";
import { useSelector } from "react-redux";

function NewMemory({ onSave }) {
  const token = useSelector((state) => state.user.token);
  const { memoryBookId } = useParams();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const [titleError, setTitleError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [newMemoryError, setNewMemoryError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  let error = false;

  const newMemoryHandler = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    setNewMemoryError(false);
    setTitleError(null);
    setImageError(null);
    error = false;
    const formData = new FormData();
    const enteredData = {
      memoryImage: imageRef.current.files[0],
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };
    if (!enteredData.title) {
      setTitleError("Title is required");
      error = true;
    }
    if (!enteredData.memoryImage) {
      setImageError("Image is required");
      error = true;
    } else if (enteredData.memoryImage.type !== "image/jpeg") {
      setImageError("Must be jpg format");
      error = true;
    } else if (enteredData.memoryImage.size > 3000000) {
      setImageError("Must be less than 3mb size");
      error = true;
    }

    if (error) {
      setIsCreating(false);
      return;
    }
    formData.append("memoryImage", imageRef.current.files[0]);
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    try {
      const response = await axios.post(
        `/memoryBooks/${memoryBookId}/memories`,
        formData,
        {
          headers: {
            Accept: "multipart/form-data",
            authorization: token,
          },
        }
      );
      onSave(response.data.memory);
    } catch (e) {
      setNewMemoryError("Error while creating new memory");
    }
    setIsCreating(false);
  };
  return (
    <FormCard onSubmit={newMemoryHandler} title="Create New Memory">
      <Input
        id="title"
        title="Memory title"
        ref={titleRef}
        type="text"
        placeholder="Title"
        error={titleError}
      />
      <Input
        id="image"
        ref={imageRef}
        type="file"
        title="Image"
        placeholder="Image"
        error={imageError}
      />
      <Input
        id="description"
        title="Description"
        ref={descriptionRef}
        type="text"
        placeholder="description"
      />
      <FormError error={newMemoryError} />
      <Button type="submit" disabled={isCreating}>
        {isCreating ? "Waiting..." : "Make New Memory"}
      </Button>
    </FormCard>
  );
}

export default NewMemory;
