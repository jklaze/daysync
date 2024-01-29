import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

function CreateTaskBubble(props) {
    const baseUrl = useSelector(state => state.config.baseUrl);
    const token = useSelector(state => state.config.authToken);

    const { updateList } = props;

    const [showModal, setShowModal] = useState(false);
    const [taskData, setTaskData] = useState({remind_me: false});
    const [taskExpireDate, setTaskExpireDate] = useState("");
    const [taskExpireTime, setTaskExpireTime] = useState("");


    const createTask = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await axios.post(baseUrl + "/tasks/"+ token +"/create", taskData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setShowModal(false);
            updateList();
            console.log(response.data);
        }).catch((error) => {
            console.log(error.response.data);
        })
        setTaskData({remind_me: false});
    }
    
    useEffect(() => {
        composeDate(taskExpireDate, taskExpireTime);
    }, [taskExpireDate, taskExpireTime]);

    const composeDate = (date, time) => {
        let compDate = date + "T" + time;
        setValue("expire_at", compDate);
    }

    const setValue = (key, newValue) => {
        const _taskData = { ...taskData };
        _taskData[key] = newValue;
        setTaskData(_taskData);
    }
    
    return (
        <>
            <div className="create-task-bubble shadow" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPlus} />
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" onChange={(event) => setValue("title", event.target.value)} required />
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} onChange={(event) => setValue("body", event.target.value)} required />
                        </Form.Group>
                        <div className='d-flex mt-3'>
                                
                            <Form.Group className='w-75 me-3'>
                                <Form.Label>Expire</Form.Label>
                                <div className='d-flex'>
                                    <Form.Control className='me-1' type="date" placeholder="Expire" onChange={(event) => setTaskExpireDate(event.target.value)} required />
                                    <Form.Control className='w-50' type="time" placeholder="Expire" onChange={(event) => setTaskExpireTime(event.target.value)} required />
                                </div>
                            </Form.Group>
                            <Form.Group className='w-50'>
                                <Form.Label>Priority</Form.Label>
                                <Form.Select aria-label="Priority" defaultValue={0} onChange={(event) => setValue("priority", event.target.value)} required >
                                    <option value="0" disabled hidden>Select..</option>
                                    <option className='text-secondary' value="1"><b>Very low</b></option>
                                    <option className='text-secondary' value="2"><b>Low</b></option>
                                    <option className='text-warning' value="3"><b>Medium</b></option>
                                    <option className='text-warning' value="4"><b>High</b></option>
                                    <option className='text-danger' value="5"><b>Very high</b></option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <Button className='w-25 me-2' variant="outline-secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button className='w-25' variant="primary" onClick={createTask}>
                                Create
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateTaskBubble;