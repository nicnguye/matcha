import React from "react";
import Navbar from "./Navbar";
import MatchIndex from "../match/MatchIndex";
import Profil from "../layout/Profil";
import ProfilPhoto from "../layout/ProfilPhoto";
import SearchPage from "../layout/SearchPage";
import ChatPage from "../ChatPage/ChatPage";
import ProfilSettings from "../layout/ProfilSettings";
import Footer from "./Footer";
import PrivateRoute from "../privateRoute/privateRoute";
import "react-chat-elements/dist/main.css";
import { Switch } from "react-router-dom";
/*import io from "socket.io-client";

const endpoint = "http://localhost:8001";
const socket = io(endpoint);*/

const Home = () => {
  return (
    <div className="main-container">
      <Navbar />
      <main>
        <Switch>
          <PrivateRoute exact path="/home/page/:page" component={MatchIndex} />
          <PrivateRoute exact path="/home/profil" component={Profil} />
          <PrivateRoute
            exact
            path="/home/profil-photo"
            component={ProfilPhoto}
          />
          <PrivateRoute exact path="/home/searchpage" component={SearchPage} />
          <PrivateRoute
            exact
            path="/home/chat"
            //component={() => <ChatPage socket={socket} />}
            component={ChatPage}
          />
          <PrivateRoute
            exact
            path="/home/settings"
            component={ProfilSettings}
          />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
