import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { View, Image, StyleSheet, Text } from 'react-native';

import CardTask from '../assets/images/onboarding/CardTask.png';
import Settings from '../assets/images/onboarding/Settings.png';
import BottomSheet from '../assets/images/onboarding/BottomSheet.png';
import AddNewTaskScreen from '../assets/images/onboarding/AddNewTaskScreen.png';

export function OnboardingScreen({ navigation }) {

    const FramedImage = ({ src }) => (
        <View style={styles.imageFrame}>
            <Image source={src} style={styles.image} />
        </View>
    );

    const renderTitle = (title) => (
        <Text style={styles.title}>{title}</Text>
    );

    const renderSubtitle = (subtitle) => (
        <Text style={styles.subtitle}>{subtitle}</Text>
    );

    return (
        <Onboarding
            onSkip={() => navigation.goBack()}
            onDone={() => navigation.goBack()}
            pages={[
                {
                    backgroundColor: '#161925',
                    image: <FramedImage src={CardTask} />,
                    title: renderTitle('Task Card'),
                    subtitle: renderSubtitle(
                        `Here you can:\n• View your task\n• Copy the task text\n• Mark the task as completed\n• Delete the task\n• Access additional options`
                    ),
                },
                {
                    backgroundColor: '#161925',
                    image: <FramedImage src={BottomSheet} />,
                    title: renderTitle('Task Details'),
                    subtitle: renderSubtitle(
                        `Tap on a task to view more details:\n• Deadline\n• Location\n• Contact\n• Photo attached to the task\n• Ability to share the task`
                    ),
                },
                {
                    backgroundColor: '#161925',
                    image: <FramedImage src={AddNewTaskScreen} />,
                    title: renderTitle('Add New Task'),
                    subtitle: renderSubtitle(
                        `Here you can:\n• Enter the task name\n• Add a photo, deadline, location, or contact\n• Save the task using the "save task" button\n• Manage additional options for your task`
                    ),
                },
                {
                    backgroundColor: '#161925',
                    image: <FramedImage src={Settings} />,
                    title: renderTitle('Settings'),
                    subtitle: renderSubtitle(
                        `On the Settings screen, you can:\n• Change the app's language (English or Ukrainian)\n• Switch between Light and Dark theme\n• View detailed information about your device\n• Access the project's source code on GitHub`
                    ),
                },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    imageFrame: {
        marginTop: -250,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2.5,
        borderColor: '#fff',
        borderRadius: 24,
        padding: 10,
        backgroundColor: '#23263b',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
    },
    image: {
        width: 370,
        height: 370,
        resizeMode: 'contain',
        borderRadius: 16,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        color: '#e3e7ef',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'left',
        marginHorizontal: 18,
        lineHeight: 24,
        marginBottom: 4,
    },
});
