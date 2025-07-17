import React from 'react';
import { useTheme } from "../theme/theme-context";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { DeviceInfoBlock } from "../components/SettingsScreen/DeviceInfoBlock";
import { LanguageWithThemeBlock } from "../components/SettingsScreen/LanguageWithThemeBlock";
import { WebViewBlock } from "../components/SettingsScreen/WebViewBlock";
import { StartOnboardingBlock } from "../components/SettingsScreen/StartOnboardingBlock";

export function SettingsScreen({ navigation }) {
    const { theme } = useTheme();

    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={theme.LinearGradientBackgroundColor}
        >
            <SafeAreaView style={ styles.container }>
                <View style={ styles.bottomBlocks }>

                    <StartOnboardingBlock navigation={navigation}/>

                    <LanguageWithThemeBlock />

                    <WebViewBlock navigation={navigation}/>

                    <DeviceInfoBlock />

                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    bottomBlocks: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});
