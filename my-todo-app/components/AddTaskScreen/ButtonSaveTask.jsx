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
        marginTop: 24,
        backgroundColor: "#4F8EF7",
        paddingVertical: 10,
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
        fontSize: 24,
        letterSpacing: 1,
        fontFamily: 'Montserrat-Regular'
    },
})