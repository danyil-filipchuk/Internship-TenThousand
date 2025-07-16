import React from 'react';
import { useTheme } from "../theme/theme-context";
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View, Switch } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { DeviceInfo } from "../components/SettingsScreen/DeviceInfo";
import i18n from '../localization/localization';
import { useTranslation } from 'react-i18next';

export function SettingsScreen({ navigation }) {
    const { theme, themeName, toggleTheme } = useTheme();
    const { t } = useTranslation();

    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={theme.LinearGradientBackgroundColor}
        >
            <SafeAreaView style={ styles.container }>
                <View style={ styles.bottomBlocks }>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontSize: 18, marginRight: 10 }}>Language:</Text>
                        <TouchableOpacity onPress={() => i18n.changeLanguage('en')}>
                            <Text style={{
                                fontWeight: i18n.language === 'en' ? 'bold' : 'normal',
                                color: i18n.language === 'en' ? '#4F8EF7' : '#888',
                                marginRight: 16
                            }}>EN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => i18n.changeLanguage('ua')}>
                            <Text style={{
                                fontWeight: i18n.language === 'ua' ? 'bold' : 'normal',
                                color: i18n.language === 'ua' ? '#4F8EF7' : '#888'
                            }}>UA</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 80 }}>
                        <Text style={{ fontSize: 18, marginRight: 10 }}>
                            {themeName === 'light' ? 'Light Theme' : 'Dark Theme'}
                        </Text>
                        <Switch
                            value={themeName === 'dark'}
                            onValueChange={toggleTheme}
                        />
                    </View>

                    <View style={[styles.webViewBlock ,{
                        borderColor: theme.WebViewBlockBorderColor,
                        backgroundColor: theme.WebViewBlockBackgroundColor,
                        shadowColor: theme.WebViewBlockShadowColor,
                    }]}>
                        <Text style={[styles.webViewText, {color: theme.WebViewTextColor}]}>
                            {t('DetailedCodeOfThisProject')}
                        </Text>
                        <TouchableOpacity
                            style={[styles.webViewButton, {backgroundColor: theme.WebViewButtonBackgroundColor}]}
                            onPress={() => navigation.navigate('ProjectWebView')}
                        >
                            <Text style={[styles.webViewButtonText, {color: theme.WebViewButtonTextColor}]}>
                                {t('ViewOnGitHub')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.deviceInfoBlock, {
                            borderColor: theme.DeviceInfoBorderColor,
                            backgroundColor: theme.DeviceInfoBackgroundColor,
                            shadowColor: theme.DeviceInfoShadowColor,}
                    ]}>
                        <DeviceInfo />
                    </View>
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
    deviceInfoBlock: {
        width: '94%',
        borderRadius: 14,
        padding: 20,
        borderWidth: 1.5,
        alignSelf: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 3,
    },
    webViewBlock: {
        width: '94%',
        alignItems: 'center',
        padding: 20,
        borderRadius: 14,
        borderWidth: 1.5,
        marginBottom: 16,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 3,
    },
    webViewText: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
    webViewButton: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginBottom: 4,
    },
    webViewButtonText: {
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: 0.3,
    },
});
