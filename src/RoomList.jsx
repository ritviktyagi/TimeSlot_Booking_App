import React, { useEffect } from 'react';
import './RoomList.css'
import roomsData from './rooms.json';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RoomList() {
  const rooms = roomsData; // Assign the imported JSON data to a variable
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("current")){
      toast.error("You are not signed in!")
      navigate('/')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("current");
    navigate('/')
    console.log('User logged out');
  };

  return (
    <div className='home-container'>
      <h2>Available Rooms</h2>
      <div className="room-card-container">
        <button className="logout-button1" onClick={handleLogout}>
          Logout
        </button>
        {rooms.map((room) => (
          <div className="room-card" key={room.id} onClick={() => navigate(`/time-slots/${room.id}`)}>
            <h3>{room.name}</h3>
            <p>Status: {
              localStorage.getItem(`bookedSlots-for-room${room.id}`) && 
              JSON.parse(localStorage.getItem(`bookedSlots-for-room${room.id}`)).length > 0 ? 
              JSON.parse(localStorage.getItem(`bookedSlots-for-room${room.id}`)).length + ' Slot(s) Reserved' : 
              room.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;