import { UserProvider } from '../../context/UserContext';
import UserPage from './UserPage';

const UserWrapper = () => {
  return (
    <UserProvider>
      <UserPage />
    </UserProvider>
  );
};

export default UserWrapper;