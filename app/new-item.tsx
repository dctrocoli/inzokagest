import { StyleSheet, FlatList, Platform, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, Button, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { useNavigation } from 'expo-router';

class Item {
    id: number;
    type: string;
    description: string;
    amount: number;

    constructor(id: number, type: string, description: string, amount: number) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.amount = amount;
    }
}


export default function NewItem() {
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: any }>({});

    const handlePress = (item: Item) => {
        if(selectedItems[item.type] == item.id){
            item.id = -999
        }

        const updatedDictionary = {
            ...selectedItems,
            [item.type]: item.id
        };

        setSelectedItems(updatedDictionary);
    };

    const getValue = (key: string) => {
        return selectedItems[key];
    };

    const transactions = [
        { id: 1, type: 'service', description: '1 Piercing', amount: 15 },
        { id: 2, type: 'service', description: '2x1 Piercing (1P)', amount: 20 },
        { id: 3, type: 'service', description: '2x1 Piercing (2P)', amount: 20 },
    ];

    const transactions2 = [
        { id: 1, type: 'jewel1', description: 'Joya básica', amount: 1 },
        { id: 2, type: 'jewel1', description: 'Joya plateada', amount: 8 },
        { id: 3, type: 'jewel1', description: 'Joya dorada', amount: 10 },
    ];

    const transactions3 = [
        { id: 1, type: 'jewel2', description: 'Joya básica', amount: 1 },
        { id: 2, type: 'jewel2', description: 'Joya plateada', amount: 8 },
        { id: 3, type: 'jewel2', description: 'Joya dorada', amount: 10 },
    ];

    const handleCompleteProcess = () => {
        navigation.goBack();
    };

    const renderTransaction = ({ 
        item,
    }) => (
        <TouchableOpacity style={[styles.transaction, getValue(item.type) === item.id && styles.selectedItem]}
            onPress={() => handlePress(item)}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.amount}>{item.amount} €</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccionar servicio</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.listContainer}>
                <FlatList
                    data={transactions}
                    renderItem={renderTransaction}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <Text style={styles.title}>Seleccionar joya 1</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.listContainer}>
                <FlatList
                    data={transactions2}
                    renderItem={renderTransaction}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <Text style={styles.title}>Seleccionar joya 2</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.listContainer}>
                <FlatList
                    data={transactions3}
                    renderItem={renderTransaction}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <Pressable style={styles.button} onPress={handleCompleteProcess}>
                <Text style={styles.text}>Completar proceso</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: '80%',
    },

    // Listado
    listContainer: {
        flex: 1,
        padding: 10,
        width: "100%",
        paddingTop: 0,
        //marginBottom: 30
    },
    separatorList: {
        marginVertical: 5,
        height: 1,
        width: '80%',
    },
    selectedItem: {
        color: "white",
        backgroundColor: '#b8f3af',
    },
    transaction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    description: {
        fontSize: 16,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Botón
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#84b6f4',
        marginBottom: 20
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});