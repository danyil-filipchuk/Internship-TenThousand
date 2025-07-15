import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTasksToStorage = async (tasks) => {
    try {
        await AsyncStorage.setItem('TASKS', JSON.stringify(tasks));
    } catch (error) {
        console.log("Error saving tasks", error);
    }
}

export const loadTasksFromStorage = async () => {
    try {
        const stringTasks = await AsyncStorage.getItem('TASKS');
        if (stringTasks !== null) {
            return JSON.parse(stringTasks);
        }
        return [];
    } catch (error) {
        console.log("Error loading tasks", error);
        return [];
    }
}