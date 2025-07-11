import { View, SafeAreaView } from "react-native";
import { ButtonOnHomeScreen } from "../components/ButtonOnHomeScreen";
import {TaskList} from "../components/TaskList";

export function HomeScreen({ navigation, tasks, removeTask, completeTask }) {

    return (
        <SafeAreaView style={{flex: 1}}>
            <TaskList
                tasks={tasks}
                removeTask={removeTask}
                completeTask={completeTask}
            />
            <View>
                <ButtonOnHomeScreen onPress={() => navigation.navigate('AddTask')}/>
            </View>
        </SafeAreaView>
    );
}