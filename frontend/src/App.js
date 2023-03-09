import "./App.css";
import { Routes, Route, useParams, Link} from "react-router-dom"
import Register from "./components/Register"


function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        <h1>Project 4 </h1>
      </header>
      <>
      <Routes >
     <Route path="/register" element={<Register/>} />
        </Routes>
       </>
    </div>
    
  );
}

export default App;
