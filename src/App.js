// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import RoomList from './RoomList';
import TimeSlots from './TimeSlots';
import Login from './Login';
import Signup from './Signup';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/roomlist' element={<RoomList/>} />
      <Route path='/time-slots/:roomId' element={<TimeSlots/>} />
    </Routes>
  );
}

export default App;
