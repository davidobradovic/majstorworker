import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, loading: authLoading } = useAuth();
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

  const handleLogin = async () => {
    // Form validation
    if (!email.trim()) {
      Alert.alert("Greška", "Molimo unesite email adresu");
      return;
    }

    if (!password) {
      Alert.alert("Greška", "Molimo unesite lozinku");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Authed" }],
        });
      } else {
        Alert.alert(
          "Greška",
          result.message || "Neuspešna prijava. Proverite svoje podatke."
        );
      }
    } catch (error) {
      Alert.alert(
        "Greška",
        "Došlo je do neočekivane greške prilikom prijavljivanja."
      );
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading screen while fonts are loading
  if (!loaded) {
    return (
      <SafeAreaView style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1 flex bg-gray-400 justify-end`}
      >
        <Image source={require('../../assets/authbanner.png')} style={[ tw`h-2/3 object-cover absolute z-[1] right-[-50%] top-0` ]} />
        
        <View style={[ tw`w-[200%] aspect-square bg-gray-100 rounded-full absolute z-[2] bottom-[-35%] left-[-50%]` ]}></View>
        <View style={tw`relative z-10 bg-gray-100 px-6 justify-center items-center pb-10`}>
          <Text style={[tw`text-2xl text-left w-full mb-2`, { fontFamily: "Mont-Bold" }]}>
            TrebaMi
          </Text>
          <Text
            style={[
              tw`text-left w-full mb-8 text-gray-600`,
              { fontFamily: "Mont-Regular" },
            ]}
          >
            Prijavite se na TrebaMi kao radnik i ponudite svoje usluge
          </Text>

          <View style={tw`w-full mb-6`}>
            <Text
              style={[tw`mb-2 text-gray-700`, { fontFamily: "Mont-Medium" }]}
            >
              Email
            </Text>
            <TextInput
              style={[
                tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`,
                { fontFamily: "Mont-Regular" },
              ]}
              placeholder="Vaš email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              editable={!isSubmitting}
            />
          </View>

          <View style={tw`w-full mb-4`}>
            <Text
              style={[tw`mb-2 text-gray-700`, { fontFamily: "Mont-Medium" }]}
            >
              Lozinka
            </Text>
            <TextInput
              style={[
                tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`,
                { fontFamily: "Mont-Regular" },
              ]}
              placeholder="Vaša lozinka"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!isSubmitting}
            />
          </View>

          <TouchableOpacity
            style={[
              tw`w-full p-4 rounded-lg items-center`,
              isSubmitting ? tw`bg-blue-300` : tw`bg-blue-500`,
            ]}
            onPress={handleLogin}
            disabled={isSubmitting || authLoading}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text
                style={[
                  tw`text-white text-lg`,
                  { fontFamily: "Mont-SemiBold" },
                ]}
              >
                Prijavi se
              </Text>
            )}
          </TouchableOpacity>

          <View style={[ tw`flex flex-row items-center justify-center gap-1 mt-4` ]}>

            {/* <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              style={[ tw`w-full flex items-center justify-center bg-gray-200 p-4 rounded-lg` ]}
              disabled={isSubmitting}
            >
              <Text style={[tw`text-blue-500`, { fontFamily: "Mont-Medium" }]}>
                Zaboravili ste lozinku?
              </Text>
            </TouchableOpacity> */}
            <Text style={[tw`text-black ml-1`, { fontFamily: "Mont-Medium" }]}>Nemate nalog?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              disabled={isSubmitting}
              style={[ tw`` ]}
            >
              <Text
                style={[tw`text-black ml-1`, { fontFamily: "Mont-Bold" }]}
              >
                Registrujte se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
