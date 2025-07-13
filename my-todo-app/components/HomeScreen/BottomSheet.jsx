import { Modalize } from 'react-native-modalize';
import { Text, View, StyleSheet } from "react-native";

export function BottomSheet({ modalizeRef, handleClose, selectedTask }) {
    return (
        <Modalize ref={modalizeRef} adjustToContentHeight>
            <View style={ styles.bottomSheet }>
                <Text style={ styles.text }>
                    {selectedTask && selectedTask.deadline
                        ? `Deadline: ${new Date(selectedTask.deadline).toLocaleDateString()}`
                        : 'No deadline'}
                </Text>
                <Text
                    style={ styles.closeButton }
                    onPress={handleClose}
                >
                    Close
                </Text>
            </View>
        </Modalize>
    )
}

const styles = StyleSheet.create({
    bottomSheet: {
        padding: 24,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        marginBottom: 12,
        textAlign: 'center'
    },
    closeButton: {
        color: "#4F8EF7",
        marginTop: 12
    }
})