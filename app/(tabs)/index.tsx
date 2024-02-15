import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Firebase
import { db } from '../../config/firebaseConfig';
import { ref, once, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

interface Movement {
  id: string,
  name: string,
  time: string
}

const movementsRef = ref(db, "movements");

export default function TabOneScreen() {
  const [movements, setMovements] = useState<Movement[]>([]);

  const handlePress = (to: string) => {
    router.navigate(to);
  };

  useEffect(() => {
    const unsuscribe = onValue(movementsRef, (snap) => {
      const data = snap.val();
      const renderedData = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));

      setMovements(renderedData);
    })

    return () => unsuscribe();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué deseas hacer?</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handlePress('/new-item')}>
          <View style={styles.item}>
            <Ionicons name="basket-outline" size={32} />
            <Text style={styles.text}>Servicio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('/new-item')}>
          <View style={styles.item}>
            <Ionicons name="cash-outline" size={32} />
            <Text style={styles.text}>Caja</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('/new-item')}>
          <View style={styles.item}>
            <Ionicons name="cube-outline" size={32} />
            <Text style={styles.text}>Stock</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Últimos movimientos</Text>
      <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.listContainer}>
        {movements.map((item: Movement) => (
          <View style={styles.transaction} key={item.id}>            
            <Text style={styles.amount}>{item.name}</Text>
            <Text style={styles.description}>{item.time}</Text>
          </View>
        ))}
      </View>
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

  // Iconos
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 75
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    fontSize: 16,
  },

  // Listado
  listContainer: {
    //flex: 1,
    padding: 10,
    width: "100%",
    paddingTop: 0,
  },
  separatorList: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  description: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
