import IconCopy from "../../../assets/images/IconCopy.svg";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { showMessage } from "react-native-flash-message";
import {useTheme} from "../../../theme/theme-context";

export function CopyIconButton({ text }) {
    const { theme } = useTheme();

    const onCopy = async () => {
        await Clipboard.setStringAsync(text);

        showMessage({
            message: 'Copied!',
            type: 'info',
        });
    }

    return (
        <TouchableOpacity onPress={onCopy}>
            <IconCopy style={ styles.iconCopy } color={ theme.IconColor }/>
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