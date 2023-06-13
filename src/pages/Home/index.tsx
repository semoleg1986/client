import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../components/styles/Form.styled';
import { SIGN_IN, SIGN_UP } from '../../routes';
import { RootState } from '../../store';

function Home() {
  const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);
  if (!authenticated && !token) {
    return (
      <>
        <Link to={SIGN_IN}>
          <Button>Sign In</Button>
        </Link>
        <Link to={SIGN_UP}>
          <Button>Sign Up</Button>
        </Link>
      </>
    );
  }

  return (
    <div>
      <h1>Welcome!</h1>
    </div>
  );
}

export default Home;
