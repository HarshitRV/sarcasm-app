import { SafeAreaView } from 'react-native-safe-area-context';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
} from 'react-native';
import AuthGuard from '../components/auth-guard/auth-guard';
import { useState } from 'react';
import { useAddSarcasticCommentMutation } from '@/services/sarcasm/sarcasm.service';
import { router } from 'expo-router';
import { removeAuthToken } from '@/utils/utils';

export default function AddSarcasm() {
	const [sarcasticComment, setSarcasticComment] = useState('');
	const [addSarcasm, { isLoading }] = useAddSarcasticCommentMutation();

	const handleInputSarcasm = (text: string) => {
		setSarcasticComment(text);
	};

	const handleSubmit = async () => {
		try {
			if (!sarcasticComment) {
				return;
			}

			const result = await addSarcasm({ sarcasm: sarcasticComment }).unwrap();

			if (result) {
				Alert.alert('Success', 'Sarcastic comment added successfully');
			}
		} catch (error) {
			console.log(error);

			const errorData = error as {
				data: {
					hasSimilarSarcasms?: boolean;
					message?: string;
				};
				status?: number;
			};

			if (errorData.status === 401) {
				Alert.alert('Error', 'Login expired. Please sign in again');
				await removeAuthToken();
				router.replace('/sign-in');
			} else if (errorData.data.hasSimilarSarcasms) {
				Alert.alert('Error', 'This comment already exists');
				return;
			} else {
				Alert.alert('Error', 'An error occurred');
			}
		}
	};

	return (
		<AuthGuard>
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}>Add a sarcastic comment</Text>
				</View>
				<View style={styles.formContainer}>
					<TextInput
						style={styles.input}
						placeholder="sarcastic comment goes here..."
						placeholderTextColor={'#fff'}
						onChangeText={handleInputSarcasm}
					/>
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.submitButton}
						onPress={handleSubmit}
						disabled={isLoading || !sarcasticComment}>
						<Text style={styles.submitButtonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</AuthGuard>
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
