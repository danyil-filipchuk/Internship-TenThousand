import React from "react";
import { Switch, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import i18n from "../../localization/localization";
import { useTheme } from "../../theme/theme-context";
import { useTranslation } from 'react-i18next';

import { observer } from "mobx-react-lite";
import { languageStore } from "../../localization/languageStore"

export const LanguageWithThemeBlock = observer(() => {
    const { theme, themeName, toggleTheme } = useTheme();
    const { t } = useTranslation();

    const handleLanguageChange = (lang) => {
        languageStore.setLanguage(lang);
        i18n.changeLanguage(lang); // щоб переклади одразу працювали
    };

    return (
        <View style={[
            styles.languageWithThemeBlock,
            {
                borderColor: theme.SettingsScreenCardsBorderColor,
                shadowColor: theme.SettingsScreenCardsShadowColor,
            }
        ]}>
            <View style={styles.switchesRow}>
                <View style={styles.half}>
                    <Text style={[styles.label, {
                        color: theme.SettingsScreenCardsLabelColor}
                    ]}>
                        {t('Language')}
                    </Text>
                    <View style={styles.langSwitchRow}>
                        <TouchableOpacity onPress={() => handleLanguageChange('en')}>
                            <Text style={[
                                styles.langButton,
                                {
                                    color: languageStore.language === 'en' ? '#4F8EF7' : '#888',
                                    fontWeight: languageStore.language === 'en' ? 'bold' : 'normal'
                                }
                            ]}>EN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleLanguageChange('ua')}>
                            <Text style={[
                                styles.langButton,
                                {
                                    color: languageStore.language === 'ua' ? '#4F8EF7' : '#888',
                                    fontWeight: languageStore.language === 'ua' ? 'bold' : 'normal'
                                }
                            ]}>UA</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={ styles.divider } />

                <View style={ styles.half }>
                    <Text style={[
                        styles.label,
                        {color: theme.SettingsScreenCardsLabelColor}
                    ]}>
                        {themeName === 'light'
                            ? t('LightTheme')
                            : t('DarkTheme')
                        }
                    </Text>
                    <View style={{ transform: [{ scale: 0.8 }]}}>
                        <Switch
                            value={themeName === 'dark'}
                            onValueChange={toggleTheme}
                            thumbColor={themeName === 'dark' ? theme.SwitchThumbOn : theme.SwitchThumbOff}
                            trackColor={{
                                false: theme.SwitchTrackOff,
                                true: theme.SwitchTrackOn,
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    languageWithThemeBlock: {
        width: '94%',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 14,
        borderWidth: 1.5,
        padding: 18,
        marginBottom: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 3,
    },
    switchesRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    half: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 6,
    },
    langSwitchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginTop: 5,
    },
    langButton: {
        fontSize: 20,
    },
    divider: {
        width: 2,
        height: '90%',
        backgroundColor: '#aaa',
        alignSelf: 'center'
    },
});
