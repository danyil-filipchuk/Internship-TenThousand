import { View, SafeAreaView, Text } from "react-native";
import { ButtonAddNewTask } from "../components/HomeScreen/ButtonAddNewTask";
import {TaskList} from "../components/HomeScreen/TaskList";
import {NoInternetBanner} from "../components/HomeScreen/NoInternetBanner";
import { useState, useRef, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export function HomeScreen({ navigation, tasks, deleteTask, completeTask }) {

    // Для BottomSheet
    const bottomSheetRef = useRef(null);
    const [selectedTask, setSelectedTask] = useState(null);

    // snapPoints - висота "аркуша"
    const snapPoints = useMemo(() => ['30%'], []);

    // Відкриття bottom sheet
    const openSheet = (task) => {
        setSelectedTask(task);
        bottomSheetRef.current?.expand();
    };

    // Закриття bottom sheet
    const handleClose = () => {
        setSelectedTask(null);
        bottomSheetRef.current?.close();
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
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                onClose={handleClose}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, marginBottom: 12, textAlign: 'center' }}>
                        {selectedTask ? selectedTask.text : 'No task'}
                    </Text>
                    {/* Тут поки просто кнопка Close, але можна додати будь-які інші дії */}
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: "#4F8EF7" }} onPress={handleClose}>
                            Close
                        </Text>
                    </View>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
}