import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { useFonts } from "expo-font";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import Divider from "../components/Divider";
import RecentOrders from "../components/RecentOrders";
import BookingScreen from "./BookingScreen";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { BlurView } from "expo-blur";

export default function HomeScreen() {

  const [isVerified, setIsVerified] = useState(false);

  const navigation = useNavigation();

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

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View
          style={[
            tw`px-3 shadow-sm flex justify-end h-auto gap-3 mb-3`,
            { paddingTop: Platform.OS === "ios" ? 60 : "auto" },
          ]}
        >
          <View style={[tw`flex flex-row gap-3 items-end justify-between`]}>
            <View style={[tw`flex-1 flex flex-row items-center gap-2`]}>
              <Text style={[tw`text-xl`, { fontFamily: "Mont-Bold" }]}>
                TrebaMi - Biznis
              </Text>
            </View>

            <View
              style={[
                tw`p-3 bg-gray-50 border border-gray-100`,
                { borderRadius: 100 },
              ]}
            >
              <IonIcons name="notifications-outline" size={20} />
            </View>
          </View>
        </View>

        <Divider />

        {/* <View>
          <View style={[ tw`px-3 mb-2` ]}>
            <TouchableOpacity style={[ tw`p-5 rounded-full border-2 border-blue-400 bg-blue-500 text-white flex flex-row items-center gap-3 justify-center`, ]}>
              <Text style={[ tw`text-white`, { fontFamily: 'Mont-SemiBold' } ]}>TrebaMi - Verikacija</Text>
            </TouchableOpacity>
          </View>

        </View> */}

        <View style={[ tw`relative ` ]}>

          <View style={[ tw`px-3` ]}>
            <Text style={[ tw`text-xl`, { fontFamily: 'Mont-Bold' } ]}>Brze Akcije</Text>
            <View style={[ tw`flex flex-row flex-wrap items-center mt-3` ]}>
              <TouchableOpacity onPress={() => navigation.navigate("CreateAdvertisement")} style={[ tw`p-4 rounded-l-full border-2 border-blue-400 w-1/2 bg-blue-500 text-white flex flex-row items-center gap-3`, ]}>
                <IonIcons name="create-outline" size={20} color="white" />
                <Text style={[ tw`text-white`, { fontFamily: 'Mont-SemiBold' } ]}>Kreiraj Oglas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[ tw`p-4 w-1/2 bg-green-500 text-white flex flex-row items-center gap-3 rounded-r-full border-2 border-green-400`, ]}>
                <IonIcons name="rocket-outline" size={20} color="white" />
                <Text style={[ tw`text-white`, { fontFamily: 'Mont-SemiBold' } ]}>Reklamiraj se</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Divider />

          <RecentOrders />

          <Divider />

          <BookingScreen />
        </View>

            {/* <View style={tw`p-10 bg-gray-200 flex items-center justify-center flex-1 mt-4 ${isVerified ? 'hidden' : null}`}>
              <Text style={[ tw`text-black text-lg text-center`, { fontFamily: 'Mont-SemiBold' } ]}>Potrebno je da verifikujete svoj nalog kako bi imali mogucnost rada na platformi</Text>
            </View> */}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
