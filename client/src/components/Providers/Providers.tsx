import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import LoadingIndicator from '@src/components/LoadingIndicator';
import { UserProvider, ModalProvider, ToastProvider } from '@src/context';
import { AuthService } from '@src/services';
import { AUTH_USERNAME, AUTH_PASSWORD } from '@src/constants';
import Api from '@src/api';

const Providers: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const source = Api.source();

  useEffect(() => {
    /**
     * Note: this 'fake auth' handling will only fly because this is a demo app and will never
     * see the light of day in a customer's 'production' environment ;)
     */
    const getAuthToken = async (): Promise<void> => {
      try {
        const payload = { username: AUTH_USERNAME, password: AUTH_PASSWORD };

        const result = await AuthService.generateToken(payload, source);
        const { token } = result.data;

        sessionStorage.setItem('authToken', token as string);
        setError(false);
        setLoading(false);
      } catch (err) {
        if (!Api.isCancel(err as Record<string, unknown>)) {
          setError(true);
          setLoading(false);
        }
      }
    };
    getAuthToken();

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return !error ? (
    <UserProvider>
      <ModalProvider>
        <ToastProvider>{children}</ToastProvider>
      </ModalProvider>
    </UserProvider>
  ) : (
    <Typography className="home-load-error">
      Unfortunately, we were unable to authenticate. No app for you!
    </Typography>
  );
};

export default Providers;
