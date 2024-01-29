import './App.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import SiteUnderConstruction from './pages/SiteUnderConstruction';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from './redux/pageSlice';

function App() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page.page);
  const data = useSelector((state) => state.page.data);
  const isAuth = useSelector((state) => state.config.isAuth);

  const handlePageChange = () => {
    if (!isAuth) {
      dispatch(setPage('auth'));
    }
    switch (page) {
      case 'home':
        return <HomePage />
      case 'auth':
        return <AuthPage action={data.action} />
      default:
        return <SiteUnderConstruction />
    }
  }


  return (
    <div className="App ">
      { 
        handlePageChange()
      }
    </div>
  );
}

export default App;
