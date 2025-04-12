import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {locations} from '../../utils/dummyData';

interface LocationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (location: string, type: 'from' | 'to') => void;
  type: 'from' | 'to';
  fromLocation?: string;
}

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  visible,
  onClose,
  onSelect,
  type,
  fromLocation,
}) => {
  const [search, setSearch] = useState('');

  const filteredLocations = locations?.filter(location =>
    location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Modal transparent={false} visible={visible} animationType="slide">
      <View className="flex-1 bg-white p-3 mt-4">
        <SafeAreaView />

        <Text className="text-lg mb-4 font-bold text-center">
          Select a {type === 'from' ? 'Departure' : 'Destination'} location
        </Text>

        <TextInput
          className="p-3 border border-gray-400 rounded-md mb-4"
          placeholder="Search City..."
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredLocations}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                if (type === 'to' && item === fromLocation) {
                  return;
                }

                onSelect(item, type);
                onClose();
              }}
              className="p-3 border-b border-gray-300 rounded-lg ">
              <Text
                className={`text-md ${
                  item === fromLocation ? 'text-gray-400' : 'text-black'
                }`}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          onPress={onClose}
          className="p-3 bg-gray-300 rounded-lg mt-4">
          <Text className="text-center text-black font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default LocationPickerModal;
