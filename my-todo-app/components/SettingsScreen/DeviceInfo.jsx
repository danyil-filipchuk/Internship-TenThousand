import React, { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import { SectionList, StyleSheet, Text, View }  from "react-native";
import { useTheme } from "../../theme-context"

export function DeviceInfo() {
    const [sections, setSections] = useState([]);
    const { theme } = useTheme();

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
                    title: 'Device Info',
                    data: [
                        {label: 'Brand', value: deviceInfo.brand},
                        {label: 'Model', value: deviceInfo.modelName},
                        {label: 'Year', value: deviceInfo.deviceYearClass},
                        {label: 'Manufacturer', value: deviceInfo.manufacturer},
                    ]
                },
                {
                    title: 'System Info',
                    data: [
                        { label: 'OS', value: `${deviceInfo.osName} ${deviceInfo.osVersion}` },
                        { label: 'Is real device', value: deviceInfo.isDevice },
                        { label: 'CPU', value: deviceInfo.supportedCpuArchitectures },
                        { label: 'Uptime', value: `${deviceInfo.uptime.toFixed()} sec` },
                    ]
                },
            ]);
        })();
    }, []);

    return (
        <View style={ styles.wrapper }>
            <SectionList
                sections={sections}
                keyExtractor={( item, index ) => index.toString()}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={ styles.sectionBlock }>
                        <Text style={[styles.header, {color: theme.DeviceInfoHeaderColor}]}>{title}</Text>
                    </View>
                )}
                renderItem={({ item, section, index }) => (
                    <View style={[
                        styles.infoBlock,
                        index === 0 ? styles.firstInfoBlock : {},
                        index === section.data.length - 1 ? styles.lastInfoBlock : {},
                    ]}>
                        <Text style={[styles.label, {color: theme.DeviceInfoHLabelColor}]}>{item.label}:</Text>
                        <Text style={[styles.value, {color: theme.DeviceInfoValueColor}]}>{item.value}</Text>
                    </View>
                )}
                SectionSeparatorComponent={() => <View style={{ height: 18 }} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 'auto',
    },
    sectionBlock: {
        width: 320,
        alignSelf: 'center',
    },
    header: {
        fontSize: 20,
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
        fontSize: 17,
        minWidth: 120,
        fontFamily: 'Montserrat-Regular',
    },
    value: {
        fontSize: 17,
        marginLeft: 5,
        fontFamily: 'Montserrat-Medium',
        flexWrap: 'wrap',
    },
});
