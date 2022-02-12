import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import ProfileData from './components/Profile/ProfileData';
import Wods from './components/Wods/Wods';
import ProfileDataMod from './components/Profile/ProfileDataMod'
import ProfilePhoto from './components/Profile/ProfilePhoto';
import Exercices from './components/Excercices/Exercices';
import ExerciceAdd from './components/Excercices/ExerciceAdd';
import Marks from './components/Excercices/Marks';
import MarksAdd from './components/Excercices/MarksAdd';
import WodCreate from './components/Wods/WodCreate';
import WodDelete from './components/Wods/WodDelete';
import ClassesAdd from './components/Classes/ClassesAdd';
import ClassesList from './components/Classes/ClassesList';
import TimeTable from './components/Classes/TimeTable';
import TimeTableAdd from './components/Classes/TimeTableAdd';
import UsersList from './components/Register/UserList';
import DeleteUser from './components/Register/DeleteUser';
import ClassList from './components/Bookings/ClassList';
import Booking from './components/Bookings/Booking';
import Footer from './components/Footer/Footer';
import Logout from './components/Logout/Logout';




function App() {


  return (
    <div className="App">
      
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/home" element={<Home />} />
          
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileData" element={<ProfileData />} >
            <Route path="profileModify" element={<ProfileDataMod />} />
        </Route>
        <Route path="/profilePhoto" element={<ProfilePhoto />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/usersList" element={<UsersList />} />
        <Route path="deleteUsers/:userID" element={<DeleteUser />} /> 


        <Route path="/wods" element={<Wods />} />
        <Route path="/createWod" element={<WodCreate />} />
        <Route path="/deleteWod" element={<WodDelete />} />

        <Route path="/exercices" element={< Exercices />} >
            <Route path="addExercice" element={<ExerciceAdd />} />
        </Route>
        <Route path="/marks/:exerciceID" element={<Marks />}>
            <Route path="marksAdd/:exerciceAddMarkID" element={<MarksAdd />} />
        </Route>

        <Route path="/classesAdd" element={<ClassesAdd />} />
        <Route path="/classeslist" element={<ClassesList />} />
        <Route path="/timetables/:classesID" element={<TimeTable />} >
            <Route path="timetablesAdd/:classesID2" element={<TimeTableAdd />} />
          </Route>

          <Route path="/listclasses" element={<ClassList />} />
          <Route path="/booking/:classID" element={<Booking />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
