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
            <TouchableOpacity className="p-4 flex-row items-center gap-4">
              <Image source={require('../../assets/bus.png')} />
              <Text className="w-[90%]"></Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Search;
