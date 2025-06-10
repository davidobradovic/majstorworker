import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import tw from 'twrnc'

const ChatsScreen = () => {
  const navigation = useNavigation();

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

  const chats = [
    {
        user: "David Obradovic",
        message: "Ogi ajde pogledaj da li ti se ovo svidja. Ja mislim da nije losa fora, ima za favorite i za brisanje",
        sentAt: new Date()
    },
    {
        user: "David Obradovic 2",
        message: "Ogi ajde pogledaj da li ti se ovo svidja. Ja mislim da nije losa fora, ima za favorite i za brisanje",
        sentAt: new Date()
    },
    {
        user: "David Obradovic 3",
        message: "Ogi ajde pogledaj da li ti se ovo svidja. Ja mislim da nije losa fora, ima za favorite i za brisanje",
        sentAt: new Date()
    },
    {
        user: "David Obradovic 4",
        message: "Ogi ajde pogledaj da li ti se ovo svidja. Ja mislim da nije losa fora, ima za favorite i za brisanje",
        sentAt: new Date()
    },
    {
        user: "David Obradovic 5",
        message: "Ogi ajde pogledaj da li ti se ovo svidja. Ja mislim da nije losa fora, ima za favorite i za brisanje",
        sentAt: new Date()
    },
    {
        user: "David Obradovic 6",
        message: "Ogi ajde pogledaj da li ti se ovo svidja. Ja mislim da nije losa fora, ima za favorite i za brisanje",
        sentAt: new Date()
    },
    {
        user: "David Obradovic 7",
        message: "Ogi ajde pogledaj da li ti se ovo svidja. Ja mislim da nije losa fora, ima za favorite i za brisanje",
        sentAt: new Date()
    }
  ]

  return (
    <View style={[ tw`flex-1 bg-white` ]}>
      <SafeAreaView style={[ tw`flex-1` ]}>
        <ScrollView>
            {
                chats.map((chat, index) => {
                    return (
                        <View key={index} style={[ tw`bg-gray-50 p-3 flex flex-row items-center gap-3 border-b border-gray-200` ]}>
                            <View style={[ tw`w-[16] h-[16] bg-gray-200 rounded-full` ]}>

                            </View>
                            <View style={[ tw`flex-1` ]}>
                                <Text style={[ tw`text-base mb-1`, { fontFamily: 'Mont-Bold' } ]}>{chat.user}</Text>
                                <Text style={[ tw`opacity-50`, { fontFamily: 'Mont-Regular' } ]} numberOfLines={1}>{chat.message}</Text>
                            </View>
                        </View>
                    )
                })
            }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
