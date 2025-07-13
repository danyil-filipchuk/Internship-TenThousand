import IconCopy from "../../assets/images/IconCopy.svg";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { showMessage } from "react-native-flash-message";

export function CopyIconButton({ text }) {

    const onCopy = async () => {
        await Clipboard.setStringAsync(text);

        showMessage({
            message: 'Copied!',
            type: 'info',
        });
    }

    return (
        <TouchableOpacity onPress={onCopy}>
            <IconCopy style={ styles.iconCopy }/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconCopy: {
        top: 10,
        marginLeft: 5,
        position: 'relative'
    }
})