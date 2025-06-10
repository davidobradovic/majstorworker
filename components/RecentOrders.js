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
  Animated,
  Dimensions,
  Modal,
  Pressable,
  FlatList,
  ImageBackground,
} from "react-native";
import tw from "twrnc";
import { useFonts } from "expo-font";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState, useRef } from "react";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import Divider from "./Divider";

import MapView, { Marker } from "react-native-maps";

const orders = [
  {
    id: 1,
    customer: {
      name: "David Obradovic",
      phone: "+381641234567",
      email: "david@example.com",
      address: "Bulevar Kralja Aleksandra 73, Beograd",
      location: {
        latitude: 44.8531,
        longitude: 20.3687,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    },
    job: "Popravka vodovodnih instalacija",
    description:
      "Imam problem sa ventilom kod bojlera. Inace bila mi se pokvarila cesma i zavrtao pa odvrtao sam ventil kad sam trebao da se kupam itd. Medjutim sad imam problem sa istim jer sad ne mogu da ga odvrnem. Takodje mi treba i ugradnja nove cesme, koju imam kupljenu.",
    images: ["ventil.jpg", "cesma.jpg"], // slike problema
    status: "Pending", // Pending, Accepted, In Progress, Completed, Cancelled
    price: 4750,
    currency: "RSD",
    priority: "Normal", // Low, Normal, High, Urgent
    category: "Vodoinstalater",
    scheduledDate: "2025-04-26T10:00:00",
    createdAt: "2025-04-24T08:00:00",
    updatedAt: "2025-04-24T08:00:00",
    paymentMethod: "Gotovina", // Gotovina, Kartično, Online
    paid: false,
    notes: "",
    warranty: false,
  },
  {
    id: 2,
    customer: {
      name: "Milica Jovanović",
      phone: "+381601112223",
      email: "milica.j@example.com",
      address: "Cara Dušana 102, Novi Sad",
      location: {
        latitude: 45.2671,
        longitude: 19.8335,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    },
    job: "Servis klima uređaja",
    description:
      "Klima ne hladi kako treba, čini se da je potrebna dopuna gasa i opšte čišćenje.",
    images: [],
    status: "Accepted",
    price: 3500,
    currency: "RSD",
    priority: "High",
    category: "Servis klima",
    scheduledDate: "2025-04-25T14:00:00",
    createdAt: "2025-04-24T09:15:00",
    updatedAt: "2025-04-24T10:00:00",
    paymentMethod: "Online",
    paid: true,
    notes: "Klijent nije kod kuće do 13h.",
    warranty: true,
  },
  {
    id: 3,
    customer: {
      name: "Marko Petrović",
      phone: "+381621234567",
      email: "marko.p@example.com",
      address: "Kneza Miloša 45, Kragujevac",
      location: {
        latitude: 44.0128,
        longitude: 20.9114,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    },
    job: "Montaža lustera",
    description:
      "Potrebna montaža velikog lustera u dnevnom boravku (plafon je visok 3.5m). Imam sve delove, ali potrebna stabilna merdevina.",
    images: ["luster.jpg"],
    status: "In Progress",
    price: 2200,
    currency: "RSD",
    priority: "Normal",
    category: "Električar",
    scheduledDate: "2025-04-24T16:00:00",
    createdAt: "2025-04-24T09:30:00",
    updatedAt: "2025-04-24T16:00:00",
    paymentMethod: "Gotovina",
    paid: false,
    notes: "Ulazna kapija zaključana, pozvati broj",
    warranty: false,
  },
  {
    id: 4,
    customer: {
      name: "Ivana Stanišić",
      phone: "+381638765432",
      email: "ivana.s@example.com",
      address: "Ulica Jovana Dučića 8, Niš",
      location: {
        latitude: 43.3209,
        longitude: 21.8958,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    },
    job: "Farbanje stana",
    description:
      "Potrebno je okrečiti dnevnu i spavaću sobu, ukupno oko 45m2. Zidovi su beli, ali su zaprljani i potrebna su 2 sloja boje.",
    images: [],
    status: "Pending",
    price: 9000,
    currency: "RSD",
    priority: "Low",
    category: "Moler",
    scheduledDate: "2025-04-28T09:00:00",
    createdAt: "2025-04-24T11:00:00",
    updatedAt: "2025-04-24T11:00:00",
    paymentMethod: "Kartično",
    paid: false,
    notes: "Boja obezbeđena od strane klijenta",
    warranty: false,
  },
  {
    id: 5,
    customer: {
      name: "Nemanja Ilić",
      phone: "+38166555666",
      email: "nemanja.i@example.com",
      address: "Žarka Zrenjanina 18, Subotica",
      location: {
        latitude: 46.1,
        longitude: 19.6667,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    },
    job: "Čišćenje odvoda",
    description:
      "Odvod u kuhinji se zapušio i voda se sporo sliva. Potrebno hitno čišćenje cevi.",
    images: ["odvod.jpg"],
    status: "Completed",
    price: 2700,
    currency: "RSD",
    priority: "Urgent",
    category: "Vodoinstalater",
    scheduledDate: "2025-04-23T12:00:00",
    createdAt: "2025-04-23T09:00:00",
    updatedAt: "2025-04-23T13:00:00",
    paymentMethod: "Gotovina",
    paid: true,
    notes: "Nakon čišćenja proveriti zaptivanje",
    warranty: true,
  },
  {
    id: 6,
    customer: {
      name: "Aleksandra Đorđević",
      phone: "+381645554321",
      email: "aleksandra.d@example.com",
      address: "Obilićev venac 12, Beograd",
      location: {
        latitude: 44.8176,
        longitude: 20.4569,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    },
    job: "Postavljanje video nadzora",
    description:
      "Potrebno postaviti 4 kamere za video nadzor oko kuće, kablovi su provučeni. Potrebna instalacija i podešavanje sistema.",
    images: ["kamera1.jpg", "kamera2.jpg"],
    status: "Accepted",
    price: 14500,
    currency: "RSD",
    priority: "High",
    category: "Električar / Sigurnosni sistemi",
    scheduledDate: "2025-04-27T10:00:00",
    createdAt: "2025-04-24T07:45:00",
    updatedAt: "2025-04-24T10:15:00",
    paymentMethod: "Online",
    paid: false,
    notes: "Potreban pristup ruteru za podešavanje",
    warranty: true,
  },
];

export default function RecentOrders() {
  const navigation = useNavigation();

  const [majstorLokacija, setMajstorLokacija] = useState({
    latitude: 44.8125,
    longitude: 20.4612, // Beograd koordinate
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobModal, setJobModal] = useState(false);

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
  const selectedOrder = orders.find((ord) => ord.id === selectedJob) || null;

  return (
    <View style={[tw`px-4, pb-[20px]`]}>
      <Text style={[tw`text-xl`, { fontFamily: "Mont-Bold" }]}>Narudžbe</Text>
      <View style={[tw`grid grid-cols-2 gap-3 mt-4`]}>
        {orders.map((order, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.75}
              key={index}
              onPress={() => {
                setSelectedJob(order.id);
                setJobModal(true);
              }}
              style={[
                tw`flex-1 p-4 bg-gray-50 border-l-4 rounded-lg border-blue-500 relative`,
              ]}
            >
              <View
                style={[
                  tw`py-1 px-2 rounded-lg absolute top-1 right-1 ${
                    order.priority === "Normal"
                      ? "bg-green-500"
                      : order.priority === "Urgent"
                      ? "bg-red-600"
                      : order.priority === "High"
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }`,
                ]}
              >
                <Text
                  style={[
                    tw`text-[11px] text-white`,
                    { fontFamily: "Mont-Bold" },
                  ]}
                >
                  {order.priority}
                </Text>
              </View>
              <Text style={[tw`text-md`, { fontFamily: "Mont-SemiBold" }]}>
                {order.job}
              </Text>
              <Text
                numberOfLines={3}
                style={[
                  tw`text-md opacity-60 my-2`,
                  { fontFamily: "Mont-Medium" },
                ]}
              >
                {order.description}
              </Text>
              <View
                style={[tw`flex flex-row items-center justify-between mt-4`]}
              >
                <View style={[tw`flex flex-row items-center gap-2`]}>
                  <View
                    style={[tw`p-2 bg-gray-200 w-fit`, { borderRadius: 100 }]}
                  >
                    <IonIcons name="person" size={16} />
                  </View>
                  <Text style={[tw``, { fontFamily: "Mont-SemiBold" }]}>
                    {order.customer.name}
                  </Text>
                </View>
                <View style={[tw`flex flex-col items-end`]}>
                  <Text
                    style={[
                      tw`text-xs opacity-50`,
                      { fontFamily: "Mont-Bold" },
                    ]}
                  >
                    Datum Rada
                  </Text>
                  <Text style={[tw``, { fontFamily: "Mont-Bold" }]}>
                    {dayjs(order.scheduledDate).format("DD.MM.YYYY | HH:mm")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <Modal visible={jobModal} transparent={true} animationType="fade">
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-end items-center`}
        >
          <View
            style={tw`bg-white w-full rounded-2xl p-6 pb-10 overflow-hidden flex flex-col relative`}
          >
            {selectedJob ? (
              <View
                style={[
                  tw`py-1 px-2 rounded-full absolute top-3 right-3 z-100 ${
                    selectedOrder.priority === "Normal"
                      ? "bg-green-500"
                      : selectedOrder.priority === "Urgent"
                      ? "bg-red-600"
                      : selectedOrder.priority === "High"
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }`,
                ]}
              >
                <Text
                  style={[
                    tw`text-[11px] text-white`,
                    { fontFamily: "Mont-Bold" },
                  ]}
                >
                  {selectedOrder.priority}
                </Text>
              </View>
            ) : null}

            <ScrollView style={[tw`max-h-[500px]`]}>
              <View style={[tw`flex flex-row items-center gap-3`]}>
                <View
                  style={[
                    tw`w-20 h-20 bg-gray-200 flex items-center justify-center`,
                    { borderRadius: 100 },
                  ]}
                >
                  <IonIcons name="person" size={24} />
                </View>
                <View>
                  <Text style={[tw`text-lg`, { fontFamily: "Mont-Bold" }]}>
                    {selectedJob ? selectedOrder.customer.name : null}
                  </Text>
                </View>
              </View>

              <Divider />

              <View style={tw`h-40 rounded-lg mb-3 overflow-hidden`}>
                <MapView
                  zoomControlEnabled={false}
                  style={tw`flex-1`}
                  initialRegion={
                    selectedJob ? selectedOrder.customer.location : null
                  }
                >
                  <Marker
                    coordinate={{
                      latitude: selectedJob
                        ? selectedOrder.customer.location.latitude
                        : null,
                      longitude: selectedJob
                        ? selectedOrder.customer.location.longitude
                        : null,
                    }}
                    title={selectedJob ? selectedOrder.customer.name : null}
                    description={
                      selectedJob ? selectedOrder.customer.address : null
                    }
                  >
                    <View style={tw`bg-green-500 p-2 rounded-full`}>
                      <IonIcons name="person" size={16} color="#00" />
                    </View>
                  </Marker>

                  <Marker
                    coordinate={{
                      latitude: majstorLokacija.latitude,
                      longitude: majstorLokacija.longitude,
                    }}
                    title="Moja Lokacija"
                  >
                    <View style={tw`bg-green-500 p-2 rounded-full`}>
                      <IonIcons name="person" size={16} color="#00" />
                    </View>
                  </Marker>
                </MapView>
              </View>

              <View>
                <Text style={[tw`text-lg`, { fontFamily: "Mont-SemiBold" }]}>
                  Opis
                </Text>
                <Text style={[tw``, { fontFamily: "Mont-Regular" }]}>
                  {selectedJob ? selectedOrder.description : null}
                </Text>
              </View>

              <Divider />

              <View>
                <Text style={[tw`text-xl`, { fontFamily: "Mont-Bold" }]}>
                  {selectedJob
                    ? selectedOrder.price.toLocaleString(void 0, {
                        maximumFractionDigits: 2,
                      })
                    : null}{" "}
                  {selectedJob ? selectedOrder.currency : null}
                </Text>
                <View style={[tw`flex flex-row items-center gap-2 mt-2`]}>
                  <Text style={[tw`text-base`, { fontFamily: "Mont-Bold" }]}>
                    {selectedJob ? selectedOrder.paymentMethod : null}
                  </Text>
                  <Text
                    style={[
                      tw`py-1 px-2 text-xs ${
                        selectedJob
                          ? selectedOrder.paid === true
                            ? "bg-green-500"
                            : "bg-red-600"
                          : null
                      } text-white rounded-lg`,
                      { fontFamily: "Mont-Regular" },
                    ]}
                  >
                    {selectedJob
                      ? selectedOrder?.paid
                        ? "Plaćeno"
                        : "Neplaćeno"
                      : ""}
                  </Text>
                </View>
              </View>

              <Divider />

              {selectedJob ? (
                selectedOrder.notes ? (
                  <View>
                    <Text
                      style={[tw`text-lg`, { fontFamily: "Mont-SemiBold" }]}
                    >
                      Napomena
                    </Text>
                    <Text style={[tw``, { fontFamily: "Mont-Regular" }]}>
                      {selectedJob ? selectedOrder.notes : null}
                    </Text>
                  </View>
                ) : null
              ) : null}
            </ScrollView>

            <View style={[tw`flex flex-row items-center gap-4`]}>
              <TouchableOpacity
                style={tw`bg-blue-500 rounded-xl p-4 mt-4 items-center flex-1`}
                onPress={() => setJobModal(false)}
              >
                <Text
                  style={[
                    tw` text-white font-medium`,
                    { fontFamily: "Mont-Medium" },
                  ]}
                >
                  Prihvati
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-red-600 rounded-xl p-4 mt-4 items-center flex-1`}
                onPress={() => setJobModal(false)}
              >
                <Text
                  style={[
                    tw` text-white font-medium`,
                    { fontFamily: "Mont-Medium" },
                  ]}
                >
                  Odbiji
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={tw`bg-gray-100 rounded-xl p-4 mt-4 items-center`}
              onPress={() => setJobModal(false)}
            >
              <Text
                style={[
                  tw` text-black font-medium`,
                  { fontFamily: "Mont-Medium" },
                ]}
              >
                Otkaži
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
