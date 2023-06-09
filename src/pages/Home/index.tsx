import { useContext } from 'react';
import { Button } from '../../components/Form/Form.styled';
import { Link } from 'react-router-dom';
import { SIGN_IN, SIGN_UP } from '../../routes';
import { AuthContext } from '../../utils/AuthContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      {authContext?.authenticated ? (
        <h1>Welcome!</h1>
      ) : (
        <>
          <Link to={SIGN_IN}>
            <Button>Sign In</Button>
          </Link>
          <Link to={SIGN_UP}>
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
