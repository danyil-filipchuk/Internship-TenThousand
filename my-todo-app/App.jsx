import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from "@react-native-masked-view/masked-view";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import {AddTaskScreen} from './screens/AddTaskScreen';
import {useState} from "react";

const Stack = createNativeStackNavigator();

export default function App() {
    const [tasks, setTasks, ] = useState([]);

    const addTask = (task) => {
        setTasks(prev => [...prev, task]);
    }

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                  name='Home'
                  options={{title: 'my tasks'}}
              >
                  {props => <HomeScreen {...props} tasks={tasks} />}
              </Stack.Screen>
              <Stack.Screen
                  name='AddTask'
                  options={{title: 'add new task'}}
              >
                  {props => <AddTaskScreen {...props} addTask={addTask} />}
              </Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
  );
}
