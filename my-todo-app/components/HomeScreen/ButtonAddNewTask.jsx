import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function ButtonAddNewTask({ onPress }) {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.button} >
                <Text style={styles.buttonText}>add new task</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    button: {
        backgroundColor: "#4F8EF7",
        paddingVertical: 10,
        borderRadius: 16,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
        letterSpacing: 1,
        fontFamily: 'Montserrat-Regular'
    },
});