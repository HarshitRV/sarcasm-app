import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllSarcasms from '../components/all-comments/all-sarcasms';

export default function Sarcasms() {
	return (
		<SafeAreaView style={styles.container}>
			<AllSarcasms />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		height: '100%',
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: '#000',
	},
});
