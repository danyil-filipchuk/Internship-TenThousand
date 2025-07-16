import {StatusBar } from "react-native";
import {useTheme} from "./theme/theme-context";

export function ThemedStatusBar() {
    const { themeName, theme} = useTheme();
    return (
            <StatusBar
                barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={theme.HeaderBackgroundColor}
                animated={true}
                translucent={false}
            />
    );
}
