import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

export default function ProfileScreen() {
  const [selectedService, setSelectedService] = useState(null);

  const [loaded, error] = useFonts({
    "Mont-Black": require("../assets/fonts/Montserrat-Black.ttf"),
    "Mont-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Mont-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Mont-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  const services = [
    {
      title: "Vodoinstalater - Bojleri",
      description: "Usluga ciscenja bojlera. Bilo da je ugradbeni ili da je samo okacen na zid.",
    },
    {
      title: "Vodoinstalater - Bojleri",
      description: "Usluga ciscenja bojlera. Bilo da je ugradbeni ili da je samo okacen na zid.",
    },
    {
      title: "Vodoinstalater - Bojleri",
      description: "Usluga ciscenja bojlera. Bilo da je ugradbeni ili da je samo okacen na zid.",
    },
  ];

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={[tw`flex-1 bg-gray-50`]}>
      <SafeAreaView style={[tw`flex-1`]}>
        <ScrollView style={[tw`flex-1`]} showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={[tw`items-center py-8 px-6 bg-white shadow-sm`]}>
            <View style={[tw`mb-5 flex-1 flex flex-row items-center justify-end w-full`]}>
              <TouchableOpacity>
                <IonIcons name="settings-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={[tw`relative`]}>
              <Image
                source={{
                  uri: `https://static.vecteezy.com/system/resources/previews/048/216/761/non_2x/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png`,
                }}
                style={[tw`w-32 h-32 rounded-full bg-gray-100`]}
              />
              <TouchableOpacity 
                style={[tw`absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full`]}
              >
                <Feather name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={[tw`mt-4 text-lg text-gray-800`, { fontFamily: "Mont-SemiBold" }]}>
              david@trebami.majstor.rs
            </Text>
          </View>

          {/* Services Section */}
          <View style={[tw`p-6`]}>
            <View style={[tw`flex-row items-center justify-between mb-6`]}>
              <Text style={[tw`text-xl text-gray-800`, { fontFamily: "Mont-Bold" }]}>
                Usluge
              </Text>
              <TouchableOpacity
                style={[
                  tw`flex-row items-center px-4 py-2.5 bg-blue-500 rounded-full`,
                ]}
              >
                <AntDesign name="plus" size={18} color="white" />
                <Text style={[tw`text-white ml-2`, { fontFamily: "Mont-SemiBold" }]}>
                  Nova Usluga
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[tw`gap-4`]}>
              {services.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedService(selectedService === index ? null : index)}
                  activeOpacity={0.7}
                >
                  <View style={[tw`bg-white p-4 rounded-2xl shadow-sm`]}>
                    <Text style={[tw`text-lg text-gray-800 mb-1`, { fontFamily: "Mont-Bold" }]}>
                      {service.title}
                    </Text>
                    <Text style={[tw`text-gray-600`, { fontFamily: "Mont-Regular" }]}>
                      {service.description}
                    </Text>
                  </View>
                  
                  {selectedService === index && (
                    <View style={[tw`flex-row gap-3 mt-3`]}>
                      <TouchableOpacity
                        style={[
                          tw`flex-1 py-3 rounded-full bg-blue-500 items-center justify-center`,
                        ]}
                      >
                        <Text style={[tw`text-white`, { fontFamily: "Mont-SemiBold" }]}>
                          Uredi
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          tw`flex-1 py-3 rounded-full bg-red-500 items-center justify-center`,
                        ]}
                      >
                        <Text style={[tw`text-white`, { fontFamily: "Mont-SemiBold" }]}>
                          Obriši
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
