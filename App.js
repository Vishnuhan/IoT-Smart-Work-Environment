import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const centralServerIPAddress = "192.168.0.15";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the local IP address of your computer and the port your Express server is running on
        const response = await axios.get(`http://${centralServerIPAddress}:3001/api/data`);
        setData(response.data);
        console.log("nothing")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Data from the server: {data?.message}</Text>
    </View>
  );
};

export default App;
