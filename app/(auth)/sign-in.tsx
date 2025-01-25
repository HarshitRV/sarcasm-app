import { useEffect, useState } from 'react';
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
    useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoginMutation } from '@/services/sarcasm/sarcasm.service';
import { UserAuthRequestBody } from '@/services/sarcasm/types';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/slice/auth-slice';
import { router } from 'expo-router';
import { setAuthToken } from '@/utils/utils';
import { Colors } from '@/constants/Colors';

export default function SignIn() {
    const colorScheme = useColorScheme();
    const dispatch = useAppDispatch();
    const [loginCredentials, setLoginCredentials] =
        useState<UserAuthRequestBody>({
            email: '',
            password: '',
        });
    const [borderStyles, setBorderStyles] = useState<{
        color: string;
        width: number;
    }>({
        color:
            colorScheme === 'dark'
                ? Colors.dark.defaultBorderColor
                : Colors.light.defaultBorderColor,
        width: 1,
    });

    const inputStyles = [
        styles.input,
        colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
        { borderColor: borderStyles.color, borderWidth: borderStyles.width },
    ];

    const isLoginDisabled =
        !loginCredentials.email || !loginCredentials.password;

    const [loginUser] = useLoginMutation();

    const textStyles = [
        styles.text,
        colorScheme === 'dark'
            ? { color: Colors.dark.text }
            : { color: Colors.light.text },
    ];

    const getPlaceHolderTextColor = () => {
        return colorScheme === 'dark'
            ? Colors.dark.placeHolderText
            : Colors.light.placeHolderText;
    };

    const handleInputEmail = (text: string) => {
        setLoginCredentials(prevState => {
            return {
                ...prevState,
                email: text,
            };
        });
    };

    const handleInputPassword = (text: string) => {
        setLoginCredentials(prevState => {
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
                await setAuthToken(authToken);
                dispatch(login());
                router.replace('/add-sarcasm');
            }
        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Invalid credentials');
        }
    };

    const handleNavigateHome = () => {
        router.replace('/');
    };

    useEffect(() => {
        setBorderStyles({
            color:
                colorScheme === 'dark'
                    ? Colors.dark.defaultBorderColor
                    : Colors.light.defaultBorderColor,
            width: 1,
        });
    }, [colorScheme]);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={textStyles}>Sign In * Only for Admins</Text>
            </View>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={inputStyles}
                            placeholder="Enter your email"
                            placeholderTextColor={getPlaceHolderTextColor()}
                            keyboardType="email-address"
                            onChangeText={handleInputEmail}
                        />
                        <TextInput
                            style={inputStyles}
                            placeholder="Enter your password"
                            placeholderTextColor={getPlaceHolderTextColor()}
                            secureTextEntry={true}
                            onChangeText={handleInputPassword}
                        />
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.submitButton}
                            onPress={handleLogin}
                            disabled={isLoginDisabled}
                        >
                            <Text style={styles.submitButtonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.submitButton}
                            onPress={handleNavigateHome}
                        >
                            <Text style={styles.submitButtonText}>
                                Back to Home
                            </Text>
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
    containerHeader: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'SpaceMono',
    },
    formContainer: {
        gap: 10,
        width: '100%',
    },
    input: {
        fontSize: 20,
        fontFamily: 'SpaceMono',
        borderWidth: 1,
        padding: 10,
        width: '100%',
        borderRadius: 10,
    },
    inputDark: {
        color: Colors.dark.text,
        borderColor: '#fff',
    },
    inputLight: {
        color: Colors.light.text,
    },
    submitButton: {
        backgroundColor: Colors.primary.purple,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'SpaceMono',
    },
    text: {
        textAlign: 'justify',
        fontFamily: 'SpaceMono',
    },
});
