import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Alert,
  CheckBox,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomFonts from "../components/CustomFonts";
import { setTasks, setTaskID } from "../redux/actions";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function Todo({ navigation }) {
  const { tasks } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    JoseFinLight: require("../assets/fonts/JosefinSans-ExtraLight.ttf"),
    JoseFin: require("../assets/fonts/JosefinSans-Bold.ttf"),
    DancingScript: require("../assets/fonts/DancingScript-Regular.ttf"),
  });

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    AsyncStorage.getItem("TASKS")
      .then((tasks) => {
        const parsedTask = JSON.parse(tasks);
        if (parsedTask && typeof parsedTask === "object") {
          dispatch(setTasks(parsedTask));
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteTask = (id) => {
    const filteredTask = tasks.filter((task) => task.ID !== id);
    AsyncStorage.setItem("TASKS", JSON.stringify(filteredTask))
      .then(() => {
        if (filteredTask) {
          dispatch(setTasks(filteredTask));
          // Alert.alert("Success", "Task removed successfully");
        }
      })
      .catch((err) => console.log(err));
  };

  const checkTask = (id, newValue) => {
    const index = tasks.findIndex((task) => task.ID === id);
    let newTask = [];
    if (index > -1) {
      newTask = [...tasks];
      newTask[index].Done = newValue;

      AsyncStorage.setItem("TASKS", JSON.stringify(newTask))
        .then(() => {
          dispatch(setTasks(newTask));
          Alert.alert("Success", "Task state is changed !");
        })
        .catch((error) => console.log(error));
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.body}>
        <FlatList
          data={tasks.filter(task=>task.Done === true)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                dispatch(setTaskID(item.ID));
                navigation.navigate("Task");
              }}
            >
              <View style={styles.item_row}>
                <CheckBox
                  value={item.Done}
                  onValueChange={(newValue) => checkTask(item.ID, newValue)}
                />
                <View style={styles.item_body}>
                  <Text
                    style={{
                      // fontWeight: "bold",
                      fontSize: 18,
                      fontFamily: "JoseFin",
                    }}
                  >
                    {item.Title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "DancingScript",
                    }}
                    numberOfLines={2}
                  >
                    {item.Desc}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Delete",
                      "Are you sure to delete this task ?",
                      [
                        {
                          text: "cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "delete",
                          onPress: () => deleteTask(item.ID),
                          style: "destructive",
                        },
                      ]
                    )
                  }
                >
                  <FontAwesome5 name={"trash"} size={20} color={"#ff3636"} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // alignItems: "center",
    // // backgroundColor: "#0080ff",
    // justifyContent: "center",
  },

  item: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
  },
  item_row: {
    flexDirection: "row",
    alignItems: "center",
  },
  item_body: {
    flex: 1,
  },
});
