(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const eventStart = Date.parse('2026-12-25T17:00:00+05:30');
  const eventTitle = 'Nikah & Valima of Anees Syed & Sakinah Begum';
  const venue = 'Royal Banquet Hall, 45, Kammanahalli Main Road, above A2B Hotel, Indra Nagar, Ramaiah Layout, Kalyan Nagar, Bengaluru, Karnataka 560084';
  const eventDetails = 'With the blessings of Allah, join us for the Nikah and Valima of Anees Syed and Sakinah Begum. Inshallah on Friday, 25 December 2026. Nikah: After Namaz-e-Asar. Valima: 7:30 PM onwards. Both ceremonies will be held at Royal Banquet Hall. Your presence and duas are warmly welcomed.';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shell = $('site-shell');
  const envelope = $('envelope');
  const music = $('music');
  const musicButton = $('music-toggle');
  let opened = false;
  shell.inert = true;
  music.volume = 0.26;

  function updateMusicState() {
    const isPlaying = !music.paused;
    musicButton.setAttribute('aria-pressed', String(isPlaying));
    musicButton.setAttribute('aria-label', isPlaying ? 'Mute instrumental music' : 'Play instrumental music');
    musicButton.title = isPlaying ? 'Mute instrumental music' : 'Play instrumental music';
    $('music-icon').setAttribute('href', isPlaying ? '#sound-icon' : '#mute-icon');
  }
  async function playMusic() {
    try { await music.play(); } catch (_) { /* Playback is optional if the browser declines audio. */ }
    updateMusicState();
  }
  music.addEventListener('play', updateMusicState);
  music.addEventListener('pause', updateMusicState);
  music.addEventListener('error', () => {
    musicButton.title = 'Music could not load. Tap to try again.';
    updateMusicState();
  });
  musicButton.addEventListener('click', () => {
    if (music.paused) playMusic(); else music.pause();
  });

  $('open-invitation').addEventListener('click', () => {
    if (opened) return;
    opened = true;
    shell.style.visibility = 'visible';
    shell.inert = false;
    envelope.classList.add('opening');
    document.body.classList.add('invitation-open');
    musicButton.hidden = false;
    playMusic();
    window.setTimeout(() => {
      envelope.classList.add('opened');
      envelope.setAttribute('aria-hidden', 'true');
      envelope.removeAttribute('aria-modal');
      envelope.inert = true;
      document.body.style.overflow = 'auto';
      const heading = $('couple-title');
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      window.setTimeout(() => { envelope.hidden = true; }, reducedMotion ? 0 : 1000);
    }, reducedMotion ? 30 : 1550);
  });

  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.09, rootMargin: '0px 0px -12px 0px' });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }

  if (!reducedMotion) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 27; i++) {
      const star = document.createElement('i');
      const size = 1.5 + (i * 7 % 4);
      star.style.cssText = `left:${(i * 37 + 7) % 100}%;top:${(i * 23 + 3) % 96}%;width:${size}px;height:${size}px;--duration:${4 + i % 5}s;--delay:-${i % 9}s`;
      fragment.append(star);
    }
    $('sparkles').append(fragment);
  }

  function countdownParts(now) {
    const total = Math.max(0, Math.floor((eventStart - now) / 1000));
    return {
      days: Math.floor(total / 86400),
      hours: Math.floor(total % 86400 / 3600),
      minutes: Math.floor(total % 3600 / 60),
      seconds: total % 60
    };
  }
  function tick() {
    const now = Date.now();
    const parts = countdownParts(now);
    for (const [id, value] of Object.entries(parts)) {
      const label = String(value).padStart(2, '0');
      if ($(id).textContent !== label) $(id).textContent = label;
    }
    if (now >= eventStart) {
      const isEventDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now) === '2026-12-25';
      $('countdown-note').textContent = isEventDay ? 'Our blessed day is here. Alhamdulillah!' : 'A beautiful beginning. Thank you for your love and duas.';
    }
  }
  tick();
  window.setInterval(tick, 1000);

  const canvas = $('scratch-canvas');
  const card = $('scratch-card');
  const cardContent = $('date-card-content');
  const revealButton = $('reveal-date');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let revealed = false;
  let drawing = false;
  let lastPoint = null;
  let strokes = 0;
  let cardWidth = 0;
  let cardHeight = 0;
  let pixelRatio = 1;
  let foilPixels = [];

  function heartPath() {
    const w = cardWidth, h = cardHeight;
    ctx.beginPath();
    ctx.moveTo(w * .5, h * .94);
    ctx.bezierCurveTo(w * .43, h * .87, w * .04, h * .61, w * .04, h * .32);
    ctx.bezierCurveTo(w * .04, h * .10, w * .17, h * .04, w * .29, h * .055);
    ctx.bezierCurveTo(w * .38, h * .055, w * .46, h * .11, w * .5, h * .18);
    ctx.bezierCurveTo(w * .54, h * .11, w * .62, h * .055, w * .71, h * .055);
    ctx.bezierCurveTo(w * .83, h * .04, w * .96, h * .10, w * .96, h * .32);
    ctx.bezierCurveTo(w * .96, h * .61, w * .57, h * .87, w * .5, h * .94);
    ctx.closePath();
  }

  function celebrateHeart() {
    if (reducedMotion) return;
    const burst = $('heart-burst');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 14; i++) {
      const particle = document.createElement('span');
      const angle = i * Math.PI * 2 / 14;
      const distance = cardWidth * (.44 + (i % 3) * .07);
      particle.textContent = i % 3 === 0 ? '✦' : '♥';
      particle.style.cssText = `--dx:${Math.cos(angle) * distance}px;--dy:${Math.sin(angle) * distance}px;--turn:${(i % 2 ? 1 : -1) * 35}deg;--delay:${i % 4 * 25}ms`;
      fragment.append(particle);
    }
    burst.append(fragment);
    window.setTimeout(() => { burst.replaceChildren(); }, 1400);
  }

  function revealDate() {
    if (revealed) return;
    revealed = true;
    drawing = false;
    card.classList.add('revealed');
    celebrateHeart();
    cardContent.removeAttribute('aria-hidden');
    $('scratch-hint').textContent = '25th December 2026 · Friday — a date to remember.';
    $('date-announcement').textContent = 'You are invited to our Nikah and Valima on Friday, 25th December 2026.';
    revealButton.textContent = 'Date revealed';
    revealButton.setAttribute('aria-disabled', 'true');
    revealButton.style.textDecoration = 'none';
    revealButton.style.opacity = '.65';
  }
  function drawFoil() {
    if (revealed || !ctx) return;
    const rect = card.getBoundingClientRect();
    cardWidth = rect.width;
    cardHeight = rect.height;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cardWidth * pixelRatio);
    canvas.height = Math.round(cardHeight * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.save();
    heartPath();
    ctx.clip();
    const gradient = ctx.createLinearGradient(0, 0, cardWidth, cardHeight);
    gradient.addColorStop(0, '#f7e8eb');
    gradient.addColorStop(.25, '#dfc3c8');
    gradient.addColorStop(.52, '#fdf7f8');
    gradient.addColorStop(.78, '#e4c8ce');
    gradient.addColorStop(1, '#f0dbdf');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, cardWidth, cardHeight);
    for (let i = 0; i < 2100; i++) {
      ctx.fillStyle = i % 2 ? '#fdf7f855' : '#631d2b16';
      ctx.fillRect((i * 139.31) % cardWidth, (i * 83.77) % cardHeight, 1, 1);
    }
    ctx.fillStyle = '#8b2337';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${cardWidth * .055}px Georgia`;
    ctx.fillText('♡', cardWidth / 2, cardHeight * .30);
    ctx.font = `${cardWidth * .12}px "Great Vibes", cursive`;
    ctx.fillText('Scratch to', cardWidth / 2, cardHeight * .435);
    ctx.fillText('Reveal', cardWidth / 2, cardHeight * .57);
    ctx.font = `${cardWidth * .025}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText('OUR SPECIAL DAY', cardWidth / 2, cardHeight * .685);
    ctx.restore();
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    foilPixels = [];
    for (let index = 3; index < pixels.length; index += 80) {
      if (pixels[index] > 100) foilPixels.push(index);
    }
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 46;
  }
  function point(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
  function scratch(event) {
    if (!drawing || revealed || !ctx) return;
    const current = point(event);
    ctx.beginPath();
    ctx.moveTo(lastPoint ? lastPoint.x : current.x, lastPoint ? lastPoint.y : current.y);
    ctx.lineTo(current.x, current.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(current.x, current.y, 23, 0, Math.PI * 2);
    ctx.fill();
    lastPoint = current;
    strokes++;
    if (strokes % 8 === 0) checkCoverage();
  }
  function checkCoverage() {
    if (revealed || !ctx || !canvas.width) return;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (const index of foilPixels) {
      if (pixels[index] < 100) clear++;
    }
    if (foilPixels.length && clear / foilPixels.length > .32) revealDate();
  }
  if (ctx) {
    cardContent.setAttribute('aria-hidden', 'true');
    drawFoil();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawFoil);
    canvas.addEventListener('pointerdown', event => {
      if (revealed) return;
      event.preventDefault();
      drawing = true;
      lastPoint = null;
      canvas.setPointerCapture(event.pointerId);
      scratch(event);
    });
    canvas.addEventListener('pointermove', scratch);
    canvas.addEventListener('pointerup', () => { drawing = false; lastPoint = null; checkCoverage(); });
    canvas.addEventListener('pointercancel', () => { drawing = false; lastPoint = null; });
    if ('ResizeObserver' in window) new ResizeObserver(() => {
      if (!revealed && Math.abs(card.getBoundingClientRect().width - cardWidth) > 1) drawFoil();
    }).observe(card);
  } else {
    revealDate();
  }
  revealButton.addEventListener('click', revealDate);

  const options = $('calendar-options');
  const calendarToggle = $('calendar-toggle');
  function setCalendarOpen(open) {
    options.hidden = !open;
    calendarToggle.setAttribute('aria-expanded', String(open));
  }
  calendarToggle.addEventListener('click', () => setCalendarOpen(options.hidden));
  document.addEventListener('click', event => {
    if (!event.target.closest('.calendar-wrap')) setCalendarOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !options.hidden) { setCalendarOpen(false); calendarToggle.focus(); }
  });
  $('google-calendar').href = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({
    action: 'TEMPLATE', text: eventTitle, dates: '20261225T113000Z/20261225T113000Z',
    details: eventDetails, location: venue, ctz: 'Asia/Kolkata'
  }).toString();

  function escapeICS(text) {
    return text.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }
  function foldICS(line) {
    let result = '';
    let length = 0;
    for (const char of line) {
      const bytes = new TextEncoder().encode(char).length;
      if (length + bytes > 73) { result += '\r\n '; length = 1; }
      result += char;
      length += bytes;
    }
    return result;
  }
  function calendarFile() {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    return [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Anees and Sakinah//Nikah and Valima Invitation//EN',
      'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
      'UID:sakinah-aneesuddin-nikah-20261225@invitation.local',
      'DTSTAMP:' + stamp, 'DTSTART:20261225T113000Z',
      'SUMMARY:' + escapeICS(eventTitle), 'LOCATION:' + escapeICS(venue),
      'DESCRIPTION:' + escapeICS(eventDetails), 'STATUS:CONFIRMED',
      'END:VEVENT', 'END:VCALENDAR', ''
    ].map(foldICS).join('\r\n');
  }
  $('download-calendar').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([calendarFile()], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Anees-Sakinah-Nikah-Valima.ics';
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    setCalendarOpen(false);
  });
})();
