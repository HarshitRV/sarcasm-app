import { StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SarcasmCard from './components/sarcasm-card/sarcasm-card';
import { Provider } from 'react-redux';
import { store } from './store';

export default function HomeScreen() {
	return (
		<Provider store={store}>
			<SafeAreaView style={styles.container}>
				<SarcasmCard />
			</SafeAreaView>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});
