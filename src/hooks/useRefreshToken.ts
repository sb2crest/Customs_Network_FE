import { axiosPrivate } from '../services/apiService';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth,setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axiosPrivate.post('/api/v1/auth/refresh-token', {}, {
                headers: {
                    'Authorization': `Bearer ${auth.refreshToken}`
                },
                withCredentials: true
            });
            setAuth(prev => ({
                ...prev,
                accessToken: response.data.accessToken
            }));
            return response.data.accessToken;
        } catch (error) {
            console.error("Token refresh failed:", error);
            return null;
        }
    }
    return refresh;
};

export default useRefreshToken;
