import React from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Admin/Login";
import Signup from "./Admin/Signup";
import CreateUserName from "./Admin/CreateUserName";
import Map_Listings from "./Map_Page/Map_Listings";
import UpdateProfile from "./Admin/UpdateProfile";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./Admin/ForgotPassword";
import Home from "./Home";
import Host_Intro from "./Host/Host_Intro";
import Host_Location from "./Host/Host_Location";
import Host_Description from "./Host/Host_Description";
import Host_Instruments from "./Host/Host_Instruments";
import Host_Photos from "./Host/Host_Photos";
import Host_Finish from "./Host/Host_Finish";
import Host_Summary from "./Host/Host_Summary";
import Host_Complete from "./Host/Host_Complete";
import Listing from "./Map_Page/Listing";
import My_Reservations from "./Menu/My_Reservations";
import My_Guests from "./Menu/My_Guests";
import Nav from "./Nav";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Nav />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/create-username" component={CreateUserName} />
            <Route path="/signup" component={Signup} />
            <Route path="/update-profile" component={UpdateProfile} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/host_intro" component={Host_Intro} />
            <PrivateRoute path="/host_location" component={Host_Location} />
            <PrivateRoute
              path="/host_description"
              component={Host_Description}
            />
            <PrivateRoute
              path="/host_instruments"
              component={Host_Instruments}
            />

            <PrivateRoute path="/host_photos" component={Host_Photos} />
            <PrivateRoute path="/host_finish" component={Host_Finish} />
            <PrivateRoute path="/host_summary" component={Host_Summary} />
            <PrivateRoute path="/host_complete" component={Host_Complete} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/my-reservations" component={My_Reservations} />
            <PrivateRoute path="/my-guests" component={My_Guests} />
            <PrivateRoute path="/listing" component={Listing} />
            <PrivateRoute exact path="/map_listings" component={Map_Listings} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
