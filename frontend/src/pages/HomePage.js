import TaskList from '../components/Lists/TaskList';

function HomePage() {
    return (
        <div className='App-header'>
            <div className='d-flex w-100 justify-content-center'>
                <TaskList />
            </div>
        </div>
    );
}

export default HomePage;