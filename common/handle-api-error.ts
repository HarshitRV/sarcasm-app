import { removeAuthToken } from '@/utils/utils';
import { ERROR_CODES, ErrorCode } from './common.types';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export function getErrorCode(error: any): ErrorCode {
    if ('data' in error) {
        return error.data.code as ErrorCode;
    }

    return ERROR_CODES.UNKNOWN_ERROR;
}

export async function handleApiError(error: unknown) {
    console.log(':::error:::', error);
    const code = getErrorCode(error);

    switch (code) {
        case 'auth.token.expired':
        case 'user.not.found': {
            await removeAuthToken();
            router.replace('/sign-in');
            break;
        }
        case 'duplicate.sarcasm': {
            Alert.alert(
                'Error',
                'A similar comment already exists. Maybe try with override.',
            );
            break;
        }
        case 11000: {
            Alert.alert(
                'Error',
                'Exactly the same comment already exists. Cannot override.',
            );
            break;
        }
        default: {
            Alert.alert('Error', 'An error occurred');
        }
    }
}
