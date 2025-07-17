import React, { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import { SectionList, StyleSheet, Text, View }  from "react-native";
import { useTheme } from "../../theme/theme-context"
import { useTranslation } from 'react-i18next';

export function DeviceInfoBlock() {
    const [sections, setSections] = useState([]);
    const { theme } = useTheme();
    const { t } = useTranslation();

    useEffect(() => {
        (async () => {
            const deviceInfo = {
                brand: Device.brand,
                modelName: Device.modelName,
                deviceYearClass: Device.deviceYearClass,
                osName: Device.osName,
                osVersion: Device.osVersion,
                manufacturer: Device.manufacturer,
                isDevice: Device.isDevice ? 'Yes' : 'No',
                supportedCpuArchitectures: Device.supportedCpuArchitectures?.join(', '),
                uptime: await Device.getUptimeAsync(),
            };

            setSections([
                {
                    title: t('DeviceInfo'),
                    data: [
                        {label: 'Brand', value: deviceInfo.brand},
                        {label: 'Model', value: deviceInfo.modelName},
                        {label: 'Year', value: deviceInfo.deviceYearClass},
                        {label: 'Manufacturer', value: deviceInfo.manufacturer},
                    ]
                },
                {
                    title: t('SystemInfo'),
                    data: [
                        { label: 'OS', value: `${deviceInfo.osName} ${deviceInfo.osVersion}` },
                        { label: 'Is real device', value: deviceInfo.isDevice },
                        { label: 'CPU', value: deviceInfo.supportedCpuArchitectures },
                        { label: 'Uptime', value: `${deviceInfo.uptime.toFixed()} sec` },
                    ]
                },
            ]);
        })();
    }, [t]);

    return (
        <View style={[styles.deviceInfoBlock, {
            borderColor: theme.SettingsScreenCardsBorderColor,
            shadowColor: theme.SettingsScreenCardsShadowColor,}
        ]}>
            <SectionList
                sections={sections}
                keyExtractor={( item, index ) => index.toString()}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={ styles.sectionBlock }>
                        <Text style={[styles.header, {color: theme.SettingsScreenCardsLabelColor}]}>
                            {title}
                        </Text>
                    </View>
                )}
                renderItem={({ item, section, index }) => (
                    <View style={[
                        styles.infoBlock,
                        index === 0 ? styles.firstInfoBlock : {},
                        index === section.data.length - 1 ? styles.lastInfoBlock : {},
                    ]}>
                        <Text style={[styles.label, {color: theme.DeviceInfoLabelColor}]}>{item.label}:</Text>
                        <Text style={[styles.value, {color: theme.DeviceInfoValueColor}]}>{item.value}</Text>
                    </View>
                )}
                SectionSeparatorComponent={() => <View style={{ height: 18 }} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    deviceInfoBlock: {
        width: '94%',
        borderRadius: 14,
        padding: 18,
        borderWidth: 1.5,
        alignSelf: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 3,
    },
    sectionBlock: {
        width: 320,
        alignSelf: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-SemiBold',
    },
    infoBlock: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
        width: 320,
        alignSelf: 'center',
    },
    label: {
        fontSize: 19,
        minWidth: 130,
        fontFamily: 'Montserrat-Regular',
    },
    value: {
        fontSize: 19,
        marginLeft: 5,
        fontFamily: 'Montserrat-Medium',
        flexWrap: 'wrap',
    },
});
