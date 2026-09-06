export default function SectionAgentes({ aoClicarChat }) {
    return(
        <section className="section-agentes">
            <div className="container">
                <h2 id="conhecer">Nossos Agentes</h2>
                
                <div className="agentes-grid">
                    <div className="card-agente">
                        <h3>Chef Prático</h3>
                        <p>Dê receitas baseadas nos ingredientes fornecidos.</p>
                        <button className="bnt-agentes" onClick={() => aoClicarChat('chef')}>
                            Entrar no chat
                        </button>
                    </div>

                    <div className="card-agente">
                        <h3>Professor / Mentor</h3>
                        <p>Identifique erros no código e explique conceitos.</p>
                        <button className="bnt-agentes" onClick={() => aoClicarChat('mentor')}>
                            Entrar no chat
                        </button>
                    </div>

                    <div className="card-agente">
                        <h3>Especialista em Vendas</h3>
                        <p>Crie textos persuasivos para produtos usados.</p>
                        <button className="bnt-agentes" onClick={() => aoClicarChat('vendedor')}>
                            Entrar no chat
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}