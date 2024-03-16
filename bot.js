const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const http = require('http');




const token = '7156714710:AAEBG2fBbZ490ug6J1ho4G-oCG5plid2IAQ';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const name = msg.from.first_name;
  const keyboard = {
    inline_keyboard: [
      [{ text: "S'inscrire", url: 'https://1wyfsk.com/?open=register#ot61' }],
      [{ text: 'Check ✅️', callback_data: 'check' }]
    ]
  };

  bot.sendMessage(msg.chat.id, `Salut ${name}, bienvenue dans le programme hack du jeu Bombucks développé par solkah. Veuillez d'abord créer un nouveau compte 1win en cliquant sur le bouton ci-dessous.`, {
    reply_markup: keyboard
  });
});

bot.on('callback_query', (query) => {
  if (query.data === 'check') {
    bot.sendMessage(query.message.chat.id, 'Veuillez envoyer votre numéro', {
      reply_markup: {
        force_reply: true
      }
    });

    bot.onReplyToMessage = (msg) => {
      const number = msg.text;
      const isValidNumber = /^\d+$/.test(number);

      if (isValidNumber) {
        const keyboard = {
          inline_keyboard: [
            [{ text: 'Démarrer', url: 'http://t.me/Bombucksbot_bombot/Solkah_Bombucksbot' }]
          ]
        };

        bot.sendMessage(msg.chat.id, 'Numéro accepté. Cliquez le bouton ci-dessous pour commencer à gagner.', {
          reply_markup: keyboard
        });
      } else {
        bot.sendMessage(msg.chat.id, 'Numéro invalide. Veuillez entrer un numéro valide.');
      }
    };
  }
});


// Créez un serveur HTTP simple qui renvoie "I'm alive" lorsque vous accédez à son URL
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("I'm alive");
    res.end();
});

// Écoutez le port 8080
server.listen(8080, () => {
    console.log("Keep alive server is running on port 8080");
});
