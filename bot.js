const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const http = require('http');


// Remplacez 'YOUR_TELEGRAM_BOT_TOKEN' par votre jeton de bot Telegram
const token = '7156714710:AAEBG2fBbZ490ug6J1ho4G-oCG5plid2IAQ';
const bot = new TelegramBot(token, { polling: true });

let awaitingId = false; // Variable pour suivre si l'utilisateur doit envoyer son ID

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id;

    // Envoyer l'ID de compte Telegram au fichier PHP sur votre site
    try {
        await axios.post('https://solkah.org/ID/id.php', {
            telegram_id: telegramId
        });
        bot.sendMessage(chatId, `Salut ${msg.from.first_name}, bienvenue dans le programme hack du jeu Bombucks développé par solkah. Veillez d'abord créer un nouveau compte 1win en cliquant sur le bouton ci-dessous.`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Créer un compte 1win', url: 'https://1wyfsk.com/?open=register#ot61' }],
                    [{ text: 'Check✅️', callback_data: 'check_id' }]
                ]
            }
        });
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Une erreur est survenue. Veuillez réessayer plus tard.');
    }
});

// Gérer les actions des boutons
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'check_id') {
        awaitingId = true; // Mettre en attente l'envoi de l'ID de compte
        bot.sendMessage(chatId, 'Veuillez envoyer votre ID de compte.');
    }
});

// Gérer l'envoi de l'ID de compte par l'utilisateur
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const receivedId = parseInt(msg.text.trim()); // Convertir l'ID en nombre entier
    const validMinId = 68000000; // ID minimum valide
    const validMaxId = 99999999; // ID maximum valide

    if (awaitingId && receivedId >= validMinId && receivedId <= validMaxId) {
        // Le code à exécuter si l'ID est valide
        bot.sendMessage(chatId, 'ID accepté. Cliquez sur le bouton ci-dessous pour commencer à gagner.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Démarrer le bot', url: 'http://t.me/Bombucksbot_bombot/Solkah_Bombucksbot' }]
                ]
            }
        });
    } else if (awaitingId) {
        // Le code à exécuter si l'ID est invalide
        bot.sendMessage(chatId, 'ID refusé. Veuillez créer un nouveau compte avec le code promo Bombe120 en cliquant sur le bouton ci-dessous:', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Créer un nouveau compte', url: 'https://1wyfsk.com/?open=register#ot61' }],
                    [{ text: 'Check✅️', callback_data: 'check_id' }]
                ]
            }
        });
    }
    awaitingId = false; // Réinitialiser l'état de l'attente après chaque message
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
