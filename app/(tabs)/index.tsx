import { StyleSheet, FlatList, Platform, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';

const transactions = [
  { id: 1, description: '1 Piercing', amount: 15 },
  { id: 2, description: '2x1 Piercing (1P)', amount: 20 },
  { id: 3, description: '2x1 Piercing (2P)', amount: 20 },
  { id: 4, description: 'Retiro caja', amount: -20 },
];

export default function TabOneScreen() {
  const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight;

  const renderTransaction = ({ item }) => (
    <View style={styles.transaction}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.amount}>{item.amount} €</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué deseas hacer?</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.row}>
        <Link href="/new-item">
          <View style={styles.item}>
            <Ionicons name="basket-outline" size={32} />
            <Text style={styles.text}>Servicio</Text>
          </View>
        </Link>
        <View style={styles.item}>
          <Ionicons name="cash-outline" size={32} />
          <Text style={styles.text}>Caja</Text>
        </View>
        <View style={styles.item}>
          <Ionicons name="cube-outline" size={32} />
          <Text style={styles.text}>Stock</Text>
        </View>
      </View>
      <Text style={styles.title}>Últimos movimientos</Text>
      <View style={styles.separatorList} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.listContainer}>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id.toString()}
        />
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
