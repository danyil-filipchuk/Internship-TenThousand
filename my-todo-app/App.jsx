import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import fonts from "./assets/fonts/fonts";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { AddTaskScreen } from './screens/AddTaskScreen';
import { useState, useEffect } from "react";
import { loadTasksFromStorage, saveTasksToStorage } from './utils/Storage';
import FlashMessage, { showMessage } from "react-native-flash-message";

const Stack = createNativeStackNavigator();

export default function App() {
    const [tasks, setTasks, ] = useState([]);
    const [fontsLoaded] = useFonts(fonts);

    useEffect(() => {
        (async () => {
            const storedTasks = await loadTasksFromStorage();
            setTasks(storedTasks);
        })();
    },[]);

    useEffect(() => {
        saveTasksToStorage(tasks).catch(error => console.log('Error saving tasks:', error));
    }, [tasks]);

    const addTask = (task) => {
        setTasks(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                text: task.text,
                completed: false,
                deadline: task.deadline,
                contact: task.contact,
                location: task.location,
            }
        ]);
    }

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));

        showMessage({
            message: 'task deleted',
            type: 'danger',
        });
    }

    const completeTask = (id) => {
        setTasks(prev => {
            const updatedTasks = prev.map(task =>
                task.id === id ? {...task, completed: !task.completed} : task
            );

            const wasCompleted = tasks.find(task => task.id === id)?.completed;

            if(!wasCompleted) {
                showMessage({
                    message: 'task completed',
                    type: 'success',
                })
            }
            return updatedTasks;
        });
    }

  return (
      <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen
                      name='Home'
                      options={{
                          title: 'my tasks',
                          headerTitleStyle: {
                              fontSize: 19,
                              fontFamily: 'Montserrat-SemiBold',
                          },
                  }}
                  >
                      {props => <HomeScreen
                          {...props}
                          tasks={tasks}
                          deleteTask={deleteTask}
                          completeTask={completeTask}
                      />}
                  </Stack.Screen>
                  <Stack.Screen
                      name='AddTask'
                      options={{
                          title: 'add new task',
                          headerTitleStyle: {
                              fontSize: 19,
                              fontFamily: 'Montserrat-SemiBold',
                          },
                          headerBackTitleStyle: {
                              fontSize: 18,
                              fontFamily: 'Montserrat-Regular',
                          },
                  }}
                  >
                      {props => <AddTaskScreen {...props} addTask={addTask} />}
                  </Stack.Screen>
              </Stack.Navigator>
          </NavigationContainer>
          <FlashMessage position='center' />
      </GestureHandlerRootView>
  );
}
