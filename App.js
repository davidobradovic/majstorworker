// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import { Ionicons } from '@expo/vector-icons';
// import HomeScreen from "./screens/HomeScreen";
// import SearchScreen from "./screens/SearchScreen";
// import BookingScreen from "./screens/BookingScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import HomeStack from "./stack/HomeStack";
// import MessagesScreen from "./screens/MessagesScreen";
// import ChatsScreen from "./screens/chat/ChatsScreen";

// export default function App() {
//   const Tab = createBottomTabNavigator();

//   return (
//     <NavigationContainer>
//       <Tab.Navigator 
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarStyle: {
//             elevation: 0,
//             shadowOffset: 1,
//             shadowOpacity: 0.05,
//             paddingTop: 5,
//             borderTopWidth: 0,
//           },
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === "Home") {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === "Kalendar") {
//               iconName = focused ? 'calendar' : 'calendar-outline';
//             } else if (route.name === "Poruke") {
//               iconName = focused ? 'mail' : 'mail-outline';
//             } else if (route.name === "Nalog") {
//               iconName = focused ? 'person' : 'person-outline';
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#0066cc',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Home" options={{ title: "Početna" }} component={HomeStack} />
//         <Tab.Screen name="Kalendar" component={BookingScreen} />
//         <Tab.Screen name="Poruke" component={ChatsScreen} />
//         <Tab.Screen name="Nalog" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthedStack from "./AuthedStack";
import AuthStack from "./AuthStack";
import AuthProvider from "./context/AuthContext";
import ProfileUpdate from "./screens/client/ProfileUpdate";
// import InviteFriends from "./screens/client/InviteFirends";
// import Addresses from "./screens/client/Addresses";
// import ChatScreen from "./screens/ChatScreen";

      // {/* <AuthProvider>
      //   <Stack.Navigator screenOptions={{ headerShown: false }}>
      //     <Stack.Screen name="Auth" component={AuthStack} />
      //     <Stack.Screen name="Authed" component={AuthedStack} />
      //     <Stack.Screen name="EditProfile" component={ProfileUpdate} />
      //     {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
      //     </Stack.Navigator>
      //     </AuthProvider> */}

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Authed" component={AuthedStack} />
        <Stack.Screen name="EditProfile" component={ProfileUpdate} />
        {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
