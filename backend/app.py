import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

CHAVE_API = os.getenv("GEMINI_API_KEY")
cliente = genai.Client(api_key=CHAVE_API)

PERSONAGENS = {
    "chef": "Você é um chef prático. Dê receitas baseadas nos ingredientes fornecidos.",
    "mentor": "Você é um professor de programação. Identifique erros no código e explique conceitos de forma simples.",
    "vendedor": "Você é um especialista em vendas e anúncios. Crie textos persuasivos para produtos usados."
}


@app.route("/falar-com-ia", methods=["POST"])
def falar_com_ia():
    dados = request.get_json()
    
    mensagem = dados.get("mensagem", "")
    tipo_ia = dados.get("personagem", "chef")

    if not mensagem:
        return jsonify({"erro": "Nenhuma mensagem enviada."}), 400

  
    instrucao_sistema = PERSONAGENS.get(tipo_ia, PERSONAGENS["chef"])

    try:
        chat = cliente.chats.create(
            model="gemini-3.6-flash",
            config=types.GenerateContentConfig(
                system_instruction=instrucao_sistema
            )
        )

        resposta = chat.send_message(mensagem)
        return jsonify({"resposta": resposta.text})

    except Exception as e:
        return jsonify({"erro": f"Erro interno no servidor: {str(e)}"}), 500

# 6. Inicialização do servidor local
if __name__ == "__main__":
    app.run(port=5000, debug=True)