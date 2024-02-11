import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, Picker, Button, ScrollView } from 'react-native';
import axios from 'axios';

const BookRoomPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const onRoomClick = (roomId) => {
    console.log('room clicked');
    var roomName = document.getElementById(roomId).getAttribute('data-room');
    setSelectedRoom(roomName);
    setModalVisible(true);
  };

  // method to check if room is available or not
  const fetchRoomData = async (room, time) => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/rooms/${room}/times/${time}`);
      console.log(response.data);

      // Return the relevant data, e.g., response.data.booked
      return response.data
    } catch (error) {
      console.error(`Error fetching ${room} data:`, error);
      // Handle error appropriately
      return false; // Return false in case of an error
    }
  };

  const attachRoomClickListeners = () => {
    const rooms = [
      'meeting-room-1',
      'meeting-room-2',
      'conference-room',
      'cafeteria',
      'meeting-room-3',
      'meeting-room-4',
      'open-workspace',
      'meeting-room-5',
      'meeting-room-6',
      'meeting-room-7',
    ];

    rooms.forEach((roomId) => {
      const roomElement = document.getElementById(roomId);
      roomElement.addEventListener('click', () => onRoomClick(roomId));
    });
  };

  useEffect(() => {
    attachRoomClickListeners();
  }, []);

  const handleConfirmBooking = async (room, time) => {
    try {
      // console.log(room);
      // console.log(time);
  
      // handle case if can book for that time or not
      const { booked } = await fetchRoomData(room, time);
      
      // if booked -> true, 
      if (booked) {
        // Room is occupied
        console.log('Room is available for booking at this time');
        // Hide the modal
        setModalVisible(false);
        
        // Update the boolean value to false using the API
        await updateBookingStatus(room, time);
        // Handle accordingly, e.g., show a message to the user
        Alert.alert('Booking Successful', `You have successfully booked ${room} at ${time}`);
      }
      // if booked -> false
      else {
        // Room is available
        console.log('Not available for this time');
        setModalVisible(false);
        // Show an error message to the user
      // Alert('Booking Unsuccessful', `Room ${room} is not available for booking at ${time}`);
      Alert.alert(
        'Booking UnSuccessful',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      }
    } catch (error) {
      console.error('Error handling booking:', error);
      // Handle error appropriately
      Alert.alert('Error', 'An error occurred while processing your booking. Please try again.');
    }
  };
 
  
  // Function to update the boolean value using the API
const updateBookingStatus = async (room, time) => {
  try {
    await axios.put(`http://localhost:3001/auth/rooms/${room}/times/${time}`);
  } catch (error) {
    console.error(`Error updating booking status for ${room} at ${time}:`, error);
    // Handle error appropriately
  }
};
  

  return (
    <ScrollView
      style={{ flex: 1 }}
      horizontal={true}
      contentContainerStyle={{ width: 800, paddingHorizontal: 16 }}
    >
      <View>
        

        {/* SVG floor plan */}
        <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="780" height="580" fill="lightgrey" stroke="black" stroke-width="2"/>


<rect id="meeting-room-1" data-room="Meeting Room 1" x="20" y="20" width="150" height="100" fill="lightblue" stroke="black" stroke-width="1"/>
<text x="30" y="70" font-family="Verdana" font-size="15" fill="black">Meeting Room 1</text>

<rect id="meeting-room-2" data-room="Meeting Room 2" x="20" y="130" width="150" height="100" fill="lightblue" stroke="black" stroke-width="1"/>
<text x="30" y="180" font-family="Verdana" font-size="15" fill="black">Meeting Room 2</text>

<rect id="conference-room" data-room="Conference Room" x="180" y="20" width="250" height="150" fill="lightgreen" stroke="black" stroke-width="1"/>
<text x="190" y="95" font-family="Verdana" font-size="15" fill="black">Conference Room</text>

<rect id="cafeteria" data-room="Cafeteria" x="450" y="20" width="150" height="100" fill="peachpuff" stroke="black" stroke-width="1"/>
<text x="460" y="70" font-family="Verdana" font-size="15" fill="black">Cafeteria</text>

<rect id="meeting-room-3" data-room="Meeting Room 3" x="620" y="20" width="150" height="100" fill="lightcoral" stroke="black" stroke-width="1"/>
<text x="630" y="70" font-family="Verdana" font-size="15" fill="black">Meeting Room 3</text>

<rect id="meeting-room-4" data-room="Meeting Room 4" x="620" y="130" width="150" height="100" fill="lightcoral" stroke="black" stroke-width="1"/>
<text x="630" y="180" font-family="Verdana" font-size="15" fill="black">Meeting Room 4</text>

<rect id="open-workspace" data-room="Open Workspace" x="180" y="200" width="400" height="150" fill="khaki" stroke="black" stroke-width="1"/>
<text x="190" y="275" font-family="Verdana" font-size="15" fill="black">Open Workspace</text>

<rect id="meeting-room-5" data-room="Meeting Room 5" x="20" y="450" width="150" height="100" fill="lightcoral" stroke="black" stroke-width="1"/>
<text x="30" y="490" font-family="Verdana" font-size="15" fill="black">Meeting Room 5</text>

<rect id="meeting-room-6" data-room="Meeting Room 6" x="200" y="450" width="150" height="100" fill="lightcoral" stroke="black" stroke-width="1"/>
<text x="210" y="490" font-family="Verdana" font-size="15" fill="black">Meeting Room 6</text>

<rect id="meeting-room-7" data-room="Meeting Room 7" x="380" y="450" width="150" height="100" fill="lightcoral" stroke="black" stroke-width="1"/>
<text x="390" y="490" font-family="Verdana" font-size="15" fill="black">Meeting Room 7</text>
        </svg>

        {/* Selected Room */}
        {selectedRoom && (
          <View>
            <Text>Selected Room: {selectedRoom}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Modal for Booking */}
        <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  <View style={styles.modalContainer}>
    <Text>Room Name: {selectedRoom}</Text>
    <Text>Select Time:</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedTime}
        onValueChange={(itemValue) => setSelectedTime(itemValue)}
        style = {styles.pickerStyle}
      >
        <Picker.Item label="10:00 AM - 11:00 AM" value="10:00 AM - 11:00 AM" />
                <Picker.Item label="11:00 AM - 12:00 PM" value="11:00 AM - 12:00 PM" />
                <Picker.Item label="12:00 PM - 1:00 PM" value="12:00 PM - 1:00 PM" />
                <Picker.Item label="1:00 PM - 2:00 PM" value="1:00 PM - 2:00 PM" />
                <Picker.Item label="2:00 PM - 3:00 PM" value="2:00 PM - 3:00 PM" />
                <Picker.Item label="3:00 PM - 4:00 PM" value="3:00 PM - 4:00 PM" />
                <Picker.Item label="4:00 PM - 5:00 PM" value="4:00 PM - 5:00 PM" />
            </Picker>
    </View>
    <Button style = {styles.finalConfirmationBtn} title="Confirm Booking" onPress={() => handleConfirmBooking(selectedRoom, selectedTime)} />
  </View>
</Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedRoomContainer: {
    marginTop: 16,
  },
  selectedRoomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  button: {
    marginTop: 8,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },

  pickerContainer: {
    width: '100%', // Ensure the Picker takes the full width
    marginBottom: 10, // Add margin as needed
  },
  
  pickerStyle: {
    height: 50, // Adjust the height as needed
    width: '100%',
    backgroundColor: 'white', // Set background color
    color: 'black', // Set text color
    borderRadius: 10, // Set border radius
    borderWidth: 1, // Set border width
    borderColor: 'gray', // Set border color
    paddingLeft: 10, // Add padding left as needed
    paddingRight: 10, // Add padding right as needed
  },

  finalConfirmationBtn: {
    borderRadius: 20,
  },

  confirmbutton: {
    marginTop: 10,
    borderRadius: 5,
    
  },
  alertContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
export default BookRoomPage;
