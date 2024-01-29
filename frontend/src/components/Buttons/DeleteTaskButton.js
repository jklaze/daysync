import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

function DeleteTaskButton(props) {
    const { currentTask } = props;
    const { updateList, setCurrentTask } = props;
    const [show, setShow] = useState(false);
    const baseURL = useSelector((state) => state.config.baseUrl);
    const token = useSelector((state) => state.config.authToken);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const deleteTask = () => {
      axios.delete(baseURL + "/tasks/" + token + "/" + currentTask)
        .then((response) => {
          console.log(response.data);
          handleClose();
          setCurrentTask(-1);
          updateList();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };

    return (
      <>
        <Button className="w-25 me-2" onClick={handleShow} variant="danger" >
          Delete
        </Button>
  
        <Modal show={show} close={handleClose}>
          <Modal.Header>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Press 'Confirm' to delete</Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteTask}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default DeleteTaskButton;