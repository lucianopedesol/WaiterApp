import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import {Header} from '../Header';
import {Orders} from '../Orders';

export function Main() {
  return (
    <>
      <Header/>
      <Orders />
      <ToastContainer position='bottom-center' />
    </>
  );
}

