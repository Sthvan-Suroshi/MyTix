import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {fetchBuses} from '../service/requests/bus';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {goBack, navigate} from '../utils/NavigationUtils';

const BusListScreen = () => {
  const route = useRoute();
  const params = route.params as any;
  const {from, to, date} = params?.item || {};

  const parsedDate = date ? new Date(date) : null;

  const dateForQuery = date || '';

  const {
    data: buses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['buses', from, to, dateForQuery],
    queryFn: () => fetchBuses(from, to, dateForQuery),
    enabled: !!from && !!to && !!dateForQuery,
  });

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      className="bg-white mb-4 p-4 rounded-lg shadow-md"
      onPress={() => navigate('SeatSelectionScreen', {busId: item?.busId})}>
      <Image
        source={require('../assets/images/sidebus.png')}
        className="h-6 w-8"
      />
      <Text className="text-lg font-bold text-gray-900">{item?.company}</Text>
      <Text className="text-sm text-gray-500">{item?.busType}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white mt-12">
      <View className="bg-white p-4 flex-row items-center border-b-[1px] border-teal-800">
        <TouchableOpacity onPress={goBack}>
          <ArrowLeftIcon size={24} color={'#000'} />
        </TouchableOpacity>

        <View className="ml-4">
          <Text className="text-lg font-bold">
            {from} - {to}
          </Text>

          <Text className="text-sm text-gray-500">
            {parsedDate ? parsedDate.toDateString() : 'No date selected'}
          </Text>
        </View>
      </View>

      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'teal'} />
          <Text className="">Loading Buses</Text>
        </View>
      )}

      {error && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">Failed to load buses</Text>
        </View>
      )}

      {!isLoading && !error && buses && buses.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No buses found</Text>
        </View>
      )}

      <FlatList
        data={buses}
        keyExtractor={item => item.busId}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16}}
      />
    </View>
  );
};

export default BusListScreen;
