const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/opt/pw-browsers/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.createBrowserContext({
    viewport: { width: 375, height: 812 }
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

  // Screenshot 1: Hero
  await page.screenshot({ path: '/tmp/mobile-1-hero.png', fullPage: false });
  console.log('✓ Hero-Section');

  // Screenshot 2: About
  await page.evaluate(() => document.getElementById('ueber-uns')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/tmp/mobile-2-about.png', fullPage: false });
  console.log('✓ About-Section');

  // Screenshot 3: Gallery
  await page.evaluate(() => document.getElementById('galerie')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/tmp/mobile-3-gallery.png', fullPage: false });
  console.log('✓ Gallery-Section');

  // Screenshot 4: Services
  await page.evaluate(() => document.getElementById('leistungen')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/tmp/mobile-4-services.png', fullPage: false });
  console.log('✓ Services-Section');

  // Screenshot 5: Team
  await page.evaluate(() => document.getElementById('team')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/tmp/mobile-5-team.png', fullPage: false });
  console.log('✓ Team-Section');

  // Screenshot 6: Reviews
  await page.evaluate(() => document.getElementById('rezensionen')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/tmp/mobile-6-reviews.png', fullPage: false });
  console.log('✓ Reviews-Section');

  // Screenshot 7: Contact
  await page.evaluate(() => document.getElementById('standort')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/tmp/mobile-7-contact.png', fullPage: false });
  console.log('✓ Contact-Section');

  await browser.close();
  console.log('\n✅ Alle Screenshots erstellt!');
})();
