import { Container } from '@material-ui/core';
import Providers from '@src/components/Providers';
import Routes from '@src/routes';
import Modal from '@src/components/Modal';
import Toast from '@src/components/Toast';
import Header from '@src/components/Header';
import Footer from '@src/components/Footer';

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
