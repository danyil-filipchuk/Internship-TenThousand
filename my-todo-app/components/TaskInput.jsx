import {StyleSheet, TextInput} from "react-native";

export function TaskInput( props ) {
    return (
        <TextInput
            {...props}
            placeholder='enter task...'
            autoFocus
            returnKeyType='done'
            style={ styles.input }
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 20,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontFamily: 'Montserrat-Regular',
        color: '#222',
        backgroundColor: "#fafbff",
    }
})