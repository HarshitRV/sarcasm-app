import { getAuthToken } from '@/utils/utils';
import { PropsWithChildren, useEffect } from 'react';
import { router } from 'expo-router';

export default function AuthGuard({ children }: PropsWithChildren<{}>) {
	useEffect(() => {
		(async () => {
			const authToken = await getAuthToken();
			if (!authToken) {
				router.replace('/sign-in');
			}
		})();
	}, []);

	return children;
}
