import ProfileButton from './ProfileButton';

const SignedInUser = () => {


  return (
    <>
    <div>Welcome {sessionUser.username}</div>
    <ProfileButton user={sessionUser} />
  </>
  );
};

export default SignedInUser