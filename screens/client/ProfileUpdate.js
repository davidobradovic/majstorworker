import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Divider from "../../components/Divider";
import { useAuth } from "../../context/AuthContext";

const ProfileUpdate = () => {
  const { profile } = useAuth();

  const [loaded, error] = useFonts({
    "Mont-Black": require("../../assets/fonts/Montserrat-Black.ttf"),
    "Mont-BlackItalic": require("../../assets/fonts/Montserrat-BlackItalic.ttf"),
    "Mont-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Mont-BoldItalic": require("../../assets/fonts/Montserrat-BoldItalic.ttf"),
    "Mont-ExtraBold": require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
    "Mont-ExtraBoldItalic": require("../../assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    "Mont-ExtraLight": require("../../assets/fonts/Montserrat-ExtraLight.ttf"),
    "Mont-ExtraLightItalic": require("../../assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    "Mont-Italic": require("../../assets/fonts/Montserrat-Italic.ttf"),
    "Mont-Light": require("../../assets/fonts/Montserrat-Light.ttf"),
    "Mont-LightItalic": require("../../assets/fonts/Montserrat-LightItalic.ttf"),
    "Mont-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "Mont-MediumItalic": require("../../assets/fonts/Montserrat-MediumItalic.ttf"),
    "Mont-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "Mont-SemiBold": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    "Mont-SemiBoldItalic": require("../../assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    "Mont-Thin": require("../../assets/fonts/Montserrat-Thin.ttf"),
    "Mont-ThinItalic": require("../../assets/fonts/Montserrat-ThinItalic.ttf"),
  });

  const navigation = useNavigation();

  if (!loaded) return null;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        <Text
          style={[tw`text-3xl text-center mb-4`, { fontFamily: "Mont-Bold" }]}
        >
          Uredi Profil
        </Text>

        <View>
          <View style={[tw`flex items-center my-6`]}>
            {profile.images && (
              <Image
                source={{
                  uri: `https://backend.davidtesla.online/uploads/${profile.images[0].filename}`,
                }}
                style={{ width: 160, height: 160, borderRadius: 100 }} // moraš postaviti stilove (širinu i visinu)
              />
            )}
          </View>
          <View style={[ tw`mb-3` ]}>
            <Text style={[ tw`text-xs uppercase mb-1`, { fontFamily: 'Mont-Bold' } ]}>Email</Text>
            <TextInput placeholder="Unesite email adresu" value={profile.email} style={[ tw`p-4 bg-gray-100 rounded-xl`, { fontFamily: 'Mont-SemiBold' } ]} />
          </View>
          <View>
            <Text style={[ tw`text-xs uppercase mb-1`, { fontFamily: 'Mont-Bold' } ]}>Ime i Prezime</Text>
            <TextInput placeholder="Unesite ime i prezime" value={profile.fullName} style={[ tw`p-4 bg-gray-100 rounded-xl`, { fontFamily: 'Mont-SemiBold' } ]} />
          </View>

          <TouchableOpacity style={[ tw`p-4 rounded-xl bg-blue-500 mt-3 flex items-center justify-center` ]}>
            <Text style={[ tw`text-white`, { fontFamily: 'Mont-Bold' } ]}>Potvrdi izmene</Text>
          </TouchableOpacity>

          <Divider />

          <View style={[ tw`mb-3` ]}>
            <Text style={[ tw`text-xs uppercase mb-1`, { fontFamily: 'Mont-Bold' } ]}>Stara Lozinka</Text>
            <TextInput secureTextEntry={true} placeholder="Unesite lozinku"  style={[ tw`p-4 bg-gray-100 rounded-xl`, { fontFamily: 'Mont-SemiBold' } ]} />
          </View>
          <View style={[ tw`mb-3` ]}>
            <Text style={[ tw`text-xs uppercase mb-1`, { fontFamily: 'Mont-Bold' } ]}>Nova Lozinka</Text>
            <TextInput secureTextEntry={true} placeholder="Unesite lozinku" style={[ tw`p-4 bg-gray-100 rounded-xl`, { fontFamily: 'Mont-SemiBold' } ]} />
          </View>
          <View>
            <Text style={[ tw`text-xs uppercase mb-1`, { fontFamily: 'Mont-Bold' } ]}>Nova Lozinka</Text>
            <TextInput secureTextEntry={true} placeholder="Potvrdite lozinku" style={[ tw`p-4 bg-gray-100 rounded-xl`, { fontFamily: 'Mont-SemiBold' } ]} />
          </View>
          <TouchableOpacity style={[ tw`p-4 rounded-xl bg-blue-500 mt-3 flex items-center justify-center` ]}>
            <Text style={[ tw`text-white`, { fontFamily: 'Mont-Bold' } ]}>Promeni lozinku</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileUpdate;
