import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

const SignedInUser = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
  <div className="signed-in-container">
    <div>Welcome {sessionUser.username}</div>
    <ProfileButton user={sessionUser} />
  </div>
  );
};

export default SignedInUser