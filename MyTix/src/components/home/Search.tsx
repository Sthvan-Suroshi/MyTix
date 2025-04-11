import {
  View,
  Text,
  Alert,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {navigate} from '../../utils/NavigationUtils';
import LinearGradient from 'react-native-linear-gradient';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/solid';
import DatePickerModal from '../ui/DatePickerModal';

const Search = () => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [locationType, setLocationType] = useState<'from' | 'to'>('from');
  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleLocationSet = (location: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFrom(location);
      if (location === 'to') {
        setTo(null);
      }
    } else {
      setTo(location);
    }
  };

  const handleSearchBuses = () => {
    if (!from || !to) {
      Alert.alert(
        'Missing Information',
        'Please fill in all the required fields.',
      );
      return;
    }

    if (from === to) {
      Alert.alert(
        'Invalid Selection',
        "Departure and Destination can't be the same.",
      );
      return;
    }
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (date < today) {
      Alert.alert('Invalid Date', 'Please select a future date.');
      return;
    }

    navigate('BusListScreen', {item: {from, to, date}});
  };

  return (
    <View className="rounded-b-3xl overflow-hidden">
      <LinearGradient
        colors={['#78B0E6', '#fff']}
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}>
        <View className="p-4">
          <View className="my-4 border border-1 z-20 bg-white rounded-md border-gray-600">
            <TouchableOpacity
              className="p-4 flex-row items-center gap-4"
              onPress={() => {
                setLocationType('from');
                setShowLocationPicker(true);
              }}>
              <Image
                source={require('../../assets/images/bus.png')}
                className="h-6 w-6"
              />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {from || 'From'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="p-4 flex-row items-center gap-4 border-t-[1px] border-gray-400"
              onPress={() => {
                setLocationType('to');
                setShowLocationPicker(true);
              }}>
              <Image
                source={require('../../assets/images/bus.png')}
                className="h-6 w-6"
              />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {to || 'To'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center p-2 justify-between">
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="p-2 mr-2 rounded-lg bg-secondary"
                  onPress={() => setDate(new Date())}>
                  <Text className="font-bold font-okra text-sm">Today</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="p-2 mr-2 rounded-lg bg-secondary"
                  onPress={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setDate(tomorrow);
                  }}>
                  <Text className="font-bold font-okra text-sm">Tomorrow</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setShowDatePicker(true)}>
                <View className="mr-3">
                  <Text className="text-sm font-okra font-normal text-gray-500">
                    Date Of Journey
                  </Text>

                  <Text className="text-md font-bold font-okra text-gray-900">
                    {date?.toDateString()}
                  </Text>
                </View>

                <CalendarDaysIcon size={25} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSearchBuses}
            className="bg-tertiary p-3 my-2 rounded-xl flex-row items-center justify-center gap-2">
            <MagnifyingGlassIcon color={'#fff'} size={22} />
            <Text className="font-okra font-bold text-lg text-white">
              Search Buses
            </Text>
          </TouchableOpacity>

          <Image
            source={require('../../assets/images/sidebus.jpg')}
            className="h-40 w-full my-4 rounded-lg"
          />
        </View>
      </LinearGradient>

      {showDatePicker && (
        <DatePickerModal
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onConfirm={setDate}
          selectedDate={date}
        />
      )}
    </View>
  );
};

export default Search;
