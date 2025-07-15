import { FlatList, Modal, Text, TouchableOpacity, View, StyleSheet, Switch } from "react-native";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import * as Contacts from 'expo-contacts';

export function ContactPicker({ value, onChange }) {

    const [withContact, setWithContact] = useState(!!value);
    const [selectedContact, setSelectedContact] = useState(value || null);
    const [allContacts, setAllContacts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const loadContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
            });
            setAllContacts(data);
            setModalVisible(true);
        } else {
            showMessage({
                message: 'Permission denied for contacts',
                type: 'danger',
            });
        }
    };

    const handleSwitch = (val) => {
        setWithContact(val);
        if (!val) {
            setSelectedContact(null);
            onChange(null);
        }
    };

    return (
        <>
            <View style={ styles.contactRow }>
                <Text style={ styles.contactLabel }>ask contact for details</Text>
                <View style={{ transform: [{ scale: 0.8 }] }}>
                    <Switch
                        value={withContact}
                        onValueChange={handleSwitch}
                        thumbColor={withContact ? "#4F8EF7" : "#fff"}
                        trackColor={{ false: "#ccc", true: "#B3D2FF" }}
                    />
                </View>
            </View>

            {withContact && (
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity onPress={loadContacts}>
                        <Text style={ styles.contactText }>
                            {selectedContact ? selectedContact.name : "Choose contact"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={ styles.modalOverlay }>
                    <View style={ styles.modalContent }>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Choose contact</Text>
                        <FlatList
                            data={allContacts}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        onChange(item);
                                        setSelectedContact(item);
                                        setModalVisible(false);
                                    }}
                                    style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: "#eee" }}
                                >
                                    <Text style={{ fontSize: 16 }}>
                                        {item.name} {item.phoneNumbers?.[0]?.number ? `(${item.phoneNumbers[0].number})` : ""}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            style={{ maxHeight: 300 }}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 15 }}>
                            <Text style={{ color: '#4F8EF7', textAlign: 'center', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
        width: '100%',
        justifyContent: 'flex-start',
    },
    contactLabel: {
        fontSize: 20,
        color: "#222",
        marginRight: 15,
        fontFamily: 'Montserrat-Regular',
    },
    contactText: {
        fontSize: 18,
        color: "#4F8EF7",
        fontWeight: '600',
        backgroundColor: "#e7f0ff",
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        overflow: "hidden",
        shadowColor: "#4F8EF7",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 18,
        width: '90%',
        maxWidth: 400,
        maxHeight: '70%',
        alignItems: 'center',
    },
})