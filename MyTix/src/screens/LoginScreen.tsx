import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useMutation} from '@tanstack/react-query';
import {loginWithGoogle} from '../service/requests/auth';
import {resetAndNavigate} from '../utils/NavigationUtils';

GoogleSignin.configure({
  webClientId:
    '494667131355-6c1ksle34qe5ppclkckiiq7nhv4cu2in.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const [phone, setPhone] = useState('');

  const loginMutation = useMutation({
    mutationFn: loginWithGoogle,

    onSuccess: data => {
      console.log('res fron mutation ', data);
      resetAndNavigate('HomeScreen');
    },

    onError: error => {
      console.error('Error while logging in ', error);
    },
  });

  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log('res from google ', response);

      loginMutation.mutate(response.data?.idToken as string);
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  return (
    <View>
      <Image
        source={require('../assets/images/cover.jpeg')}
        className="w-full h-64 bg-cover"
      />

      <View className="p-4">
        <Text className="text-xl font-okra font-black text-center ">
          Create Account or Signin
        </Text>

        <View className="my-4 mt-6 border border-1 border-black px-2 flex-row items-center">
          <Text className="font-okra font-bold text-base w-[10%]">+91</Text>

          <TextInput
            value={phone}
            placeholder="Enter your phone number"
            onChangeText={text => setPhone(text)}
            className="font-okra font-bold text-base  w-[90%]"
            keyboardType="number-pad"
          />
        </View>

        <TouchableOpacity
          className="bg-tertiary py-2 rounded-md"
          onPress={() => console.log('Pressed')}>
          <Text className="font-okra text-white text-lg text-center font-bold">
            LET&apos;S GO
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex items-center justify-center my-4">
        <Text className="font-okra font-bold text-base text-gray-500">
          ------OR------
        </Text>
        <TouchableOpacity
          onPress={handleGoogleSignin}
          className="flex-row gap-2 items-center justify-center border border-1 border-black p-2 bg-blue-100 rounded-md">
          <Image
            source={require('../assets/images/google.png')}
            className="size-6"
          />
          <Text className="font-okra text-black text-lg text-center font-bold">
            SIGN IN WITH GOOGLE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
