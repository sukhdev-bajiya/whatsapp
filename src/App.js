import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Component/Chat';
import Login from './Component/Login';
import Sidebar from './Component/Sidebar';
import { useStateValue } from './Redux/StateProvider';
function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {
        !user ? (
          <Login />
        ) :
          (<div className="app__body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path={'/rooms/:roomId'}><Chat /></Route>
                <Route path={'/'}></Route>
              </Switch>
            </Router>
          </div>)
      }
    </div>
  );
}

export default App;
