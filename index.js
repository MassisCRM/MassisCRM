const express = require('express');
const { create } = require('venom-bot');
const app = express();
app.use(express.json());

let cliente;

// Criação da sessão do WhatsApp
create({
  session: 'MassisCRM',
  multidevice: true
})
  .then((client) => {
    cliente = client;
    console.log('✅ WhatsApp conectado com sucesso ao MassisCRM!');
    ouvirMensagens();
  })
  .catch((erro) => console.log('❌ Erro ao iniciar sessão:', erro));

// Endpoint simples de status
app.get('/', (req, res) => {
  res.send('🚀 Servidor MassisCRM está ativo e conectado ao WhatsApp!');
});

// Endpoint para envio manual de mensagens (Leaveble)
app.post('/send', async (req, res) => {
  const { numero, mensagem } = req.body;

  try {
    await cliente.sendText(${numero}@c.us, mensagem);
    console.log(📤 Mensagem enviada para ${numero}: ${mensagem});
    res.send({ status: 'Mensagem enviada com sucesso!' });
  } catch (erro) {
    console.error('❌ Erro ao enviar mensagem:', erro);
    res.status(500).send({ erro: 'Falha ao enviar mensagem' });
  }
});

// Função de escuta e resposta automática
function ouvirMensagens() {
  cliente.onMessage(async (mensagem) => {
    console.log(💬 Nova mensagem de ${mensagem.from}: ${mensagem.body});

    // SDR automático (resposta base)
    if (mensagem.body.toLowerCase().includes('oi') || mensagem.body.toLowerCase().includes('olá')) {
      await cliente.sendText(mensagem.from, 'Olá! 👋 Aqui é o time MassisCRM. Como posso te ajudar hoje?');
    } else if (mensagem.body.toLowerCase().includes('preço')) {
      await cliente.sendText(mensagem.from, 'Temos planos a partir de R$49/mês! Quer que eu te mande os detalhes? 💼');
    } else if (mensagem.body.toLowerCase().includes('sim')) {
      await cliente.sendText(mensagem.from, 'Perfeito 😄! Já vou te mandar o link pra começar agora!');
    }
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(🔥 Servidor MassisCRM rodando na porta ${PORT}));
