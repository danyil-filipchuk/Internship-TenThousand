import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import { ShareTask } from "./ShareTask";
import {TaskInfo} from "./TaskInfo";

export function BottomSheet({ modalizeRef, selectedTask, handleCloseSheet, stopModalize }) {

    return (
        <Modalize
            ref={modalizeRef}
            adjustToContentHeight
            onClose={handleCloseSheet}
        >
            <View style={ styles.sheet }>

                <ShareTask selectedTask={selectedTask} />

                <TaskInfo selectedTask={selectedTask} />

                <TouchableOpacity onPress={stopModalize}>
                    <Text style={ styles.close }>Close</Text>
                </TouchableOpacity>

            </View>
        </Modalize>
    );
}

const styles = StyleSheet.create({
    sheet: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 22,
        alignItems: "stretch",
        backgroundColor: "#fff",
        borderColor: "#E6ECF9",
        borderWidth: 1.5,
        shadowColor: "#4F8EF7",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 3,
    },
    close: {
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 25,
        backgroundColor: '#e7f0ff',
        borderRadius: 6,
        shadowColor: "#4F8EF7",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        elevation: 2,
        color: "#2F326B",
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: 0.5,
        textAlign: 'center'
    },
});

