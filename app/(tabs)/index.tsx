import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SarcasmCard from '../components/sarcasm-card/sarcasm-card';

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<SarcasmCard />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});
