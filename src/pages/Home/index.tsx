import { useSelector } from 'react-redux';
import { Button } from '../../components/Form/Form.styled';
import { Link } from 'react-router-dom';
import { SIGN_IN, SIGN_UP } from '../../routes';
import { RootState } from '../../store/';

const Home = () => {
  const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);
  if (!authenticated && !token) {
    return (        <>
      <Link to={SIGN_IN}>
        <Button>Sign In</Button>
      </Link>
      <Link to={SIGN_UP}>
        <Button>Sign Up</Button>
      </Link>
    </>);
  }

  return (
    <div>
        <h1>Welcome!</h1>
    </div>
  );
};

export default Home;
