import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function OnboardScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        //nextLabel={handleDone}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[

          {
            backgroundColor: '#40E0D0',
            image: (
              <View style={styles.lottieContainer}>
                <LottieView source={require('./animations/arrow.json')} autoPlay loop />
                <Text style={styles.titleText}>Welcome to DeskSynergy</Text>
              </View>
            ),
          },
          {
            backgroundColor: '#40E0D0',
            
            image: (
              <View style={styles.lottieContainer}>
                <LottieView source={require('./animations/happy.json')} autoPlay loop />
                <Text style={styles.titleText}>Boost Productivity</Text>
                <Text style={styles.smallText}>Have seamless workforce collaborataion</Text>
              </View>
            ),
          },
          {
            backgroundColor: '#fef37c',
            image: (
              <View style={styles.lottieContainer}>
                <LottieView source={require('./animations/WorkEnvironment.json')} autoPlay loop />
                <Text style={styles.titleText}>Work Seemingly</Text>
                <Text style={styles.smallText}>Handle office functions in one place</Text>
              </View>
            ),
          },
          {
            backgroundColor: "#800080",
            image: (
              <View style={styles.lottieContainer}>
                <LottieView source={require('./animations/rocket.json')} autoPlay loop />
                <Text style={styles.titleText}>Achieve Higher Goals</Text>
                <Text style={styles.smallText}>Manage Better, Perform Better!</Text>
              </View>
            ),
          },
          
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginTop: 20,
    fontSize: 27,
    fontWeight: 'bold',
    color: 'white',
  },
  smallText: {
    marginTop: 10, // Adjust the spacing as needed
    fontSize: 21, // Adjust the font size as needed
    color: 'white',
  },
  title: {
    marginTop: 10,
    fontSize: 21,
    color: 'white',
  }
});