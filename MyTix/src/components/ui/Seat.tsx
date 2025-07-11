import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import SelectedIcon from '../../assets/images/selected.jpg';
import AvailableIcon from '../../assets/images/available.jpg';
import BookedIcon from '../../assets/images/booked.jpg';
interface seat_id {
  seat_id: number;
  booked: boolean;
  type: 'window' | 'side' | 'path';
}
const Seat: FC<{
  seats: [seat_id[]];
  onSeatSelect: (seat_id: number) => void;
  selectedSeats: number[];
}> = ({seats, onSeatSelect, selectedSeats}) => {
  return (
    <View className="mb-4 flex-row justify-between">
      <View className="w-[30%] items-center bg-white rounded-2xl p-4">
        <Text className="font-bold font-okra text-lg mb-4">Seat Type</Text>
        <View className="items-center mb-4">
          <Image source={SelectedIcon} className="size-12 my-1" />
          <Text className="font-okra font-medium mb-4 text-md">Selected</Text>
        </View>

        <View className="items-center mb-4">
          <Image source={AvailableIcon} className="size-12 my-1" />
          <Text className="font-okra font-medium mb-4 text-md">Available</Text>
        </View>

        <View className="items-center mb-4">
          <Image source={BookedIcon} className="size-12 my-1" />
          <Text className="font-okra font-medium mb-4 text-md">Booked</Text>
        </View>
      </View>
      <View className="w-[65%] bg-white rounded-2xl p-4 ">
        <Image
          source={require('../../assets/images/wheel.png')}
          className="size-10 mb-4 self-end"
        />

        <View className="mt-2 w-full">
          {seats?.map((row, index) => (
            <View
              key={index}
              className="flex-row w-full justify-between items-center">
              <View className="flex-row w-full justify-between items-center">
                {row?.map(s => {
                  if (s.type === 'path') {
                    return <View key={s.seat_id} className="p-5 m-1" />;
                  }

                  return (
                    <TouchableOpacity
                      key={s.seat_id}
                      disabled={s.booked}
                      onPress={() => onSeatSelect(s.seat_id)}>
                      <Image
                        source={
                          selectedSeats?.includes(s?.seat_id)
                            ? SelectedIcon
                            : s?.booked
                            ? BookedIcon
                            : AvailableIcon
                        }
                        className="size-12 my-1"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Seat;
