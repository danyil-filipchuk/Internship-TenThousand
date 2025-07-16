import {StyleSheet, TextInput} from "react-native";
import {useTheme} from "../../theme/theme-context";

export function TaskInput( props ) {
    const { theme } = useTheme();

    return (
        <TextInput
            {...props}
            placeholder='enter task...'
            autoFocus
            returnKeyType='done'
            placeholderTextColor={theme.TaskInputPlaceholderColor}
            style={[styles.input, {
                color: theme.TaskInputColor,
                borderColor: theme.TaskInputBorderColor,
                backgroundColor: theme.TaskInputBackgroundColor}]}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 12,
        padding: 8,
        fontFamily: 'Montserrat-Regular',
    }
})