const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: puppeteer.executablePath(),
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu"
    ]
  });

  const page = await browser.newPage();

  await page.goto("https://www.haxball.com/headless", {
    waitUntil: "networkidle2"
  });

  await page.exposeFunction("log", console.log);

  await page.evaluate(async () => {

    const room = HBInit({
      roomName: "Sala de Matix93",
      maxPlayers: 16,
      public: true,
      token: "thr1.AAAAAGom_LoThVzuMswXWQ.2LzITHNa-i8"
    });

    room.onPlayerJoin = (player) => {
      console.log(player.name + " entró a la sala");
    };

  });
})();
