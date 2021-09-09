import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import FormCard from "../FormCard/FormCard";
import FormError from "../FormError/FormError";
import Input from "../Input/Input";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNewMemoryBook } from "../../store/memoryBooksAsyncActions";

let error = false;

function NewMemoryBook() {
  const dispatchRedux = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [isCreating, setIsCreating] = useState(false);
  const [titleError, setTitleError] = useState(null);
  const [newMemoryBookError, setNewMemoryBookError] = useState(null);
  const titleRef = useRef();
  const locationRef = useRef();
  const newMemoryBookHandler = async (e) => {
    e.preventDefault();
    error = false;
    setNewMemoryBookError(null);
    setTitleError(null);
    setIsCreating(true);
    const enteredData = {
      title: titleRef.current.value,
      location: locationRef.current.value,
    };
    if (!enteredData.title) {
      setTitleError("Cannot be empty");
      error = true;
    }
    if (error) {
      setIsCreating(false);
      return;
    }
    try {
      const response = await dispatchRedux(
        addNewMemoryBook(enteredData, token)
      );
      if (response.error) {
        throw new Error();
      }
    } catch (e) {
      setNewMemoryBookError(
        "There was error trying to create new memory book. Try again."
      );
    }
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
