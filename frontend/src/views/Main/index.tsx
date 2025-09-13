import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import {Header} from '../../components/Header';
import {Orders} from '../Orders';

const Main = () => {
  return (
    <>
      <Header/>
      <Orders />
      <ToastContainer position='top-right' />
    </>
  );
}

export default Main;
