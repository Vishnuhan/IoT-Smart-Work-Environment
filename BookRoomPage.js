import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const BookRoomPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  // JavaScript function to handle click events
  const onRoomClick = (roomId) => {
    console.log('room clicked');
    var roomName = document.getElementById(roomId).getAttribute('data-room');
    setSelectedRoom(roomName);
    Alert.alert('Room Selected', `You selected: ${roomName}`);
    // Add any specific functionality you need here
  };

  // Function to attach click event listeners to meeting rooms
  const attachRoomClickListeners = () => {
    // Get all the meeting room elements by ID
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

    // Add click event listener to each meeting room element
    rooms.forEach((roomId) => {
      const roomElement = document.getElementById(roomId);
      roomElement.addEventListener('click', () => onRoomClick(roomId));
    });
  };

  // Call the function to attach click event listeners after the page has loaded
  React.useEffect(() => {
    attachRoomClickListeners();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Office Floor Map</Text>

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
        <View style={styles.selectedRoomContainer}>
          <Text style={styles.selectedRoomText}>Selected Room: {selectedRoom}</Text>
        </View>
      )}
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
  selectedRoomContainer: {
    marginTop: 16,
  },
  selectedRoomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default BookRoomPage;