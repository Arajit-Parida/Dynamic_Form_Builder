import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Form />
      </main>
      <Footer />
    </div>
  );
};

export default App;
