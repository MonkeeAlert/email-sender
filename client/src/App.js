import React from 'react';

import {Form} from './components/Form/Form.jsx';
import {Header} from './components/Header/Header.jsx';
import { Footer } from './components/Footer/Footer.jsx';

function App() {
  return (
    <main>
      <Header value="Email Sender" />
      <Form />
      <Footer/>
    </main>
  );
}

export default App;
