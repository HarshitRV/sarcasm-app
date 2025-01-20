import { SafeAreaView } from 'react-native-safe-area-context';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    useColorScheme,
} from 'react-native';
import AuthGuard from '../components/auth-guard/auth-guard';
import { useEffect, useState } from 'react';
import { useAddSarcasticCommentMutation } from '@/services/sarcasm/sarcasm.service';
import { handleApiError } from '@/common/handle-api-error';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function AddSarcasm() {
    const colorScheme = useColorScheme();

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
    const [sarcasticComment, setSarcasticComment] = useState('');
    const [addSarcasm, { isLoading }] = useAddSarcasticCommentMutation();

    const headerStyles = [
        styles.header,
        colorScheme === 'dark' ? styles.headerDark : styles.headerLight,
    ];

    const inputStyles = [
        styles.input,
        colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
        { borderColor: borderStyles.color, borderWidth: borderStyles.width },
    ];

    const getBorderFocusColor = () => {
        return Colors.focus.purple;
    };

    const getBorderColorBlur = () => {
        return colorScheme === 'dark'
            ? Colors.dark.defaultBorderColor
            : Colors.light.defaultBorderColor;
    };

    const handleInputSarcasm = (text: string) => {
        setSarcasticComment(text);
    };

    const handleSubmit = async () => {
        try {
            if (!sarcasticComment) {
                return;
            }

            const result = await addSarcasm({
                sarcasm: sarcasticComment,
            }).unwrap();

            if (result) {
                Alert.alert('Success', 'Sarcastic comment added successfully');
                router.push('/sarcasms');
            }
        } catch (error) {
            await handleApiError(error);
        }
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
        <AuthGuard>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={headerStyles}>Add a sarcastic comment</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={inputStyles}
                        placeholder="sarcastic comment goes here..."
                        placeholderTextColor={
                            colorScheme === 'dark'
                                ? Colors.dark.placeHolderText
                                : Colors.light.placeHolderText
                        }
                        onChangeText={handleInputSarcasm}
                        onFocus={() =>
                            setBorderStyles({
                                color: getBorderFocusColor(),
                                width: 3,
                            })
                        }
                        onBlur={() =>
                            setBorderStyles({
                                color: getBorderColorBlur(),
                                width: 1,
                            })
                        }
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.submitButton}
                        onPress={handleSubmit}
                        disabled={isLoading || !sarcasticComment}
                    >
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
    headerDark: {
        color: Colors.dark.text,
    },
    headerLight: {
        color: Colors.light.text,
    },
    header: {
        fontSize: 25,
        fontFamily: 'SpaceMono',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    inputDark: {
        color: Colors.dark.text,
        borderColor: '#fff',
    },
    inputLight: {
        color: Colors.light.text,
    },
    input: {
        fontSize: 20,
        fontFamily: 'SpaceMono',
        borderWidth: 1,
        padding: 10,
        width: '100%',
        height: 80,
        borderRadius: 10,
    },
    submitButton: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        backgroundColor: Colors.primary.purple,
    },
    submitButtonText: {
        fontSize: 18,
        fontFamily: 'SpaceMono',
        color: '#fff',
    },
});
