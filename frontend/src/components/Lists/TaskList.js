import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

import TaskElement from "../Elements/TaskElement";
import TaskDetail from "../Elements/TaskDetail";
import CreateTaskBubble from '../Buttons/CreateTaskBubble';
import Loader from "../Elements/Loader";

function TaskList() {

    const [taskList, setTaskList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentTask, setCurrentTask] = useState(-1);

    const baseURL = useSelector(state => state.config.baseUrl);
    const token = useSelector(state => state.config.authToken);

    const updateList = () => {
        axios.get(baseURL + "/tasks/" + token
        ).then((response) => {
            setTaskList(response.data);
            setIsLoaded(true);
        }).catch((error) => {
            console.log(error);
        });

        return () => {
            setTaskList("");
        };
    }

    useEffect(updateList, []);

    return (
        <div className="d-flex w-100 justify-content-center">
            <Card className="shadow translucent p-3 w-50 my-2 mx-2 h-fit-content">
                <h1 className="text-white">To-Do List</h1>
                {
                    isLoaded === false ?
                        <div className="w-25 mx-auto">
                            <Loader />
                        </div>
                    :
                    (
                        taskList.length === 0
                        ?
                            <h2 className="text-secondary">Al momento non possiedi task</h2>
                        :
                        taskList.map((item) => {
                            return (
                                <TaskElement 
                                    key={item.id}
                                    id={item.id}
                                    title={item.title} 
                                    expire={item.expireAt} 
                                    priority={item.priority} 
                                    status={item.status}
                                    updateList={updateList}
                                    setCurrentTask={setCurrentTask}
                                />
                            )
                        })
                    )
                }
            </Card>
            {
                currentTask !== -1
                ?
                    <Card className="shadow translucent p-3 w-50 my-2 mx-2 h-fit-content task-detail-container">
                        <TaskDetail 
                            currentTask={ currentTask }
                            setCurrentTask={ setCurrentTask }
                            updateList={updateList} />
                    </Card>
                :
                    null
            }
            <CreateTaskBubble updateList={updateList} />
        </div>
    );
}

export default TaskList;
