import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {UserCircleIcon} from 'react-native-heroicons/solid';
import {logout} from '../service/requests/auth';
import Bookings from '../components/home/Bookings';

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-white ">
      <SafeAreaView />
      <View className="flex-row justify-between items-center px-4 py-2 mt-10">
        <Text className="font-okra font-semibold text-3xl">Bus tickets</Text>
        <UserCircleIcon size={40} color="red" onPress={logout} />
      </View>

      <Bookings />
    </View>
  );
};

export default HomeScreen;
