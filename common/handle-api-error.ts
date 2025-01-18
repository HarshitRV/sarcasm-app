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
            Alert.alert('Error', 'This comment already exists');
            break;
        }
        default: {
            Alert.alert('Error', 'An error occurred');
        }
    }
}
