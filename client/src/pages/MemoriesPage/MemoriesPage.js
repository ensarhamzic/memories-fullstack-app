import React, { useState, useEffect } from "react";
import { useParams, Route, Switch, useHistory } from "react-router";
import NewMemory from "../../components/NewMemory/NewMemory";
import styles from "./MemoriesPage.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import FormTogglerButton from "../../components/FormTogglerButton/FormTogglerButton";
import Memories from "../../components/Memories/Memories";

function MemoriesPage() {
  const token = useSelector((state) => state.user.token);
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memoriesError, setMemoriesError] = useState(null);
  const history = useHistory();
  const { memoryBookId } = useParams();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getMemories = async () => {
      try {
        const response = await axios.get(
          `/memoryBooks/${memoryBookId}/memories`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        setMemories(response.data.memories);
        console.log(response.data.memories);
      } catch (e) {
        setMemoriesError("Error while trying to get memories");
      }
      setIsLoading(false);
    };
    getMemories();
  }, [memoryBookId, token]);

  const formToggler = () => {
    if (
      history.location.pathname === `/memory-books/${memoryBookId}/memories`
    ) {
      history.replace(`/memory-books/${memoryBookId}/memories/new`);
    } else {
      history.replace(`/memory-books/${memoryBookId}/memories`);
    }
    setFormVisible((prev) => !prev);
  };

  const newMemoryHandler = (newMemory) => {
    setMemories((prev) => [...prev, newMemory]);
  };

  return (
    <>
      <Switch>
        <Route path="/memory-books/:memoryBookId/memories/new">
          <NewMemory
            onSave={(newMemory) => {
              newMemoryHandler(newMemory);
            }}
          />
        </Route>
      </Switch>
      <FormTogglerButton
        formIsVisible={formVisible}
        openedText="Close Form"
        closedText="Create New Memory"
        onClick={formToggler}
      />
      {memoriesError && <p className={styles.error}>{memoriesError}</p>}
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {memories && <Memories memories={memories} />}
    </>
  );
}

export default MemoriesPage;
