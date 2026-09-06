import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SectionLogo from './components/SectionLogo';
import SectionAgentes from './components/SectionAgentes';
import Footer from './components/Footer';
import Chat from './components/Chat';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home');
  const [agenteEscolhido, setAgenteEscolhido] = useState('chef');
  const abrirChat = (personagem) => {
    setAgenteEscolhido(personagem);
    setTelaAtual('chat');
  };

  return (
    <>
      <Header />

      {telaAtual === 'home' ? (
        <>
          <SectionLogo />
          <SectionAgentes aoClicarChat={abrirChat} />
          <Footer />
        </>
      ) : (
        <Chat 
          personagemSelecionado={agenteEscolhido} 
          voltarHome={() => setTelaAtual('home')} 
        />
      )}
      
    </>
  );
}