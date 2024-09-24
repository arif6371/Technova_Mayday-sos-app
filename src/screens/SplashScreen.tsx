import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';

export default function SplashScreen() {
  return (
    <>
      <StatusBar backgroundColor="#800000" />
      <View className="flex items-center justify-center h-screen bg-[#2786b6]">
        <View className="absolute top-[10%]">
          <Image
            source={require('../../assets/logoHome.png')}
            className="w-[280px] border-2"
            style={{objectFit: 'contain'}}
          />
        </View>
        <View className="absolute top-[60%]">
          <Text className="text-5xl text-center text-white">MayDay</Text>
          <Text
            style={{fontFamily: 'cursive', fontWeight: 'bold'}}
            className="text-xl text-white">
            Because We are not a Doctors
          </Text>
        </View>
      </View>
    </>
  );
}
