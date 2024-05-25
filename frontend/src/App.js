import './App.css';
import { BrowserRouter , Route } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";

function App() {

  return (
    <div className="App">
       <BrowserRouter>
        <Route path="/homepage" component={Homepage} /> 
        <Route path="/chats" component={ChatPage}/>
        </BrowserRouter>  
    </div>
  );
}

export default App;