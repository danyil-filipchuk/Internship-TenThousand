import {StyleSheet, Text, TouchableOpacity} from "react-native";

export function ButtonSaveTask({ onPress }) {
    return (
        <TouchableOpacity style={ styles.button } onPress={onPress}>
            <Text style={ styles.buttonText }>save task</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4F8EF7",
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'Montserrat-SemiBold',
    },
})