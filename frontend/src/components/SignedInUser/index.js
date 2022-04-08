import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

const SignedInUser = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
  <div className="signed-in-container">
    <ProfileButton user={sessionUser} />
    <div>Welcome {sessionUser.firstname}</div>
  </div>
  );
};

export default SignedInUser