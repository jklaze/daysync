import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { faCheck, faRotateBack, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import axios from 'axios';

function TaskElement(props) {
    const { status, id, title, expire, priority, remindMe } = props;
    const { updateList, setCurrentTask } = props;
    const [ taskVariant, setTaskVariant ] = useState("outline-dark");
    const [ isChecked, setIsChecked ] = useState(false);
    const [ hasReminder, setHasReminder ] = useState(remindMe);

    const baseURL = useSelector(state => state.config.baseUrl);
    const token = useSelector(state => state.config.authToken);

    const setStatus = (newStatus) => {
        axios.post(baseURL + '/tasks/' + token + "/status", {
            'id': id,
            'status': newStatus
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then(
            setTimeout(() => {
                updateList();
                setCurrentTask(-1);
            }, 2500)
        )
    }

    const applyPriority = () => {
        switch (priority) {
            case 1:
            case 2:
                setTaskVariant("outline-light");
                break;
            case 3:
            case 4:
                setTaskVariant("outline-warning");
                break;
            case 5:
                setTaskVariant("outline-danger");
                break;
            default:
                setTaskVariant("outline-light");
                break;
        }
    }
    useEffect( applyPriority, []);

    return (
        <Button variant={ taskVariant } className="m-1 w-100 d-flex" onClick={ () => setCurrentTask(id) }>
            <div className="w-100 text-start">
                <p className="h3 lh-lg ms-2">{title}</p>
                <p className="h5 ms-3">{expire}  |  Priority: {priority}/5</p>
            </div>
            <div className="w-25 my-auto d-flex">
                { !isChecked
                    ?
                        <Button variant="outline-success" className="w-100 mx-1" onClick={
                            () => (
                                setTaskVariant("success"),
                                setIsChecked(true),
                                setStatus(2)
                            )} >
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                    :
                        <Button variant="warning" className="w-100 mx-1" onClick={
                            () => (
                                applyPriority(),
                                setIsChecked(false),
                                setStatus(1)
                            )} >
                            <FontAwesomeIcon icon={faRotateBack}/>
                        </Button>
                }
                {/* <Button variant={hasReminder ? "primary" : "outline-primary" } className="w-100 mx-1" onClick={() => setHasReminder(!hasReminder) }>
                    <FontAwesomeIcon icon={faBell} />
                </Button> */}
            </div>
        </Button>
    );
}

export default TaskElement;