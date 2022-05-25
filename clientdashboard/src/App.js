import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css"

function App() {
  return (
    <div>
      <Router>
      <Topbar/>
      <div className="container">
        <Sidebar/>
        <div className="others">other pages!</div>
      </div>

      </Router>
    </div>
  );
}

export default App;
