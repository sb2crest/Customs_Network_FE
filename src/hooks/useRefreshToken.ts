import { axiosPrivate1 } from '../services/apiService';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth,setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axiosPrivate1.post('/api/v1/auth/refresh-token', {}, {
                headers: {
                    'Authorization': `Bearer ${auth.refreshToken}`
                },
                withCredentials: true
            });
            setAuth(prev => ({
                ...prev,
                accessToken: response.data.access_token
            }));
            return response.data.access_token;
        } catch (error) {
            console.error("Token refresh failed:", error);
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            }
            return null;
        }
    }
    return refresh;
};

export default useRefreshToken;
