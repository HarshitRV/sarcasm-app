import { Image, StyleSheet, ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SarcasmCard from '../components/sarcasm-card/sarcasm-card';

const image = require('../../assets/images/chandler-bing.png');

export default function HomeScreen() {
	return (
		<ImageBackground
			source={image}
			style={styles.background}>
			<View style={styles.overlay} />

			<SafeAreaView style={styles.container}>
				<SarcasmCard />
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
	},
	background: {
		flex: 1,
	},
});
