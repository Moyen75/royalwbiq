import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const loginAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const checkLoggedIn = async () => {
                const session = await getSession();
                if (session) {
                    // Redirect to the main page if the user is already logged in and the page doesn't require authentication
                    router.push('/');
                }
            };
            checkLoggedIn();
        }, [router]);

        return <WrappedComponent {...props} />;
    };
};

export default loginAuth;