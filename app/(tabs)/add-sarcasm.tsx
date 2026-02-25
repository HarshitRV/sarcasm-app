import { SafeAreaView } from 'react-native-safe-area-context';
import {
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    useColorScheme,
    Switch,
} from 'react-native';
import AuthGuard from '../components/auth-guard/auth-guard';
import { useState } from 'react';
import { useAddSarcasticCommentMutation } from '@/services/sarcasm/sarcasm.service';
import { handleApiError } from '@/common/handle-api-error';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ThemedText, ThemedView } from '../components/Themed';
import { commonStyles } from '@/constants/Styles';

export default function AddSarcasm() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [borderStyles, setBorderStyles] = useState<{
        color: string;
        width: number;
    }>({
        color: isDark ? Colors.dark.defaultBorderColor : Colors.light.defaultBorderColor,
        width: 1,
    });
    const [sarcasticComment, setSarcasticComment] = useState('');
    const [override, setOverride] = useState(false);
    const [addSarcasm, { isLoading }] = useAddSarcasticCommentMutation();

    const handleSubmit = async () => {
        try {
            if (!sarcasticComment) return;

            const result = await addSarcasm({
                sarcasm: sarcasticComment,
                override,
            }).unwrap();

            if (result) {
                Alert.alert('Success', 'Sarcastic comment added successfully');
                router.push('/sarcasms');
            }
        } catch (error) {
            await handleApiError(error);
        }
    };

    const handleFocus = () => setBorderStyles({ color: Colors.focus.purple, width: 2 });
    const handleBlur = () => setBorderStyles({ 
        color: isDark ? Colors.dark.defaultBorderColor : Colors.light.defaultBorderColor, 
        width: 1 
    });

    return (
        <AuthGuard>
            <ThemedView style={commonStyles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ marginTop: 20, marginBottom: 40 }}>
                        <ThemedText type="header">Add a sarcastic comment</ThemedText>
                    </View>

                    <View style={[commonStyles.centered, { gap: 20 }]}>
                        <TextInput
                            style={[
                                commonStyles.input,
                                { 
                                    borderColor: borderStyles.color, 
                                    borderWidth: borderStyles.width,
                                    color: isDark ? Colors.dark.text : Colors.light.text,
                                    height: 100,
                                    textAlignVertical: 'top'
                                }
                            ]}
                            placeholder="sarcastic comment goes here..."
                            placeholderTextColor={isDark ? Colors.dark.placeHolderText : Colors.light.placeHolderText}
                            multiline
                            onChangeText={setSarcasticComment}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />

                        <View style={commonStyles.row}>
                            <Switch 
                                onValueChange={setOverride}
                                value={override}
                                trackColor={{ false: '#767577', true: Colors.primary.purple }}
                                thumbColor={override ? '#fff' : '#f4f3f4'}
                            />
                            <ThemedText>Override similarity check</ThemedText>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                commonStyles.button,
                                (isLoading || !sarcasticComment) && { opacity: 0.5 }
                            ]}
                            onPress={handleSubmit}
                            disabled={isLoading || !sarcasticComment}
                        >
                            <ThemedText style={commonStyles.buttonText}>
                                {isLoading ? 'Submitting...' : 'Submit'}
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ThemedView>
        </AuthGuard>
    );
}

// Local styles are now minimal as most are shared via commonStyles or handled by Themed components

