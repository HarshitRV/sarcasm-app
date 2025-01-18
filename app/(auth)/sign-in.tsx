import { useState } from 'react';
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
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoginMutation } from '@/services/sarcasm/sarcasm.service';
import { UserAuthRequestBody } from '@/services/sarcasm/types';
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/slice/auth-slice';
import { router } from 'expo-router';

export default function SignIn() {
	const dispatch = useAppDispatch();
	const [loginCredentials, setLoginCredentials] = useState<UserAuthRequestBody>(
		{
			email: '',
			password: '',
		}
	);

	const isLoginDisabled = !loginCredentials.email || !loginCredentials.password;

	const [loginUser] = useLoginMutation();

	const handleInputEmail = (text: string) => {
		setLoginCredentials((prevState) => {
			return {
				...prevState,
				email: text,
			};
		});
	};

	const handleInputPassword = (text: string) => {
		setLoginCredentials((prevState) => {
			return {
				...prevState,
				password: text,
			};
		});
	};

	const handleLogin = async () => {
		try {
			if (!loginCredentials.email || !loginCredentials.password) {
				alert('Please enter your email and password');
				return;
			}

			const { authToken } = await loginUser(loginCredentials).unwrap();

			if (authToken) {
				await SecureStore.setItemAsync('authToken', authToken);
				dispatch(login());
				router.replace('/add-sarcasm');
			}
		} catch (e) {
			console.log(e);
			Alert.alert('Error', 'Invalid credentials');
		}
	};

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
							keyboardType="email-address"
							onChangeText={handleInputEmail}
						/>
						<TextInput
							style={styles.input}
							placeholder="Enter your password"
							placeholderTextColor={'#fff'}
							secureTextEntry={true}
							onChangeText={handleInputPassword}
						/>
						<TouchableOpacity
							activeOpacity={0.7}
							style={styles.submitButton}
							onPress={handleLogin}
							disabled={isLoginDisabled}>
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
