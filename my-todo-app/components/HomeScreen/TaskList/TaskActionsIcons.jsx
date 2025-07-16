import { StyleSheet, TouchableOpacity, View } from "react-native";
import IconComplete from "../../../assets/images/IconComplete.svg";
import IconDelete from "../../../assets/images/IconDelete.svg";

export function TaskActionsIcons({ onComplete, onDelete }) {
    return (
        <View style={ styles.taskActions }>
            <TouchableOpacity onPress={onComplete}>
                <IconComplete style={{ marginLeft:5 }}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
                <IconDelete style={{ marginLeft:5 }}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    taskActions: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})