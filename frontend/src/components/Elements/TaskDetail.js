import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

import DeleteTaskButton from '../Buttons/DeleteTaskButton';
import Loader from "../Elements/Loader";

function TaskDetail(props){
    const { currentTask } = props;
    const { setCurrentTask, updateList } = props;
    const [taskData, setTaskData] = useState({id: currentTask});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [taskExpireDate, setTaskExpireDate] = useState("");
    const [taskExpireTime, setTaskExpireTime] = useState("");

    const baseURL = useSelector(state => state.config.baseUrl);
    const token = useSelector(state => state.config.authToken);
    
    useEffect(() => {
        setIsLoaded(false);
        axios.get(baseURL + "/tasks/" + token + "/" + currentTask).then((response) => {
            setTaskExpireDate(response.data.expire_at.split(" ")[0]);
            setTaskExpireTime(response.data.expire_at.split(" ")[1]);
            setTaskData({id: currentTask, ...response.data});
        }).catch((error) => {
            console.log(error.response.data);
        }).finally(() => {
            setIsLoaded(true);
            setIsEdited(false);
        });
    }, [currentTask]);
    
    useEffect(() => {
        composeDate(taskExpireDate, taskExpireTime);
    }, [taskExpireDate, taskExpireTime]);

    const setValue = (key, newValue) => {
        const _taskData = { ...taskData };
        _taskData[key] = newValue;
        setTaskData({id: currentTask, ..._taskData});
    }

    const composeDate = (date, time) => {
        let compDate = date + "T" + time;
        setValue("expire_at", compDate);
    }

    const updateTask = () => {
        axios.put(baseURL + "/tasks/" + token, taskData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            updateList();
            setIsEdited(false);
            console.log(response.data);
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    return (
        <>
            {
                isLoaded === false
                ?
                    <div className="w-25 mx-auto">
                        <Loader />
                    </div>
                :
                    <>
                        <h1 className="text-light">{taskData.title}</h1>
                        <Form>
                            <Form.Group>
                                <Form.Label className='text-light'>Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" defaultValue={taskData.title} onChange={(event) => {setValue("title", event.target.value); setIsEdited(true);}} required />
                            </Form.Group>
                            <Form.Group className='mt-3'>
                                <Form.Label className='text-light'>Description</Form.Label>
                                <Form.Control as="textarea" placeholder="Description" defaultValue={taskData.body} style={{ height: '100px' }} onChange={(event) => {setValue("body", event.target.value); setIsEdited(true);}} required />
                            </Form.Group>
                            <div className='d-flex mt-3'>
                                <Form.Group className='w-50 me-3'>
                                    <Form.Label className='text-light'>Expire</Form.Label>
                                    <div className='d-flex'>
                                        <Form.Control className='me-1' type="date" placeholder="Expire" defaultValue={taskExpireDate} onChange={(event) => {setTaskExpireDate(event.target.value); setIsEdited(true); }} required />
                                        <Form.Control className='w-50' type="time" placeholder="Expire" defaultValue={taskExpireTime} onChange={(event) => {setTaskExpireTime(event.target.value); setIsEdited(true); }} required />
                                    </div>
                                </Form.Group>
                                <Form.Group className='w-25 me-1'>
                                    <Form.Label className='text-light'>Priority</Form.Label>
                                    <Form.Select aria-label="Priority" defaultValue={taskData.priority} onChange={(event) => {setValue("priority", event.target.value); setIsEdited(true);}} required >
                                        <option value="0" disabled hidden>Select..</option>
                                        <option className='text-secondary' value="1">Very low</option>
                                        <option className='text-secondary' value="2">Low</option>
                                        <option className='text-warning' value="3">Medium</option>
                                        <option className='text-warning' value="4">High</option>
                                        <option className='text-danger' value="5">Very high</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className='w-25'>
                                    <Form.Label className='text-light'>Status</Form.Label>
                                    <Form.Select aria-label="Status" defaultValue={taskData.status} onChange={(event) => {setValue("status", event.target.value); setIsEdited(true);}} required >
                                        <option value="0" disabled hidden>Select..</option>
                                        <option value="1">To do</option>
                                        <option value="3">In progress</option>
                                        <option value="2">Completed</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="d-flex justify-content-start mt-4">
                                <DeleteTaskButton 
                                    currentTask={ currentTask }
                                    setCurrentTask={ setCurrentTask }
                                    updateList={updateList} 
                                />
                                <Button className='w-25 me-2' variant="outline-light" onClick={() => setCurrentTask(-1)}>
                                    Close
                                </Button>
                                <Button className='w-25' variant="primary" disabled={ isEdited ? "" : "disabled" } onClick={updateTask} >
                                    Edit
                                </Button>
                            </div>
                        </Form>
                    </>
            }
        </>
    )
}

export default TaskDetail;