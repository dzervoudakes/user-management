import { Container } from '@material-ui/core';

import Footer from '@src/components/Footer';
import Header from '@src/components/Header';
import Modal from '@src/components/Modal';
import Providers from '@src/components/Providers';
import Toast from '@src/components/Toast';
import Routes from '@src/routes';

const App: React.FC = () => (
  <Providers>
    <Header />
    <Container maxWidth="xl" classes={{ maxWidthXl: 'main-content' }}>
      <Routes />
    </Container>
    <Footer />
    <Modal />
    <Toast />
  </Providers>
);

export default App;
