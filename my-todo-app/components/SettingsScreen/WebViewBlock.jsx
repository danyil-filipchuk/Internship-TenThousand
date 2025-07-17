import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useTheme } from "../../theme/theme-context"
import { useTranslation } from "react-i18next";


export function WebViewBlock({ navigation }) {
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={[styles.webViewBlock ,{
            borderColor: theme.SettingsScreenCardsBorderColor,
            shadowColor: theme.SettingsScreenCardsShadowColor,
        }]}>
            <Text style={[styles.webViewText, {color: theme.SettingsScreenCardsLabelColor}]}>
                {t('DetailedCodeOfThisProject')}
            </Text>
            <TouchableOpacity
                style={[styles.webViewButton, {backgroundColor: theme.WebViewButtonBackgroundColor}]}
                onPress={() => navigation.navigate('GitHubWindow')}
            >
                <Text style={[styles.webViewButtonText, {color: theme.WebViewButtonTextColor}]}>
                    {t('ViewOnGitHub')}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    webViewBlock: {
        width: '94%',
        alignItems: 'center',
        padding: 18,
        borderRadius: 14,
        borderWidth: 1.5,
        marginBottom: 20,
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
})