import { UserProvider } from '../context/UserContext';
import UserPage from '../components/user_page/UserPage';

const UserWrapper = () => {
  return (
    <UserProvider>
      <UserPage />
    </UserProvider>
  );
};

export default UserWrapper;