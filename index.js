const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'igorekragn.aternos.me',
    port: 25565,
    username: 'AFK_Bot',
    version: false, // авто-определение для 1.21.11, если не зайдет - поставь "1.21.1"
    auth: 'offline'
  })

  bot.on('login', () => console.log('[BOT] Подключаюсь к igorekragn.aternos.me...'))
  bot.on('spawn', () => {
    console.log('[BOT] Зашел на сервер! Держу Aternos от сна.')
    
    // Анти-АФК каждые 30 сек - машет рукой и прыгает
    setInterval(() => {
      try {
        bot.swingArm('right')
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 200)
        // чуть двигаем головой чтобы не кикнуло за АФК
        bot.look(Math.random() * Math.PI * 2, 0, true)
      } catch(e) {}
    }, 30000)

    // пишем в чат раз в 5 мин что бот активен (по желанию убери)
    // setInterval(() => { try { bot.chat('AFK Bot online') } catch(e){} }, 300000)
  })

  bot.on('kicked', (reason) => {
    console.log('[BOT] Кикнуло:', reason)
    setTimeout(createBot, 5000)
  })

  bot.on('end', () => {
    console.log('[BOT] Отключился, переподключаюсь через 5 сек...')
    setTimeout(createBot, 5000)
  })

  bot.on('error', (err) => console.log('[BOT] Ошибка:', err.message))
}

createBot()

// keep-alive для хостингов типа Replit/Render (на bot-hosting.net не мешает)
try {
  require('http').createServer((req,res) => res.end('AFK Bot alive')).listen(3000)
} catch(e) {}
