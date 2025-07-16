import { View, SafeAreaView } from "react-native";
import { TaskList } from "../components/HomeScreen/TaskList/TaskList";
import { BottomSheet } from "../components/HomeScreen/BottomSheet/BottomSheet";
import { ButtonAddNewTask } from "../components/HomeScreen/ButtonAddNewTask";
import { NoInternetBanner } from "../components/HomeScreen/NoInternetBanner";
import { useState, useRef } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from "../theme/theme-context";

export function HomeScreen({ navigation, tasks, deleteTask, completeTask }) {
    const modalizeRef = useRef(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const { theme } = useTheme();

    const openSheet = (task) => {
        setSelectedTask(task);
        modalizeRef.current?.open();
    };

    const stopModalize= () => {
        modalizeRef.current?.close();
    };

    const handleCloseSheet = () => {
        setSelectedTask(null);
    }

    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={theme.LinearGradientBackgroundColor}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <NoInternetBanner/>
                <TaskList
                    tasks={tasks}
                    deleteTask={deleteTask}
                    completeTask={completeTask}
                    openSheet={openSheet}
                />
                <View>
                    <ButtonAddNewTask onPress={() => navigation.navigate('AddTask')}/>
                </View>
                <BottomSheet
                    selectedTask={selectedTask}
                    modalizeRef={modalizeRef}
                    handleCloseSheet={handleCloseSheet}
                    stopModalize={stopModalize}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}