import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllComments from '../components/all-comments/all-comments';

export default function Comments() {
	return (
		<SafeAreaView style={styles.container}>
			<AllComments />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		height: '100%',
		paddingLeft: 10,
		paddingRight: 10,
	},
});
