import {
	TextInput,
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Platform,
	Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.formContainer}>
						<TextInput
							style={styles.input}
							placeholder="Enter your email"
							placeholderTextColor={'#fff'}
						/>
						<TextInput
							style={styles.input}
							placeholder="Enter your password"
							placeholderTextColor={'#fff'}
							secureTextEntry={true}
						/>
						<TouchableOpacity
							activeOpacity={0.7}
							style={styles.submitButton}
							onPress={() => {}}>
							<Text style={styles.submitButtonText}>Login</Text>
						</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
		width: '100%',
	},
	formContainer: {
		gap: 10,
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
		borderRadius: 10,
	},
	submitButton: {
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 10,
		alignItems: 'center',
		width: '100%',
	},
	submitButtonText: {
		color: '#000',
		fontSize: 18,
		fontFamily: 'SpaceMono',
	},
});
