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
import twrnc from "twrnc";
import MapView, { Marker } from "react-native-maps";
import CalendarPicker from "react-native-calendar-picker";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Divider from "../../components/Divider";

const WorkerScreen = () => {
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

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [paymentView, setPaymentView] = useState(false);




  const [majstorLokacija, setMajstorLokacija] = useState({
    latitude: 44.8125,
    longitude: 20.4612, // Beograd koordinate
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Generišemo dinamičke datume - danas i 30 dana unapred
  const [datumi, setDatumi] = useState([]);

  useEffect(() => {
    const danas = new Date();
    const noviDatumi = [];

    for (let i = -2; i < 28; i++) {
      const datum = new Date();
      datum.setDate(danas.getDate() + i);

      const dani = ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"];
      const dan = dani[datum.getDay()];
      const broj = datum.getDate();
      const mesec = datum.getMonth() + 1;

      noviDatumi.push({
        datum: datum,
        dan: dan,
        broj: broj,
        mesec: mesec,
        disabled: i < 0, // Prošli datumi su onemogućeni
        selected: i === 1, // Sutra je automatski odabran
      });
    }

    setDatumi(noviDatumi);
    setSelectedDate(noviDatumi.find((d) => d.selected).datum);
  }, []);

  const jutarnjiTermini = [
    { vreme: "08:00" },
    { vreme: "09:30" },
    { vreme: "10:45" },
    { vreme: "11:30" },
  ];

  const poslepodnevniTermini = [
    { vreme: "13:00" },
    { vreme: "14:30" },
    { vreme: "16:00" },
    { vreme: "17:30" },
    { vreme: "19:00" },
  ];

  const vecernjiTermini = [{ vreme: "20:00" }, { vreme: "21:30" }];

  const odaberiDatum = (index) => {
    const noviDatumi = datumi.map((d, i) => ({
      ...d,
      selected: i === index,
    }));

    setDatumi(noviDatumi);
    setSelectedDate(noviDatumi[index].datum);
  };

  const odaberiVreme = (vreme) => {
    setSelectedTime(vreme);
  };

  const odaberiKalendarskiDatum = (date) => {
    // Provera da li je date već Date objekat ili ima metodu toDate()
    const selectedDateObj =
      date instanceof Date
        ? date
        : date.toDate
        ? date.toDate()
        : new Date(date);

    setSelectedDate(selectedDateObj);
    setShowCalendar(false);

    // Ažuriramo i selektovanu poziciju u horizontalnom prikazu ako datum postoji tamo
    const noviDatumi = datumi.map((d) => ({
      ...d,
      selected: d.datum.toDateString() === selectedDateObj.toDateString(),
    }));

    setDatumi(noviDatumi);
  };

  const formatirajDatum = (datum) => {
    if (!datum) return "";

    const dan = datum.getDate();
    const mesec = datum.getMonth() + 1;
    const godina = datum.getFullYear();

    return `${dan}.${mesec}.${godina}.`;
  };

  const renderTermin = (vreme, isSelected = false) => (
    <TouchableOpacity
      key={vreme}
      style={twrnc`h-10 px-4 rounded-full flex items-center justify-center ${
        isSelected
          ? "bg-blue-500 border-blue-500"
          : "bg-white border border-gray-200"
      }`}
      onPress={() => odaberiVreme(vreme)}
    >
      <Text
        style={twrnc` ${
          selectedTime === vreme ? "text-white" : "text-black"
        } font-medium`}
      >
        {vreme}
      </Text>
    </TouchableOpacity>
  );

  const renderDan = (item, index) => (
    <TouchableOpacity
      key={index}
      style={twrnc`w-16 h-20 rounded-xl mx-1 flex items-center justify-center ${
        item.selected
          ? "bg-blue-500"
          : item.disabled
          ? "bg-gray-100"
          : "bg-white border border-gray-200"
      }`}
      onPress={() => !item.disabled && odaberiDatum(index)}
      disabled={item.disabled}
    >
      <Text
        style={[
          twrnc` text-xs ${
            item.disabled
              ? "text-gray-400"
              : item.selected
              ? "text-blue-100"
              : "text-gray-500"
          }`,
          { fontFamily: "Mont-Regular" },
        ]}
      >
        {item.dan}
      </Text>
      <Text
        style={[
          twrnc` text-lg font-bold ${
            item.disabled
              ? "text-gray-400"
              : item.selected
              ? "text-white"
              : "text-black"
          }`,
          { fontFamily: "Mont-Regular" },
        ]}
      >
        {item.broj}
      </Text>
      <Text
        style={[
          twrnc` text-xs ${
            item.disabled
              ? "text-gray-400"
              : item.selected
              ? "text-blue-100"
              : "text-gray-500"
          }`,
          { fontFamily: "Mont-Regular" },
        ]}
      >
        {item.mesec}. mesec
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={twrnc`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={twrnc`px-4 pt-2 pb-4 bg-white shadow`}>
        <View style={twrnc`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={twrnc`w-10 h-10 rounded-full bg-gray-100 items-center justify-center`}
          >
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text
            style={[
              twrnc` text-xl font-bold ml-4`,
              { fontFamily: "Mont-SemiBold" },
            ]}
          >
            Zakaži majstora
          </Text>
        </View>
      </View>

      <ScrollView style={twrnc`flex-1`}>
        {/* Banner */}
        <View style={twrnc`bg-white mb-2 p-4`}>
          <View style={twrnc`flex-row`}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={twrnc`w-20 h-20 rounded-full`}
            />
            <View style={twrnc`ml-4 flex-1`}>
              <Text
                style={[twrnc` text-xl font-bold`, { fontFamily: "Mont-Bold" }]}
              >
                Milan Petrović
              </Text>
              <View style={twrnc`flex-row items-center`}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={[twrnc` ml-1`, { fontFamily: "Mont-Regular" }]}>
                  4.8 (142 ocena)
                </Text>
              </View>
              <Text
                style={[
                  twrnc` text-gray-500 mt-1`,
                  { fontFamily: "Mont-Medium" },
                ]}
              >
                Vodoinstalater i električar
              </Text>
              <View style={twrnc`flex-row items-center mt-1`}>
                <Icon name="cash-outline" size={16} color="#22C55E" />
                <Text
                  style={[
                    twrnc` ml-1 text-green-600 font-medium`,
                    { fontFamily: "Mont-Medium" },
                  ]}
                >
                  Od 2.500 RSD/h
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={[twrnc` mt-4 text-gray-700`, { fontFamily: "Mont-Regular" }]}
          >
            Profesionalni majstor sa preko 15 godina iskustva u oblasti
            vodoinstalacija, električnih instalacija i opštih kućnih popravki.
          </Text>

          <View style={twrnc`flex-row mt-4`}>
            <View style={twrnc`flex-1 items-center`}>
              <Text
                style={[twrnc` text-gray-500`, { fontFamily: "Mont-Medium" }]}
              >
                Iskustvo
              </Text>
              <Text style={[twrnc` font-bold`, { fontFamily: "Mont-Bold" }]}>
                15+ godina
              </Text>
            </View>
            <View style={[twrnc`w-[1px] h-full bg-gray-100`]}></View>
            <View style={twrnc`flex-1 items-center`}>
              <Text
                style={[twrnc` text-gray-500`, { fontFamily: "Mont-Medium" }]}
              >
                Usluge
              </Text>
              <Text style={[twrnc` font-bold`, { fontFamily: "Mont-Bold" }]}>
                12 vrsta
              </Text>
            </View>
            <View style={[twrnc`w-[1px] h-full bg-gray-100`]}></View>
            <View style={twrnc`flex-1 items-center`}>
              <Text
                style={[twrnc` text-gray-500`, { fontFamily: "Mont-Medium" }]}
              >
                Garancija
              </Text>
              <Text style={[twrnc` font-bold`, { fontFamily: "Mont-Bold" }]}>
                12 meseci
              </Text>
            </View>
          </View>
        </View>

        <View style={[twrnc`flex flex-row items-center px-4 gap-4`]}>
          <TouchableOpacity
            style={[
              twrnc`flex flex-row items-center gap-3 p-4 bg-blue-500 flex-1 rounded-lg`,
            ]}
          >
            <FontAwesome name="phone" color="white" size={22} />
            <Text style={[twrnc`text-white`, { fontFamily: "Mont-Medium" }]}>
              Pozovi majstora
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              twrnc`flex flex-row items-center gap-3 p-4 bg-gray-100 flex-1 rounded-lg`,
            ]}
          >
            <Icon name="mail" style={[twrnc`text-green-500`]} size={22} />
            <Text style={[twrnc``, { fontFamily: "Mont-Medium" }]}>
              Pošalji poruku
            </Text>
          </TouchableOpacity>
        </View>

        <Divider />
        {/* Maps */}
        <View style={twrnc`bg-white mb-2 p-4`}>
          <Text
            style={[
              twrnc` text-lg font-bold mb-2`,
              { fontFamily: "Mont-Bold" },
            ]}
          >
            Trenutna lokacija
          </Text>
          <View style={twrnc`h-40 rounded-lg overflow-hidden`}>
            <MapView
              onPress={() => setOpenMap(true)}
              zoomControlEnabled={false}
              style={twrnc`flex-1`}
              initialRegion={majstorLokacija}
            >
              <Marker
                coordinate={{
                  latitude: majstorLokacija.latitude,
                  longitude: majstorLokacija.longitude,
                }}
                title="Milan Petrović"
                description="Dostupan"
              >
                <View style={twrnc`bg-green-500 p-2 rounded-full`}>
                  <Icon name="person" size={16} color="#00" />
                </View>
              </Marker>
            </MapView>
          </View>
          <View style={twrnc`flex-row items-center mt-2`}>
            <Icon name="location-outline" size={16} color="#3B82F6" />
            <Text
              style={[
                twrnc` ml-1 text-gray-600`,
                { fontFamily: "Mont-Regular" },
              ]}
            >
              Novi Beograd (udaljenost 3.2 km)
            </Text>
          </View>
        </View>

        {/* Confirmation Button */}
        <TouchableOpacity
          style={twrnc`mx-4 my-4 bg-blue-500 rounded-xl p-4 flex-row justify-between items-center`}
          onPress={() => setShowAppointment(!showAppointment)}
        >
          <Text
            style={[
              twrnc` text-white text-lg font-bold`,
              { fontFamily: "Mont-SemiBold" },
            ]}
          >
            {showAppointment ? "Sakrij opcije zakazivanja" : "Zakaži termin"}
          </Text>
          <Icon
            name={showAppointment ? "chevron-up" : "chevron-down"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Sekcija za zakazivanje - prikazuje se samo ako je showAppointment true */}
        {showAppointment && (
          <View style={twrnc`bg-white p-4 mx-2 mb-4 rounded-xl shadow`}>
            {/* Section Title */}
            <Text
              style={[
                twrnc` text-lg font-bold mb-4`,
                { fontFamily: "Mont-Bold" },
              ]}
            >
              Odaberite datum i vreme
            </Text>

            {/* Selected Date View */}
            <View
              style={twrnc`flex-row justify-between items-center mb-4 bg-gray-50 p-3 rounded-lg`}
            >
              <View style={twrnc`flex-row items-center`}>
                <Icon name="calendar" size={20} color="#3B82F6" />
                <Text
                  style={[
                    twrnc` ml-2 font-medium`,
                    { fontFamily: "Mont-Medium" },
                  ]}
                >
                  {formatirajDatum(selectedDate)}
                </Text>
              </View>
              <TouchableOpacity
                style={twrnc`flex-row items-center`}
                onPress={() => setShowCalendar(true)}
              >
                <Text
                  style={[
                    twrnc` mr-1 text-blue-500`,
                    { fontFamily: "Mont-Regular" },
                  ]}
                >
                  Izaberi drugi datum
                </Text>
                <MaterialIcons name="date-range" size={18} color="#3B82F6" />
              </TouchableOpacity>
            </View>

            {/* Fast Date Picker */}
            <Text
              style={[twrnc` font-medium mb-2`, { fontFamily: "Mont-Medium" }]}
            >
              Brzi izbor datuma:
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={twrnc`mb-6`}
              contentContainerStyle={twrnc`py-2`}
            >
              {datumi.map(renderDan)}
            </ScrollView>

            {/* Morning Shifts */}
            <View style={twrnc`mb-6`}>
              <View style={twrnc`flex-row items-center mb-3`}>
                <FontAwesome
                  name="sun-o"
                  size={16}
                  color="#FFB800"
                  style={twrnc`mr-2`}
                />
                <Text
                  style={[
                    twrnc` text-base font-bold`,
                    { fontFamily: "Mont-Bold" },
                  ]}
                >
                  Jutarnji termini
                </Text>
              </View>

              <View style={twrnc`flex-row flex-wrap gap-2`}>
                {jutarnjiTermini.map((slot) =>
                  renderTermin(slot.vreme, selectedTime === slot.vreme)
                )}
              </View>
            </View>

            {/* Day Shifts */}
            <View style={twrnc`mb-6`}>
              <View style={twrnc`flex-row items-center mb-3`}>
                <Icon
                  name="partly-sunny-outline"
                  size={18}
                  color="#FF9500"
                  style={twrnc`mr-2`}
                />
                <Text
                  style={[
                    twrnc` text-base font-bold`,
                    { fontFamily: "Mont-Bold" },
                  ]}
                >
                  Poslepodnevni termini
                </Text>
              </View>

              <View style={twrnc`flex-row flex-wrap gap-2`}>
                {poslepodnevniTermini.map((slot) =>
                  renderTermin(slot.vreme, selectedTime === slot.vreme)
                )}
              </View>
            </View>

            {/* Nigth Shifts */}
            <View style={twrnc`mb-6`}>
              <View style={twrnc`flex-row items-center mb-3`}>
                <Icon
                  name="moon-outline"
                  size={16}
                  color="#6366F1"
                  style={twrnc`mr-2`}
                />
                <Text
                  style={[
                    twrnc` text-base font-bold`,
                    { fontFamily: "Mont-Bold" },
                  ]}
                >
                  Večernji termini
                </Text>
              </View>

              <View style={twrnc`flex-row flex-wrap gap-2`}>
                {vecernjiTermini.map((slot) =>
                  renderTermin(slot.vreme, selectedTime === slot.vreme)
                )}
              </View>
            </View>

            {/* Problem Details */}
            <View style={twrnc`mb-6`}>
              <Text
                style={[
                  twrnc` text-base font-bold mb-2`,
                  { fontFamily: "Mont-Bold" },
                ]}
              >
                Detalji problema
              </Text>
              <TouchableOpacity
                style={twrnc`border border-gray-300 rounded-lg p-3 flex-row justify-between items-center`}
              >
                <TextInput placeholder="Opišite problem..." />
                <Icon name="create-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Choose Service */}
            <View style={twrnc`mb-4`}>
              <Text
                style={[
                  twrnc` text-base font-bold mb-2`,
                  { fontFamily: "Mont-Bold" },
                ]}
              >
                Izaberite uslugu
              </Text>
              <View
                style={twrnc`bg-gray-50 rounded-lg divide-y divide-gray-200 overflow-hidden`}
              >
                <TouchableOpacity
                  style={twrnc`flex-row justify-between items-center p-4 bg-[#3B82F6]`}
                >
                  <View style={twrnc`flex-row items-center`}>
                    <Icon
                      name="water-outline"
                      size={20}
                      color="#fff"
                      style={twrnc`mr-2`}
                    />
                    <Text
                      style={[
                        twrnc`text-white`,
                        { fontFamily: "Mont-Regular" },
                      ]}
                    >
                      Popravka vodovodnih instalacija
                    </Text>
                  </View>
                  <Text
                    style={[twrnc` text-white`, { fontFamily: "Mont-Regular" }]}
                  >
                    2.500 RSD
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={twrnc`flex-row justify-between items-center p-4`}
                >
                  <View style={twrnc`flex-row items-center`}>
                    <Icon
                      name="flash-outline"
                      size={20}
                      color="#3B82F6"
                      style={twrnc`mr-2`}
                    />
                    <Text style={[{ fontFamily: "Mont-Regular" }]}>
                      Električne instalacije
                    </Text>
                  </View>
                  <Text
                    style={[
                      twrnc` text-green-600`,
                      { fontFamily: "Mont-Regular" },
                    ]}
                  >
                    3.000 RSD
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={twrnc`flex-row justify-between items-center p-4`}
                >
                  <View style={twrnc`flex-row items-center`}>
                    <Icon
                      name="construct-outline"
                      size={20}
                      color="#3B82F6"
                      style={twrnc`mr-2`}
                    />
                    <Text style={[{ fontFamily: "Mont-Regular" }]}>
                      Opšte popravke
                    </Text>
                  </View>
                  <Text
                    style={[
                      twrnc` text-green-600`,
                      { fontFamily: "Mont-Regular" },
                    ]}
                  >
                    2.800 RSD
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Cancellation */}
        <View style={twrnc`bg-white p-4 mx-2 mb-4 rounded-xl shadow`}>
          <Text
            style={[
              twrnc` text-lg font-bold mb-2`,
              { fontFamily: "Mont-Bold" },
            ]}
          >
            Uslovi korišćenja
          </Text>
          <View style={twrnc`flex-row items-start mb-2`}>
            <Icon
              name="checkmark-circle-outline"
              size={18}
              color="#22C55E"
              style={twrnc`mt-1 mr-2`}
            />
            <Text
              style={[
                twrnc` flex-1 text-gray-700`,
                { fontFamily: "Mont-Regular" },
              ]}
            >
              Besplatno otkazivanje do 2 sata pre termina
            </Text>
          </View>
          <View style={twrnc`flex-row items-start mb-2`}>
            <Icon
              name="checkmark-circle-outline"
              size={18}
              color="#22C55E"
              style={twrnc`mt-1 mr-2`}
            />
            <Text
              style={[
                twrnc` flex-1 text-gray-700`,
                { fontFamily: "Mont-Regular" },
              ]}
            >
              Garancija na sve izvršene radove
            </Text>
          </View>
          <View style={twrnc`flex-row items-start`}>
            <Icon
              name="checkmark-circle-outline"
              size={18}
              color="#22C55E"
              style={twrnc`mt-1 mr-2`}
            />
            <Text
              style={[
                twrnc` flex-1 text-gray-700`,
                { fontFamily: "Mont-Regular" },
              ]}
            >
              Besplatna procena za složenije radove
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View
        style={twrnc`px-4 py-4 bg-white border-t border-gray-200 flex-row justify-between items-center`}
      >
        <View>
          <Text
            style={[
              twrnc` text-2xl font-bold text-green-600`,
              { fontFamily: "Mont-Bold" },
            ]}
          >
            2.500 RSD
          </Text>
          <Text style={[twrnc` text-gray-500`, { fontFamily: "Mont-Regular" }]}>
            Početna cena (PDV uključen)
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowConfirmation(true)}
          style={twrnc`bg-blue-500 rounded-xl px-6 py-3`}
        >
          <Text
            style={[
              twrnc` text-white text-base font-medium`,
              { fontFamily: "Mont-Medium" },
            ]}
          >
            Zakaži sad
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal visible={showCalendar} transparent={true} animationType="fade">
        <View
          style={twrnc`flex-1 bg-black bg-opacity-50 justify-end items-center`}
        >
          <View style={twrnc`bg-white w-full rounded-xl p-6 pb-10`}>
            <View style={twrnc`flex-row justify-between items-center mb-4`}>
              <Text
                style={[twrnc` text-lg font-bold`, { fontFamily: "Mont-Bold" }]}
              >
                Izaberite datum
              </Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <CalendarPicker
              onDateChange={odaberiKalendarskiDatum}
              minDate={new Date()}
              selectedDayColor="#3B82F6"
              selectedDayTextColor="#FFFFFF"
              previousTitle="Prethodni"
              textStyle={{ fontFamily: "Mont-Regular" }}
              nextTitle="Sledeći"
              weekdays={["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"]}
              months={[
                "Januar",
                "Februar",
                "Mart",
                "April",
                "Maj",
                "Jun",
                "Jul",
                "Avgust",
                "Septembar",
                "Oktobar",
                "Novembar",
                "Decembar",
              ]}
            />

            <TouchableOpacity
              style={twrnc`bg-blue-500 rounded-xl p-4 mt-4 items-center`}
              onPress={() => setShowCalendar(false)}
            >
              <Text
                style={[
                  twrnc` text-white font-medium`,
                  { fontFamily: "Mont-Medium" },
                ]}
              >
                Potvrdi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fullscreen Map */}
      <Modal visible={openMap} transparent={true} animationType="fade">
        <View
          style={twrnc`flex-1 bg-black bg-opacity-50 justify-end items-center`}
        >
          <View style={twrnc`bg-white w-full rounded-xl pb-10 overflow-hidden`}>
            <View style={twrnc`h-[400px] overflow-hidden`}>
              <MapView
                onPress={() => setOpenMap(true)}
                zoomControlEnabled={false}
                style={twrnc`flex-1`}
                initialRegion={majstorLokacija}
              >
                <Marker
                  coordinate={{
                    latitude: majstorLokacija.latitude,
                    longitude: majstorLokacija.longitude,
                  }}
                  title="Milan Petrović"
                  description="Dostupan"
                >
                  <View style={twrnc`bg-green-500 p-2 rounded-full`}>
                    <Icon name="person" size={16} color="#00" />
                  </View>
                </Marker>
              </MapView>
            </View>

            <TouchableOpacity
              style={twrnc`bg-gray-100 rounded-xl p-4 mt-4 items-center mx-4`}
              onPress={() => setOpenMap(false)}
            >
              <Text
                style={[
                  twrnc` text-black font-medium`,
                  { fontFamily: "Mont-Medium" },
                ]}
              >
                Otkaži
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Order Confirmation */}
      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="slide"
      >
        <View
          style={twrnc`flex-1 bg-black bg-opacity-50 justify-end items-center`}
        >
          <View style={twrnc`bg-white w-full rounded-xl p-6 pb-10`}>
            <View style={twrnc`flex-row justify-center items-center mb-4`}>
              <Text
                style={[
                  twrnc` text-2xl text-center font-bold`,
                  { fontFamily: "Mont-Bold" },
                ]}
              >
                Potvrda
              </Text>
            </View>

            <View style={[twrnc`w-full flex items-center`]}>
              <Text
                style={[twrnc`text-[16px]`, { fontFamily: "Mont-Regular" }]}
              >
                Milan Petrović
              </Text>
              <Text
                style={[twrnc`text-[16px]`, { fontFamily: "Mont-Regular" }]}
              >
                4 Juni bb, Pale
              </Text>
              <Text style={[twrnc`text-[16px]`, { fontFamily: "Mont-Bold" }]}>
                u 11:30, {formatirajDatum(selectedDate)}
              </Text>
            </View>

            <TouchableOpacity
              style={twrnc`bg-blue-500 rounded-xl p-4 mt-4 items-center`}
              onPress={() => {
                setPaymentView(true)
                setShowConfirmation(false)
              }}
            >
              <Text
                style={[
                  twrnc` text-white font-medium`,
                  { fontFamily: "Mont-Medium" },
                ]}
              >
                Potvrdi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={twrnc`bg-gray-100 rounded-xl p-4 mt-4 items-center`}
              onPress={() => setShowConfirmation(false)}
            >
              <Text
                style={[
                  twrnc` text-black font-medium`,
                  { fontFamily: "Mont-Medium" },
                ]}
              >
                Otkaži
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Choose Payment */}
      <Modal visible={paymentView} transparent={true} animationType="fade">
        <View
          style={twrnc`flex-1 bg-black bg-opacity-50 justify-end items-center`}
        >
          <View style={twrnc`bg-white w-full rounded-xl pb-10 overflow-hidden`}>


            <View style={[ twrnc`px-4 pt-4 flex gap-4` ]}>
                {
                  ["PayPal", "Kartica", "Gotovina"].map((paymentMethod) => {
                    return (
                      <View key={paymentMethod} style={[ twrnc`p-5 rounded-lg border border-gray-100 flex flex-row items-center gap-4` ]}>
                        <View>
                          <Icon name={`${paymentMethod === "Gotovina" ? "checkmark-circle" : "checkmark-circle-outline"}`} style={[ twrnc`text-blue-500` ]} size={22} />
                        </View>
                        <Text style={[ twrnc`text-[16px]`, { fontFamily: 'Mont-Medium' } ]}>{paymentMethod}</Text>
                      </View>
                    )
                  })
                }
            </View>

            <TouchableOpacity
              style={twrnc`bg-blue-500 rounded-xl p-4 mt-4 items-center mx-4`}
              onPress={() => setPaymentView(false)}
            >
              <Text
                style={[
                  twrnc` text-white font-medium`,
                  { fontFamily: "Mont-Medium" },
                ]}
              >
                Otkaži
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={twrnc`bg-gray-100 rounded-xl p-4 mt-4 items-center mx-4`}
              onPress={() => setPaymentView(false)}
            >
              <Text
                style={[
                  twrnc` text-black font-medium`,
                  { fontFamily: "Mont-Medium" },
                ]}
              >
                Otkaži
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WorkerScreen;
