import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import reduxStore from "./redux/GlobalStore";

function App() {
    return (
        <Provider store={reduxStore}>
            <div className="App">
                <Home />
                <ToastContainer />
            </div>
        </Provider>
    );
}

export default App;
