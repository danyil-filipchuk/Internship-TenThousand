import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export function StartOnboardingBlock({ navigation }) {

    return (
        <TouchableOpacity
            style={styles.onboardingButton}
            onPress={() => navigation.navigate('Onboarding')}
        >
            <Text style={styles.onboardingButtonText}>
                start onboarding
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    onboardingButton: {
        backgroundColor: '#4F8EF7',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginBottom: 16,
    },
    onboardingButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    }
})