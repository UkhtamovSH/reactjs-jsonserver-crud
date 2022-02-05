import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routess from './router/Routess';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
      <h2>Crud with Json Server</h2>
      <ToastContainer />
      <Router>
        <Routess />
      </Router>
    </div>
  );
}

export default App;
