const tapa = document.querySelector('.tapa');
const mensaje = document.getElementById('mensaje');
const boton = document.getElementById('play');

// Crear el contexto de audio global
const context = new (window.AudioContext || window.webkitAudioContext)();

boton.addEventListener('click', () => {
  tapa.style.transform = 'rotateX(-90deg)';
  mensaje.classList.remove('oculto');
  mensaje.classList.add('visible');

  // Reanudar el contexto de audio antes de reproducir
  if (context.state === 'suspended') {
    context.resume().then(playMelody);
  } else {
    playMelody();
  }

  boton.disabled = true;
});

function playMelody() {
  const notes = [
    { freq: 264, dur: 0.3 }, { freq: 264, dur: 0.3 }, { freq: 297, dur: 0.6 }, { freq: 264, dur: 0.6 },
    { freq: 352, dur: 0.6 }, { freq: 330, dur: 1.2 },
    { freq: 264, dur: 0.3 }, { freq: 264, dur: 0.3 }, { freq: 297, dur: 0.6 }, { freq: 264, dur: 0.6 },
    { freq: 396, dur: 0.6 }, { freq: 352, dur: 1.2 },
    { freq: 264, dur: 0.3 }, { freq: 264, dur: 0.3 }, { freq: 528, dur: 0.6 }, { freq: 440, dur: 0.6 },
    { freq: 352, dur: 0.6 }, { freq: 330, dur: 0.6 }, { freq: 297, dur: 1.2 },
    { freq: 466, dur: 0.3 }, { freq: 466, dur: 0.3 }, { freq: 440, dur: 0.6 }, { freq: 352, dur: 0.6 },
    { freq: 396, dur: 0.6 }, { freq: 352, dur: 1.2 }
  ];

  let time = context.currentTime;
  notes.forEach(note => {
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.connect(gain);
    gain.connect(context.destination);

    osc.frequency.value = note.freq;
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.2, time);
    osc.start(time);
    osc.stop(time + note.dur);

    time += note.dur + 0.05;
  });
}
