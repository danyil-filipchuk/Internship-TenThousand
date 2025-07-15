import {StyleSheet, Text, TouchableOpacity} from "react-native";
import { useTheme } from "../../theme-context"

export function ButtonSaveTask({ onPress }) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity style={[styles.button, {
            backgroundColor: theme.ButtonSaveTaskBackgroundColor,
            shadowColor: theme.ButtonSaveTaskShadowColor,
        }]}
                          onPress={onPress}
        >
            <Text style={[styles.buttonText, {color: theme.ButtonSaveTaskTextColor}]}>save task</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 24,
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        fontSize: 24,
        letterSpacing: 1,
        fontFamily: 'Montserrat-Regular'
    },
})