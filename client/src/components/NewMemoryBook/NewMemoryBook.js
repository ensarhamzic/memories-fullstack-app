import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import FormCard from "../FormCard/FormCard";
import FormError from "../FormError/FormError";
import Input from "../Input/Input";
import styles from "./NewMemoryBook.module.css";

function NewMemoryBook() {
  const [isCreating, setIsCreating] = useState(false);
  const [titleError, setTitleError] = useState(null);
  const [newMemoryBookError, setNewMemoryBookError] = useState(null);
  const titleRef = useRef();
  const locationRef = useRef();
  const newMemoryBookHandler = async (e) => {
    e.preventDefault();
    setTitleError(null);
    setIsCreating(true);
    const enteredData = {
      title: titleRef.current.value,
      location: locationRef.current.value,
    };
    if (!enteredData.title) {
      setTitleError("Cannot be empty");
    }
    // TODO: Add New Memory Book
    setIsCreating(false);
  };
  return (
    <FormCard onSubmit={newMemoryBookHandler} title="Create New Memory Book">
      <Input
        id="title"
        title="Memory Book title"
        ref={titleRef}
        type="text"
        placeholder="Title"
        error={titleError}
      />
      <Input
        id="location"
        title="Location"
        ref={locationRef}
        type="text"
        placeholder="Location"
      />
      <FormError error={newMemoryBookError} />
      <Button type="submit" disabled={isCreating}>
        {isCreating ? "Waiting..." : "Make New Memory Book"}
      </Button>
    </FormCard>
  );
}

export default NewMemoryBook;
