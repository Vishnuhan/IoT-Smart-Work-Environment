// BookRoomPage.js
import React, { useState } from 'react';
import { View, Text, Picker, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AVAILABLE_ROOMS = ['Room 101', 'Room 102', 'Room 103'];
const TIME_SLOTS = ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM'];

const BookRoomPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(AVAILABLE_ROOMS[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0]);

  const handleConfirmBooking = () => {
    // Perform booking logic here
    console.log('Before Alert');
    Alert.alert('Booking Confirmed', `Room: ${selectedRoom}\nTime Slot: ${selectedTimeSlot}`);
    console.log('After Alert');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book Room Page</Text>

      {/* Room selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Room:</Text>
        <Picker
          selectedValue={selectedRoom}
          onValueChange={(itemValue) => setSelectedRoom(itemValue)}
          style={styles.picker}
        >
          {AVAILABLE_ROOMS.map((room) => (
            <Picker.Item key={room} label={room} value={room} />
          ))}
        </Picker>
      </View>

      {/* Time slot selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Time Slot:</Text>
        <Picker
          selectedValue={selectedTimeSlot}
          onValueChange={(itemValue) => setSelectedTimeSlot(itemValue)}
          style={styles.picker}
        >
          {TIME_SLOTS.map((timeSlot) => (
            <Picker.Item key={timeSlot} label={timeSlot} value={timeSlot} />
          ))}
        </Picker>
      </View>

      {/* Confirm booking button */}
      <TouchableOpacity style={styles.button} onPress={handleConfirmBooking}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BookRoomPage;
