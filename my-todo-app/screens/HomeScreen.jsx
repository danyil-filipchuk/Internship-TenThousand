import { View, SafeAreaView } from "react-native";
import { ButtonAddNewTask } from "../components/ButtonAddNewTask";
import {TaskList} from "../components/TaskList";
import {NoInternetBanner} from "../components/NoInternetBanner";

export function HomeScreen({ navigation, tasks, removeTask, completeTask }) {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NoInternetBanner/>
            <TaskList
                tasks={tasks}
                removeTask={removeTask}
                completeTask={completeTask}
            />
            <View>
                <ButtonAddNewTask onPress={() => navigation.navigate('AddTask')}/>
            </View>
        </SafeAreaView>
    );
}