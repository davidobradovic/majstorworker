import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import BookingScreen from "./screens/BookingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeStack from "./stack/HomeStack";
import MessagesScreen from "./screens/MessagesScreen";

export default function AuthedStack() {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            elevation: 0,
            shadowOffset: 1,
            shadowOpacity: 0.05,
            paddingTop: 5,
            borderTopWidth: 0,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === "Booking") {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === "Messages") {
              iconName = focused ? 'mail' : 'mail-outline';
            } else if (route.name === "Profile") {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0066cc',
          tabBarInactiveTintColor: 'gray',
          tabBarIconStyle: {
            marginBottom: 3
          }
        })}
      >
        <Tab.Screen name="Home" options={{ title: "Početna" }} component={HomeStack} />
        <Tab.Screen name="Booking" options={{ title: "Zakazivanja" }} component={BookingScreen} />
        <Tab.Screen name="Messages" options={{ title: "Dopisivanja" }} component={MessagesScreen} />
        <Tab.Screen name="Profile" options={{ title: "Profil" }} component={ProfileScreen} />
      </Tab.Navigator>
  );
}