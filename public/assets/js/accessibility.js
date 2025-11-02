(function () {
  const synth = window.speechSynthesis;
  let paused = false;
  let baseFont = 16; // default; will be initialized from computed style
  let voices = [];
  let queue = [];
  let qIndex = 0;

  function $(sel) { return document.querySelector(sel); }
  function textFromArticle() {
    const art = document.querySelector('main article') || document.querySelector('article') || document.body;
    return art.innerText.trim();
  }
  function setStatus(msg) {
    const s = $('.accessibility-widget .tts-status');
    if (s) s.textContent = msg;
  }
  function getRate() {
    const r = $('#tts-rate');
    const v = r ? Number(r.value) : 1.0;
    return isFinite(v) && v > 0 ? v : 1.0;
  }
  function loadVoices(onReady) {
    if (!('speechSynthesis' in window)) { setStatus('Read Aloud not supported on this browser.'); return; }
    
    voices = synth.getVoices();
    if (voices && voices.length) { 
      populateVoicesSelect(); 
      onReady && onReady(); 
      return; 
    }
    
    const onVoices = () => {
      voices = synth.getVoices();
      synth.removeEventListener('voiceschanged', onVoices);
      populateVoicesSelect();
      onReady && onReady();
    };
    
    synth.addEventListener('voiceschanged', onVoices);
    
    // Enhanced mobile support - try multiple approaches
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobile devices need extra time and different approaches
      setTimeout(() => {
        voices = synth.getVoices();
        if (voices.length === 0) {
          // Try triggering speech synthesis to wake up voices
          const testUtterance = new SpeechSynthesisUtterance('');
          testUtterance.volume = 0;
          synth.speak(testUtterance);
          
          setTimeout(() => {
            voices = synth.getVoices();
            populateVoicesSelect();
            onReady && onReady();
          }, 500);
        } else {
          populateVoicesSelect();
          onReady && onReady();
        }
      }, 2000); // Longer timeout for mobile
    } else {
      // Desktop fallback
      setTimeout(() => {
        voices = synth.getVoices();
        populateVoicesSelect();
        onReady && onReady();
      }, 1200);
    }
  }
  function pickVoice() {
    if (!voices || !voices.length) return null;
    
    // Get current page language from our language switcher
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Check if user manually selected a voice
    const sel = document.getElementById('tts-voice');
    if (sel && sel.value) {
      const [name, lang] = sel.value.split('|');
      const chosen = voices.find(v => v.name === name && v.lang === lang) || voices.find(v => v.name === name) || null;
      if (chosen) return chosen;
    }
    
    // Map our language codes to preferred voice languages
    const langMap = {
      'en': ['en-US', 'en-GB', 'en-AU', 'en-CA', 'en'],
      'ar': ['ar-SA', 'ar-EG', 'ar-AE', 'ar'],
      'de': ['de-DE', 'de-AT', 'de-CH', 'de'],
      'zh': ['zh-CN', 'zh-TW', 'zh-HK', 'zh']
    };
    
    const preferredLangs = langMap[currentLang] || ['en-US', 'en'];
    
    // Try to find a voice matching our preferred languages in order
    for (const prefLang of preferredLangs) {
      const voice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(prefLang.toLowerCase()));
      if (voice) {
        console.log('Selected voice:', voice.name, voice.lang, 'for language:', currentLang);
        return voice;
      }
    }
    
    // Fallback: avoid problematic voices like Assamese
    const problematicLangs = ['as_IN', 'as-IN', 'hi-IN', 'bn-IN'];
    const safeVoices = voices.filter(v => 
      !problematicLangs.some(prob => v.lang && v.lang.toLowerCase().includes(prob.toLowerCase()))
    );
    
    // Prefer English voices as final fallback
    const englishVoice = safeVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('en'));
    if (englishVoice) {
      console.log('Fallback to English voice:', englishVoice.name, englishVoice.lang);
      return englishVoice;
    }
    
    // Last resort: first safe voice or just first voice
    const finalChoice = safeVoices[0] || voices[0];
    console.log('Final fallback voice:', finalChoice?.name, finalChoice?.lang);
    return finalChoice;
  }
  function populateVoicesSelect() {
    const sel = document.getElementById('tts-voice');
    if (!sel) return;
    
    const prev = sel.value;
    sel.innerHTML = '<option value="">Auto-select best voice</option>';
    
    // Filter out problematic voices
    const problematicLangs = ['as_IN', 'as-IN', 'hi-IN', 'bn-IN'];
    const goodVoices = voices.filter(v => 
      !problematicLangs.some(prob => v.lang && v.lang.toLowerCase().includes(prob.toLowerCase()))
    );
    
    // Group voices by language family
    const groups = {
      'English': goodVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en')),
      'Arabic': goodVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('ar')),
      'German': goodVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('de')),
      'Chinese': goodVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('zh')),
      'Other': goodVoices.filter(v => {
        const lang = v.lang ? v.lang.toLowerCase() : '';
        return !lang.startsWith('en') && !lang.startsWith('ar') && 
               !lang.startsWith('de') && !lang.startsWith('zh');
      })
    };
    
    // Add voices grouped by language
    Object.entries(groups).forEach(([groupName, groupVoices]) => {
      if (groupVoices.length === 0) return;
      
      const optgroup = document.createElement('optgroup');
      optgroup.label = groupName;
      
      groupVoices.forEach(v => {
        const opt = document.createElement('option');
        opt.value = `${v.name}|${v.lang}`;
        opt.textContent = `${v.name} (${v.lang})${v.default ? ' — default' : ''}`;
        optgroup.appendChild(opt);
      });
      
      sel.appendChild(optgroup);
    });
    
    // Restore previous selection if it still exists
    if (prev) {
      const found = Array.from(sel.options).find(o => o.value === prev);
      if (found) sel.value = prev;
    }
  }
  function chunkText(text, maxLen = 1500) {
    // Split on sentence boundaries where possible
    const sentences = text.replace(/\s+/g, ' ').split(/([.!?]\s)/g);
    const chunks = [];
    let buf = '';
    for (let i = 0; i < sentences.length; i++) {
      const part = sentences[i];
      if (!part) continue;
      if ((buf + part).length <= maxLen) {
        buf += part;
      } else {
        if (buf) chunks.push(buf.trim());
        if (part.length > maxLen) {
          // Hard split very long piece
          for (let j = 0; j < part.length; j += maxLen) {
            chunks.push(part.slice(j, j + maxLen));
          }
          buf = '';
        } else {
          buf = part;
        }
      }
    }
    if (buf) chunks.push(buf.trim());
    return chunks.filter(Boolean);
  }
  function startQueue(chunks) {
    queue = chunks;
    qIndex = 0;
    if (!queue.length) { setStatus('Nothing to read on this page.'); return; }
    setStatus(`Reading… (1/${queue.length})`);
    playCurrent();
  }
  function playCurrent() {
    if (qIndex >= queue.length) { setStatus('Finished reading.'); return; }
    const txt = queue[qIndex];
    const u = new SpeechSynthesisUtterance(txt);
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = getRate();
    u.onerror = (e) => {
      setStatus(`Error during reading${e && e.error ? ': ' + e.error : ''}.`);
      // Try to proceed to next chunk to avoid getting stuck
      qIndex++;
      playCurrent();
    };
    u.onend = () => {
      qIndex++;
      if (qIndex < queue.length) {
        setStatus(`Reading… (${qIndex + 1}/${queue.length})`);
        playCurrent();
      } else {
        setStatus('Finished reading.');
      }
    };
    paused = false;
    synth.speak(u);
  }
  function speak() {
    if (!('speechSynthesis' in window)) { setStatus('Read Aloud not supported on this browser.'); return; }
    const text = textFromArticle();
    if (!text) { setStatus('Nothing to read on this page.'); return; }
    try { if (synth.speaking || synth.paused) synth.cancel(); } catch(_) {}
    loadVoices(() => {
      const chunks = chunkText(text);
      startQueue(chunks);
    });
  }
  function speakSelection() {
    if (!('speechSynthesis' in window)) { setStatus('Read Aloud not supported on this browser.'); return; }
    const sel = window.getSelection ? String(window.getSelection()) : '';
    const text = (sel || '').trim();
    if (!text) { setStatus('No text selected. Select some text and try again.'); return; }
    try { if (synth.speaking || synth.paused) synth.cancel(); } catch(_) {}
    loadVoices(() => {
      const chunks = chunkText(text);
      startQueue(chunks);
    });
  }
  function pause() {
    if (!('speechSynthesis' in window)) return;
    if (synth.speaking && !synth.paused) {
      synth.pause();
      paused = true;
      setStatus('Paused');
    } else if (synth.paused) {
      synth.resume();
      paused = false;
      setStatus(`Reading… (${Math.min(qIndex + 1, queue.length)}/${queue.length || 1})`);
    }
  }
  function stop() {
    if (!('speechSynthesis' in window)) return;
    try { synth.cancel(); } catch(_) {}
    queue = [];
    qIndex = 0;
    setStatus('Stopped');
  }
  function updateRate() {
    // Restart reading at current chunk boundary with new rate
    if (!queue.length) return;
    const remaining = queue.slice(qIndex);
    try { synth.cancel(); } catch(_) {}
    qIndex = 0;
    queue = remaining;
    setStatus(`Reading… (${Math.min(qIndex + 1, queue.length)}/${queue.length})`);
    playCurrent();
  }
  function toggleReaderMode() {
    document.body.classList.toggle('reader-mode');
  }
  function adjustFont(delta) {
    if (!baseFont) {
      baseFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    }
    const current = parseFloat(getComputedStyle(document.body).fontSize) || baseFont;
    const next = Math.max(14, Math.min(24, current + delta));
    document.body.style.fontSize = next + 'px';
  }

  // Function to refresh TTS when language changes
  function refreshTTSForLanguage() {
    if ('speechSynthesis' in window) {
      loadVoices(() => {
        // Reset voice selection to auto-select for new language
        const voiceSel = document.getElementById('tts-voice');
        if (voiceSel) {
          voiceSel.value = ''; // Reset to auto-select
        }
        
        // Stop any current reading
        try { synth.cancel(); } catch(_) {}
        queue = [];
        qIndex = 0;
        setStatus('Ready for new language');
      });
    }
  }

  // Expose this function globally so lang-switcher.js can call it
  window.refreshTTSForLanguage = refreshTTSForLanguage;

  function init() {
    const root = document.querySelector('.accessibility-widget');
    if (!root) return;

    const play = document.getElementById('tts-play');
    const pauseBtn = document.getElementById('tts-pause');
    const stopBtn = document.getElementById('tts-stop');
    const rate = document.getElementById('tts-rate');
    const reader = document.getElementById('reader-mode');
    const plus = document.getElementById('font-plus');
    const minus = document.getElementById('font-minus');
    const voiceSel = document.getElementById('tts-voice');
    const readSelBtn = document.getElementById('tts-selection');

    play && play.addEventListener('click', speak);
    pauseBtn && pauseBtn.addEventListener('click', pause);
    stopBtn && stopBtn.addEventListener('click', stop);
    rate && rate.addEventListener('input', updateRate);
    reader && reader.addEventListener('click', toggleReaderMode);
    plus && plus.addEventListener('click', () => adjustFont(1));
    minus && minus.addEventListener('click', () => adjustFont(-1));
    readSelBtn && readSelBtn.addEventListener('click', speakSelection);
    voiceSel && voiceSel.addEventListener('change', () => {
      // Restart current reading with new voice
      if (queue.length) {
        const remaining = queue.slice(qIndex);
        try { synth.cancel(); } catch(_) {}
        qIndex = 0;
        queue = remaining;
        setStatus(`Reading… (${Math.min(qIndex + 1, queue.length)}/${queue.length})`);
        playCurrent();
      }
    });

    // Preload voices early to avoid errors
    if ('speechSynthesis' in window) {
      loadVoices();
    }

    // Initialize base font size
    baseFont = parseFloat(getComputedStyle(document.body).fontSize) || 16;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
