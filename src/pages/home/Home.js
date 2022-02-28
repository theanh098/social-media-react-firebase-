import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../components/posts/Posts";
import "./home.scss";
function Home() {
  return (
    <>
      <Topbar />
      <div className="body">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}

export default Home;
