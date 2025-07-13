import { View, SafeAreaView, Text } from "react-native";
import { ButtonAddNewTask } from "../components/HomeScreen/ButtonAddNewTask";
import {TaskList} from "../components/HomeScreen/TaskList";
import {NoInternetBanner} from "../components/HomeScreen/NoInternetBanner";
import { useState, useRef } from "react";
import {BottomSheet} from "../components/HomeScreen/BottomSheet";

export function HomeScreen({ navigation, tasks, deleteTask, completeTask }) {

    const modalizeRef = useRef(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const openSheet = (task) => {
        setSelectedTask(task);
        modalizeRef.current?.open();
    };

    const handleClose = () => {
        setSelectedTask(null);
        modalizeRef.current?.close();
    };

    return (
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
                handleClose={handleClose}
                modalizeRef={modalizeRef}
            />
        </SafeAreaView>
    );
}