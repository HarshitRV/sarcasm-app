import { SafeAreaView } from 'react-native-safe-area-context';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
} from 'react-native';
import { isAuthenticated, login } from '@/slice/auth-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function AddSarcasm() {
	const isLoggedIn = useAppSelector(isAuthenticated);

	useEffect(() => {
		if (!isLoggedIn) {
			router.replace('/sign-in');
		}
	}, [isLoggedIn]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Add a sarcastic comment</Text>
			</View>
			<View style={styles.formContainer}>
				<TextInput
					style={styles.input}
					placeholder="sarcastic comment goes here..."
					placeholderTextColor={'#fff'}
				/>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.submitButton}
					onPress={() => {}}>
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	headerContainer: {
		alignItems: 'flex-start',
		marginTop: 20,
	},
	header: {
		color: '#fff',
		fontSize: 25,
		fontFamily: 'SpaceMono',
	},
	formContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	input: {
		color: '#fff',
		fontSize: 20,
		fontFamily: 'SpaceMono',
		borderWidth: 1,
		borderColor: '#fff',
		padding: 10,
		width: '100%',
		height: 80,
		borderRadius: 10,
	},
	submitButton: {
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 10,
		alignItems: 'center',
		width: '100%',
		marginTop: 20,
	},
	submitButtonText: {
		color: '#000',
		fontSize: 18,
		fontFamily: 'SpaceMono',
	},
});
