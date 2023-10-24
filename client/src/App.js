import "./style/App2.css";
// import "./style/App.css";
import {Routes, Route} from "react-router-dom";

import Home from "./page/Home";
import Blog from "./page/Blog";
import Add from "./page/Add";
import Edit from "./page/Edit";
import Delete from "./page/Delete";

//Login
import Login_Stu from "./page/Login/Login_Stu";
import Login_Emp from "./page/Login/Login_Emp";
import HomeLogin from "./page/Login/HomeLogin";
import Select from "./page/Login/Select";
import LoginNew from "./page/Login/Login_New";
import Signup from "./page/Login/Signup";

//Student
import Homepage from "./page/Homepage/Homepage";
import Report from "./page/Homepage/Report";
import Checkout from "./page/Homepage/Checkout";
import Paybills from "./page/Homepage/Paybills";
import Paybill_once from "./page/Homepage/Paybill_once";

//Dorm_Manager
import Homepage_Dorm from "./page/DormManager/Homepage_Dorm";
import Rooms from "./page/DormManager/Rooms";
import Room_Info from "./page/DormManager/Room_info";
import Report_Dorm from "./page/DormManager/Report";
import Checkout_Dorm from "./page/DormManager/Checkout";
import Add_Bill_Dorm from "./page/DormManager/Addbill";

//Admin
import Homepage_Admin from "./page/Admin/Homepage";
import CheckInfo_Admin from "./page/Admin/CheckInfo";
import Add_News_Admin from "./page/Admin/Add_News";

//Security
import Homepage_Secur from "./page/Security/Homepage";
import Check_late_Secur from "./page/Security/Check_late";

function App() {

  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomeLogin />}/>
        <Route path="/select" element={<Select />}/>
        <Route path="/login_stu" element={<Login_Stu />}/>
        <Route path="/login_emp" element={<Login_Emp />}/>
        <Route path="/loginnew" element={<LoginNew />}/>
        <Route path="/apply/:id" element={<Signup />}/>

        {/* Student */}
        <Route path="/homepage/:id" element={<Homepage />}/>
        <Route path="/paybills/:id" element={<Paybills />}/>
        <Route path="/paybills/paybill/:id" element={<Paybill_once />}/>
        <Route path="/report/:id" element={<Report />}/>
        <Route path="/checkout/:id" element={<Checkout />}/>

        {/* Dorm */}
        <Route path="/homepage_dorm/:id" element={<Homepage_Dorm />}/>
        <Route path="/rooms_dorm/:id" element={<Rooms />}/>
        <Route path="/rooms_dorm/:id/room_info/:roomid" element={<Room_Info />}/>
        <Route path="/rooms_dorm/:id/room_info/:roomid/add_bill" element={<Add_Bill_Dorm />}/>
        <Route path="/report_dorm/:id" element={<Report_Dorm />}/>
        <Route path="/checkout_dorm/:id" element={<Checkout_Dorm />}/>

        {/* Admin */}
        <Route path="/homepage_admin/:id" element={<Homepage_Admin />}/>
        <Route path="/checkinfo_admin/:id" element={<CheckInfo_Admin />}/>
        <Route path="/add_news_admin/:id" element={<Add_News_Admin />}/>
        
        {/* Security */}
        <Route path="/homepage_secur/:id" element={<Homepage_Secur />}/>
        <Route path="/check_late_secur/:id" element={<Check_late_Secur />}/>

        {/* test */}
        <Route path="/H" element={<Home />}/>
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/Blog/:id" element={<Blog />}/>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
