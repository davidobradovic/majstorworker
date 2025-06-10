import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import tw from 'twrnc';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native';

const CreateAdvertisement = () => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [images, setImages] = useState([]);

  // Handle image picking
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Combine new images with existing ones
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  // Remove an image
  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  // Load custom fonts
  const [loaded, error] = useFonts({
    "Mont-Black": require("../assets/fonts/Montserrat-Black.ttf"),
    "Mont-BlackItalic": require("../assets/fonts/Montserrat-BlackItalic.ttf"),
    "Mont-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Mont-BoldItalic": require("../assets/fonts/Montserrat-BoldItalic.ttf"),
    "Mont-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "Mont-ExtraBoldItalic": require("../assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    "Mont-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    "Mont-ExtraLightItalic": require("../assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    "Mont-Italic": require("../assets/fonts/Montserrat-Italic.ttf"),
    "Mont-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Mont-LightItalic": require("../assets/fonts/Montserrat-LightItalic.ttf"),
    "Mont-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Mont-MediumItalic": require("../assets/fonts/Montserrat-MediumItalic.ttf"),
    "Mont-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Mont-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Mont-SemiBoldItalic": require("../assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    "Mont-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
    "Mont-ThinItalic": require("../assets/fonts/Montserrat-ThinItalic.ttf"),
  });

  // Return null while fonts are loading
  if (!loaded && !error) {
    return null;
  }

  // Font style shorthand
  const fontStyle = (weight) => ({ fontFamily: `Mont-${weight}` });

  return (
    <KeyboardAwareScrollView 
      style={tw`flex-1 bg-white`}
      contentContainerStyle={tw`pt-4`}
    >
      {/* Header */}
      <View style={tw`pt-12 pb-4 px-5 bg-white border-b border-gray-200`}>
        <Text style={[tw`text-2xl text-gray-800`, fontStyle('SemiBold')]}>
          Napravi Oglas
        </Text>
        <Text style={[tw`text-sm text-gray-500 mt-1`, fontStyle('Regular')]}>
          Popunite sve podatke za kreiranje oglasa
        </Text>
      </View>

      <View style={tw`px-5 pt-6`}>
        {/* Title Input */}
        <View style={tw`mb-6`}>
          <Text style={[tw`text-sm text-gray-700 mb-2`, fontStyle('Medium')]}>
            Naslov oglasa*
          </Text>
          <View style={tw`flex-row items-center border border-gray-300 rounded-lg px-3 py-2`}>
            <Ionicons name="text-outline" size={20} color="#6B7280" style={tw`mr-2`} />
            <TextInput
              style={[tw`flex-1 text-base text-gray-800`, fontStyle('Regular')]}
              placeholder="Unesite naslov..."
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        {/* Description Input */}
        <View style={tw`mb-6`}>
          <Text style={[tw`text-sm text-gray-700 mb-2`, fontStyle('Medium')]}>
            Opis
          </Text>
          <View style={tw`border border-gray-300 rounded-lg px-3 pb-2`}>
            <TextInput
              style={[tw`text-base text-gray-800`, fontStyle('Regular')]}
              placeholder="Unesite detaljan opis..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* City Input */}
        <View style={tw`mb-6`}>
          <Text style={[tw`text-sm text-gray-700 mb-2`, fontStyle('Medium')]}>
            Grad
          </Text>
          <View style={tw`flex-row items-center border border-gray-300 rounded-lg px-3 py-2`}>
            <FontAwesome5 name="map-marker-alt" size={20} color="#6B7280" style={tw`mr-2`} />
            <TextInput
              style={[tw`flex-1 text-base text-gray-800`, fontStyle('Regular')]}
              placeholder="Unesite grad..."
              value={city}
              onChangeText={setCity}
            />
          </View>
        </View>

        {/* Availability Switch */}
        <View style={tw`mb-6 flex-row items-center justify-between`}>
          <Text style={[tw`text-base text-gray-700`, fontStyle('Medium')]}>
            Dostupno odmah
          </Text>
          <Switch
            trackColor={{ false: "#ddd", true: "#2b7fff" }}
            thumbColor={isAvailable ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#D1D5DB"
            onValueChange={() => setIsAvailable(!isAvailable)}
            value={isAvailable}
          />
        </View>

        {/* Image Upload */}
        <View style={tw`mb-6`}>
          <Text style={[tw`text-sm text-gray-700 mb-2`, fontStyle('Medium')]}>
            Fotografije*
          </Text>
          <Text style={[tw`text-xs text-gray-500 mb-3`, fontStyle('Regular')]}>
            Dodajte do 10 fotografija kako biste bolje predstavili vaš oglas
          </Text>

          {/* Image Grid */}
          <View style={tw`flex-row flex-wrap -mx-1`}>
            {/* Add Image Button */}
            <TouchableOpacity 
              style={tw`w-full p-1`}
              onPress={pickImages}
            >
              <View style={tw`aspect-video border-2 border-dashed border-gray-300 rounded-lg items-center justify-center bg-gray-50`}>
                <MaterialIcons name="add-photo-alternate" size={32} color="#6B7280" />
                <Text style={[tw`text-xs text-gray-500 mt-2`, fontStyle('Medium')]}>
                  Dodaj fotografije
                </Text>
              </View>
            </TouchableOpacity>

            {/* Selected Images */}
            {images.map((image, index) => (
              <View key={index} style={tw`w-full p-1`}>
                <View style={tw`aspect-video rounded-lg overflow-hidden relative`}>
                  <Image 
                    source={{ uri: image }} 
                    style={tw`w-full h-full`} 
                    resizeMode="cover"
                  />
                  <TouchableOpacity 
                    style={tw`absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1`}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close" size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={tw`bg-blue-500 rounded-lg py-4 items-center shadow-sm`}
        >
          <Text style={[tw`text-base text-white`, fontStyle('SemiBold')]}>
            Kreiraj Oglas
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateAdvertisement;

const styles = StyleSheet.create({});