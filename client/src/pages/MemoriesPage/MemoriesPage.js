import React, { useState } from "react";
import { useParams, Route, Switch, useHistory } from "react-router";
import NewMemory from "../../components/NewMemory/NewMemory";
import styles from "./MemoriesPage.module.css";
import FormTogglerButton from "../../components/FormTogglerButton/FormTogglerButton";

function MemoriesPage() {
  const history = useHistory();
  const { memoryBookId } = useParams();
  const [formVisible, setFormVisible] = useState(false);

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

  return (
    <>
      <Switch>
        <Route path="/memory-books/:memoryBookId/memories/new">
          <NewMemory />
        </Route>
      </Switch>
      <FormTogglerButton
        formIsVisible={formVisible}
        openedText="Close Form"
        closedText="Create New Memory"
        onClick={formToggler}
      />
    </>
  );
}

export default MemoriesPage;
