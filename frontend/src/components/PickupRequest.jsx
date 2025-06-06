import { Calendar, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getUserLocation } from '../lib/getUserLocation';
import { useCustomerStore } from '../store/useCustomerStore';
import { useAuthStore } from '../store/useAuthStore';
const PickupRequest = () => {
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(''); 
  const [time, setTime] = useState(null);
  const { authUser} = useAuthStore(); 
  const { submitPickupRequest } = useCustomerStore(); 
  const handleLocation = async () => {
    try {
      const address = await getUserLocation(); 
      setAddress(address); 
    } catch (error) {
      console.error("Error fetching user location:", error);
      alert("Could not fetch your location. Please enter it manually. {City, State}");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const data = {
      customerId: authUser._id, // Assuming authUser contains the authenticated user's ID
      pickupDate: date, 
      pickupTime: time, 
      address: address, 
      status: 'pending' // Default status
    }
    submitPickupRequest(data); 
  };

  return (
    <div className="flex ml-70  justify-center items-center h-full w-120">
      <div className="rounded-lg w-auto h-auto p-6 bg-gray-200/10 backdrop-blur-md border border-white/30 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white text-center">
          Request Scrap Pickup
        </h1>
        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Pickup Address */}
          <label className="inline-flex items-center font-bold mt-4 text-white mb-2">
            <MapPin className="mr-2" /> Pickup Address
            
          </label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <div className='flex justify-end'>
            <button
                type="button"
                onClick={handleLocation}
                className=" px-2 py-1 block text-sm font-bold bg-blue-600 text-white rounded  hover:bg-blue-700 transition"
            >
                Use My Location
            </button>
          </div>
          
          {/* Pickup Date */}
          <label className="inline-flex items-center font-bold mt-2 text-white mb-2">
            <Calendar className="mr-2" /> Pickup Date
          </label>
          <div className="relative">
                 
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        customInput={
          <button
            type='button'
            className="w-120 border bg-cyan-900 border-gray-300  text-white font-bold text-md py-2 rounded-md pointer-events-auto"
          >
            {date
              ? date.toLocaleDateString()
              : "Select Date"}
          </button>
        }
        dateFormat="dd/MM/yyyy"
      />
          </div>

           {/* Time input */}
           <label className="inline-flex items-center font-bold mt-4 text-white mb-2">
            <Clock className="mr-2" /> Preferred Time
            
          </label>
          <DatePicker 
            selected={time}
            onChange={setTime} 
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
              customInput={
    <button
      type='button'
      className="w-120 border bg-cyan-900 border-gray-300 text-white font-bold text-md py-2 rounded-md pointer-events-auto"
    >
      {time
        ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : "Select Time"}
    </button>
  }
          />
          <div className='flex justify-center items-center'>
            <button type = 'submit' className='w-40 bg-blue-800 h-10 font-bold text-white rounded-sm transition duration-150 active:scale-95'>Pickup Request</button>
          </div>  

        </form>
      </div>
    </div>
  );
};

export default PickupRequest;