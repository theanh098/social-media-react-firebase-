import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import PersonalPage from "./pages/personalPage/PersonalPage";
import Login from "./pages/login/Login";
import { useGlobalState } from "./hooks/useGlobalSate";
import SinglePost from "./components/singlePost/SinglePost";
import Setting from "./pages/setting/Setting";
function App() {
  const { uInfo } = useGlobalState();

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/" element={uInfo ? <Home /> : <Login />} />
          <Route
            path="/u/:id"
            element={uInfo ? <PersonalPage baiviet /> : <Login />}
          />
          <Route
            path="/u/:id/saved"
            element={uInfo ? <PersonalPage daluu /> : <Login />}
          />
          <Route path="/ac/edit" element={<Setting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
