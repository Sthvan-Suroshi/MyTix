import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Search from './Search';
import {tabs} from '../../utils/dummyData';
import {useQuery} from '@tanstack/react-query';
import {fetchUserTickets} from '../../service/requests/bus';
import {useFocusEffect} from '@react-navigation/native';
import BookItem from './BookItem';

const Bookings = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: tickets,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['userTickets'],
    queryFn: fetchUserTickets,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filteredBookings =
    selectedTab === 'All'
      ? tickets
      : tickets?.filter((ticket: any) => ticket?.status === selectedTab);

  if (isLoading) {
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="teal" />
      <Text className="text-gray-500 mt-2">Fetching Bookings</Text>
    </View>;
  }

  if (isError) {
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500">Failed to fetch Bookings</Text>
      <TouchableOpacity
        onPress={() => refetch()}
        className="mt-4 px-4 py-2 bg-blue-500 rounded-sm">
        <Text className="text-blue-500 mt-2">Retry</Text>
      </TouchableOpacity>
    </View>;
  }
  return (
    <View className="flex-1 p-2 bg-white">
      <FlatList
        ListHeaderComponent={
          <>
            <Search />
            <Text className="text-2xl font-bold my-4">Past Bookings</Text>

            <View className="flex flex-row justify-around items-center ">
              {tabs?.map(tab => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setSelectedTab(tab)}
                  className={`py-3 px-6 my-2 rounded-lg ${
                    selectedTab === tab ? 'bg-red-500' : 'bg-gray-400 '
                  }`}>
                  <Text
                    className={`font-bold font-okra ${
                      selectedTab === tab ? 'text-white' : 'text-black'
                    }`}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
        data={filteredBookings}
        keyExtractor={item => item._id}
        nestedScrollEnabled
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold mt-6">No Bookings</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => <BookItem item={item} />}
      />
    </View>
  );
};

export default Bookings;
