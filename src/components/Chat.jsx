import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat({ personagemSelecionado, voltarHome }) {
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const nomesAgentes = {
    chef: "Chef Prático",
    mentor: "Professor / Mentor",
    vendedor: "Especialista em Vendas"
  };

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const novaMensagemUsuario = { remetente: 'usuario', texto: mensagem };
    setHistorico((prev) => [...prev, novaMensagemUsuario]);
    const textoAtual = mensagem;
    setMensagem('');
    setCarregando(true);

    try {
      const response = await fetch('http://localhost:5000/falar-com-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensagem: textoAtual,
          personagem: personagemSelecionado,
        }),
      });

      const dados = await response.json();

      if (response.ok) {
        setHistorico((prev) => [...prev, { remetente: 'ia', texto: dados.resposta }]);
      } else {
        setHistorico((prev) => [...prev, { remetente: 'ia', texto: `Erro: ${dados.erro}` }]);
      }
    } catch (error) {
      setHistorico((prev) => [...prev, { remetente: 'ia', texto: 'Erro de conexão com o servidor Flask.' }]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="chat-container">
      <button className="chat-btn-voltar" onClick={voltarHome}>
        Voltar para a Home
      </button>

      <h2>Conversando com: <span className="chat-titulo-personagem">{nomesAgentes[personagemSelecionado] || "Agente de IA"}</span></h2>

      <div className="chat-historico">
        {historico.length === 0 && (
          <p className="chat-vazio">Digite algo para iniciar a conversa...</p>
        )}
        
        {historico.map((msg, index) => (
          <div key={index} className={`chat-mensagem-wrapper ${msg.remetente}`}>
            <span className="chat-remetente">
              {msg.remetente === 'usuario' ? 'Você' : nomesAgentes[personagemSelecionado]}
            </span>
            <div className={`chat-balaocelula ${msg.remetente}`}>
              {/* Se for mensagem do usuário, exibe texto puro. Se for da IA, renderiza com Markdown bonito */}
              {msg.remetente === 'usuario' ? (
                msg.texto
              ) : (
                <div className="markdown-conteudo">
                  <ReactMarkdown>{msg.texto}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {carregando && (
          <div className="chat-carregando">
            O agente está digitando...
          </div>
        )}
      </div>

      <form onSubmit={enviarMensagem} className="chat-form">
        <input 
          type="text" 
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="chat-input"
        />
        <button type="submit" className="bnt-agentes">Enviar</button>
      </form>
    </div>
  );
}