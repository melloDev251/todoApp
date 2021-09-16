import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Todo from "./screens/Todo";
import Done from "./screens/Done";
import Splash from "./screens/Splash";
import Task from "./screens/Task";
import {Store} from "./redux/store";
import { Provider } from "react-redux";

const RootStack = createStackNavigator();

const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "ToDo") {
            iconName = "clipboard-list";
            size = focused ? 25 : 20;
          } else if (route.name === "Done") {
            iconName = "clipboard-check";
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0080ff",
        tabBarInactiveTintColor: "#777777",
        tabBarLabelStyle: { fontSize: 17, fontWeight: "bold" },
      })}
    >
      <Tab.Screen
        name={"ToDo"}
        component={Todo}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={"Done"}
        component={Done}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#0080ff",
            },
            headerTintColor: "#fff",
            headerTitleStyle: { fontSize: 25, fontWeight: "bold" },
          }}
        >
          <RootStack.Screen name="Task" component={Task} />
          <RootStack.Screen name="Splash" component={Splash} />
          <RootStack.Screen name="My Tasks" component={HomeTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
