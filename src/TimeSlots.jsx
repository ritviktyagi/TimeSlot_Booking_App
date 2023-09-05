import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import './Timeslot.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TimeSlots() {
  const { roomId } = useParams(); // Get the roomId from URL parameters
  const navigate = useNavigate();

  const [timeSlots, setTimeSlots] = useState(() => {
    const savedTimeSlots = localStorage.getItem(`timeslotsforroom${roomId}`);
    return savedTimeSlots ? JSON.parse(savedTimeSlots) : [];
  });

  const [bookedSlots, setBookedSlots] = useState(() => {
    const savedBookedSlots = localStorage.getItem(`bookedSlots-for-room${roomId}`);
    return savedBookedSlots ? JSON.parse(savedBookedSlots) : [];
  });

  useEffect(() => {
    if(!localStorage.getItem("current")){
      toast.error("You are not signed in!")
      navigate('/')
    }
  }, [])

  // Load time slots data based on the roomId
  useEffect(() => {
    // Fetch or load time slots data based on roomId
    const simulatedTimeSlots = [
      {
        id: 1,
        room: roomId,
        time: '9:00 AM - 9:30 AM',
        status: 'Available',
        slotAdmin: ''
      },
      {
        id: 2,
        room: roomId,
        time: '9:30 AM - 10:00 AM',
        status: 'Available',
        slotAdmin: ''
      },
      {
        id: 3,
        room: roomId,
        time: '10:00 AM - 10:30 AM',
        status: 'Available',
        slotAdmin: ''
      },
      {
        id: 4,
        room: roomId,
        time: '10:30 AM - 11:00 AM',
        status: 'Available',
        slotAdmin: ''
      },
    ];

    if(timeSlots.length === 0){
      setTimeSlots(simulatedTimeSlots);
    }
  }, [roomId]);

  // Function to handle booking a slot
  const handleBookSlot = (slotId) => {
    // Check if the slot is already booked
    const isBooked = bookedSlots.includes(slotId);
    const currentUser = localStorage.getItem("current");

    if (!isBooked) {
      // If not booked, add it to the bookedSlots array
      
      setBookedSlots([...bookedSlots, slotId]);
      // Update the status of the slot
      const updatedSlots = timeSlots.map((slot) =>
        slot.id === slotId ? { ...slot, status: 'Booked', slotAdmin: currentUser } : slot
      );
      setTimeSlots(updatedSlots);
    } else {
      const vaildAdmin = timeSlots.filter((slot) =>  slot.id === slotId)
      console.log(vaildAdmin, "va")
      if(currentUser === vaildAdmin[0].slotAdmin){
         // If already booked, remove it from the bookedSlots array
        const updatedBookedSlots = bookedSlots.filter((id) => id !== slotId);
        setBookedSlots(updatedBookedSlots);
        // Update the status of the slot
        const updatedSlots = timeSlots.map((slot) =>
          slot.id === slotId ? { ...slot, status: 'Available', slotAdmin: '' } : slot
        );
        setTimeSlots(updatedSlots);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem(`bookedSlots-for-room${roomId}`, JSON.stringify(bookedSlots));
  }, [roomId, bookedSlots]);

  useEffect(() => {
    localStorage.setItem(`timeslotsforroom${roomId}`, JSON.stringify(timeSlots));
  }, [roomId, timeSlots]);

  const handleLogout = () => {
    localStorage.removeItem("current");
    navigate('/')
    console.log('User logged out');
  };

  return (
    <div className='slot-main-container'>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h2>Time Slots for Room {roomId}</h2>
      <div className="time-slot-container">
        {timeSlots.map((slot) => (
          <div 
          className={
            slot.slotAdmin && slot.slotAdmin !== localStorage.getItem("current") ? 
            "time-slot-card disabled-div" : `time-slot-card ${slot.status}`} key={slot.id}>
            <h3>{slot.time}</h3>
            <p>Status: {slot.status}</p>
            {(slot.slotAdmin === '' || slot.slotAdmin === localStorage.getItem("current")) && (
              <button
                className={slot.status === 'Booked' ? "red" : ""}
                onClick={() => handleBookSlot(slot.id)}
              >
                {bookedSlots.includes(slot.id) ? 'Cancel Booking' : 'Book Slot'}
              </button>
            )

            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeSlots;