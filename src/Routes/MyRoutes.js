import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { createBrowserHistory } from "history";
import SplashScreen from "../Pages/SplashScreen";
import HomePage from "../Pages/HomePage";
import NewTask from "../Pages/NewTask";
import EditTask from "../Pages/EditTask";
import LoginPage from "../Pages/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage";
import ForgotPasswordPage from "../Pages/ForgotPassword";
import ChangePassword from "../Pages/ChangePassword";
import ApprovalPage from "../Pages/ApprovalPage";
import UnauthorizedPage from "../Pages/Unauthorized";
import DailyTaskUpdate from "../Pages/DailyTaskUpdate";
import DailyUpdateShare from "../Pages/DailyUpdateShare";
import EditTaskPage from "../Pages/EditTaskPage";
import LoginRegister from "../Pages/LoginRegister";

const customHistory = createBrowserHistory();

// Routes For Navigation

const MyRoutes = (props) => {

  return(

    <BrowserRouter basename="/" history={customHistory}>
      <div>
          <Routes>
              <Route exact path="/" element={<SplashScreen />}></Route>
              <Route exact path="/login" element={<LoginPage />}></Route>
              <Route exact path="/register" element={<RegistrationPage />}></Route>
              <Route exact path="/loginregister" element={<LoginRegister />}></Route>
              <Route exact path="/forgotpassword" element={<ForgotPasswordPage />}></Route>
              <Route exact path="/changepassword" element={<ChangePassword />}></Route>
              <Route exact path="/homepage" element={<HomePage />}></Route>
              <Route exact path="/newtask" element={<NewTask />}></Route>
              <Route exact path="/edittask/:taskID" element={<EditTaskPage />}></Route>
              <Route exact path="/approval" element={<ApprovalPage />}></Route>
              <Route exact path="/unauthorized" element={<UnauthorizedPage />}></Route>
              <Route exact path="/dailytask" element={<DailyTaskUpdate />}></Route>
              <Route exact path="/dailyupdate/:updateType" element={<DailyUpdateShare />}></Route>
          </Routes>
      </div>
    </BrowserRouter>

  );

}

export default MyRoutes;