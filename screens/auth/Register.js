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
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { Switch } from "react-native";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [opis, setOpis] = useState("");
  const [usedRefferal, setUsedRefferal] = useState(0);
  const [refferal, setRefferal] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [images, setImages] = useState([]);

  const [step, setStep] = useState(0);

  // Handle image picking
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Combine new images with existing ones
      const newImages = result.assets.map((asset) => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  // Remove an image
  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

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

  const handleRegister = async () => {
    if (!email.trim()) {
      Alert.alert("Greška", "Molimo unesite email adresu");
      return;
    }

    if (!password) {
      Alert.alert("Greška", "Molimo unesite lozinku");
      return;
    }

    if (images.length === 0) {
      Alert.alert("Greška", "Morate dodati sliku");
      return;
    }

    setIsSubmitting(true);

    try {
      let formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("description", opis);
      formData.append("usedRefferal", usedRefferal);
      formData.append("refferal", refferal);
      formData.append("role", "worker"); // or whatever role you want to pass

      // Only take the first image (API expects single image)
      const imageUri = images[0];
      const filename = imageUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("image", {
        uri: imageUri,
        name: filename,
        type,
      });

      const response = await fetch(
        "https://backend.davidtesla.online/api/user/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Register response:", data);

      if (data.user) {
        Alert.alert("Uspešno", "Registracija je uspešna!");

        // Navigate or store token if API returns it
        navigation.reset({
          index: 0,
          routes: [{ name: "Authed" }],
        });
      } else {
        const errorMessage = data.message || "Neuspešna registracija.";
        Alert.alert("Greška", errorMessage);
      }
    } catch (error) {
      console.error("Register error:", error);
      Alert.alert(
        "Greška pri povezivanju",
        "Došlo je do problema pri povezivanju sa serverom. Proverite svoju internet vezu."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fontStyle = (weight) => ({ fontFamily: `Mont-${weight}` });

  // Show loading screen while fonts are loading
  if (!loaded) {
    return (
      <SafeAreaView style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1 px-6`}
      >
        <View style={tw`flex-1 justify-center items-center`}>

          <Text
            style={[
              tw`text-4xl text-left w-full mb-2`,
              { fontFamily: "Mont-Bold" },
            ]}
          >
            TrebaMi
          </Text>
          <Text
            style={[
              tw`text-left w-full mb-8 text-gray-600`,
              { fontFamily: "Mont-Regular" },
            ]}
          >
            Registruj se na TrebaMi i nadjite uslugu na vreme
          </Text>

          {step === 0 ? (
            <View
              style={tw` w-full flex items-center justify-center -mx-1 mb-6 h-2/4`}
            >
              {images.length < 1 ? (
                <TouchableOpacity style={tw`w-2/3 p-1`} onPress={pickImages}>
                  <View
                    style={[
                      tw`aspect-square border-2 border-dashed border-gray-300 items-center justify-center bg-gray-50`,
                      { borderRadius: 200 },
                    ]}
                  >
                    <MaterialIcons
                      name="add-photo-alternate"
                      size={32}
                      color="#6B7280"
                    />
                    <Text
                      style={[
                        tw`text-xs text-gray-500 mt-2`,
                        fontStyle("Medium"),
                      ]}
                    >
                      Izaberi profilnu sliku
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                images.map((image, index) => (
                  <View
                    key={index}
                    style={[
                      tw`w-full p-1 overflow-hidden flex items-center justify-center`,
                    ]}
                  >
                    <View
                      style={[
                        tw`w-2/3 aspect-square items-center justify-center bg-gray-50`,
                        { borderRadius: 200 },
                      ]}
                    >
                      <Image
                        source={{ uri: image }}
                        style={[tw`w-full h-full`, { borderRadius: 200 }]}
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
                ))
              )}
            </View>
          ) : step === 1 ? (
            <>
              <View style={tw`w-full mb-6`}>
                <Text
                  style={[
                    tw`mb-2 text-gray-700`,
                    { fontFamily: "Mont-Medium" },
                  ]}
                >
                  Ime i Prezime
                </Text>
                <TextInput
                  style={[
                    tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`,
                    { fontFamily: "Mont-Regular" },
                  ]}
                  placeholder="Vaše ime i prezime"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={fullName}
                  onChangeText={setFullName}
                  editable={!isSubmitting}
                />
              </View>

              <View style={tw`w-full mb-6`}>
                <Text
                  style={[
                    tw`mb-2 text-gray-700`,
                    { fontFamily: "Mont-Medium" },
                  ]}
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

              <View style={tw`w-full mb-8`}>
                <Text
                  style={[
                    tw`mb-2 text-gray-700`,
                    { fontFamily: "Mont-Medium" },
                  ]}
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

              <View style={tw`w-full mb-8`}>
                <Text
                  style={[
                    tw`mb-2 text-gray-700`,
                    { fontFamily: "Mont-Medium" },
                  ]}
                >
                  Opis
                </Text>
                <TextInput
                  style={[
                    tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`,
                    { fontFamily: "Mont-Regular" },
                  ]}
                  placeholder="Vaš opis"
                  multiline={true}
                  value={opis}
                  onChangeText={setOpis}
                  editable={!isSubmitting}
                />
              </View>
            </>
          ) : step === 2 ? (
            <>
              <View style={tw`w-full mb-6`}>
                <Text
                  style={[
                    tw`mb-2 text-gray-700`,
                    { fontFamily: "Mont-Medium" },
                  ]}
                >
                  Pozivni kod
                </Text>
                <TextInput
                  style={[
                    tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`,
                    { fontFamily: "Mont-Regular" },
                  ]}
                  placeholder="Vaš pozivni kod"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={refferal}
                  onChangeText={setRefferal}
                  editable={!isSubmitting}
                />
              </View>
            </>
          ) : null}

          {/* Dugmad */}
          {step === 0 ? (
            <View style={[tw`flex flex-row items-center gap-2`]}>
              <TouchableOpacity
                style={[tw`w-1/2 p-4 rounded-lg items-center bg-gray-100`]}
                onPress={() => navigation.goBack()}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <Text
                    style={[
                      tw`text-black text-lg`,
                      { fontFamily: "Mont-SemiBold" },
                    ]}
                  >
                    Otkaži
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[tw`w-1/2 p-4 rounded-lg items-center bg-blue-500`]}
                onPress={() => setStep(step + 1)}
                disabled={isSubmitting}
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
                    Sledeći korak
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : step < 2 ? (
            <View style={[tw`flex flex-row items-center gap-2`]}>
              <TouchableOpacity
                style={[tw`w-1/2 p-4 rounded-lg items-center bg-gray-100`]}
                onPress={() => setStep(step - 1)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <Text
                    style={[
                      tw`text-black text-base`,
                      { fontFamily: "Mont-SemiBold" },
                    ]}
                  >
                    Prethodni korak
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[tw`w-1/2 p-4 rounded-lg items-center bg-blue-500`]}
                onPress={() => setStep(step + 1)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text
                    style={[
                      tw`text-white text-base`,
                      { fontFamily: "Mont-SemiBold" },
                    ]}
                  >
                    Sledeći korak
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[tw`flex flex-row items-center gap-2`]}>
              <TouchableOpacity
                style={[tw`w-1/2 p-4 rounded-lg items-center bg-gray-100`]}
                onPress={() => setStep(step - 1)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <Text
                    style={[
                      tw`text-black text-base`,
                      { fontFamily: "Mont-SemiBold" },
                    ]}
                  >
                    Prethodni korak
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`w-1/2 p-4 rounded-lg items-center`,
                  isSubmitting ? tw`bg-blue-300` : tw`bg-blue-500`,
                ]}
                onPress={handleRegister}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text
                    style={[
                      tw`text-white text-base`,
                      { fontFamily: "Mont-SemiBold" },
                    ]}
                  >
                    Registruj se
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
