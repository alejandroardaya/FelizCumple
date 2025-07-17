const tapa = document.querySelector('.tapa');
const mensaje = document.getElementById('mensaje');
const boton = document.getElementById('play');

const context = new (window.AudioContext || window.webkitAudioContext)();

boton.addEventListener('click', () => {
  tapa.style.transform = 'rotateX(-90deg)';
  mensaje.classList.remove('oculto');
  mensaje.classList.add('visible');

  if (context.state === 'suspended') {
    context.resume().then(playMelody);
  } else {
    playMelody();
  }

  boton.disabled = true;
});

// Mapeo de notas musicales a frecuencias (Hz)
const noteFrequencies = {
  'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25,
  'E5': 659.25, 'F#5': 739.99, 'G#5': 830.61,
  'F#4': 369.99
};

// Melodía de “La Vie en Rose” — simplificada para trompeta
const melody = [
  ['B4', 0.3], ['C#5', 0.3], ['D5', 0.3], ['E5', 0.3], ['D5', 0.3], ['B4', 0.3], ['G#4', 0.6],
  ['B4', 0.3], ['C#5', 0.3], ['D5', 0.3], ['E5', 0.3], ['F#5', 0.3], ['E5', 0.3], ['D5', 0.6],
  ['E5', 0.3], ['F#5', 0.3], ['E5', 0.3], ['D5', 0.3], ['C#5', 0.3], ['A4', 0.3], ['B4', 0.3], ['G#4', 0.3],
  ['E5', 0.3], ['F#5', 0.3], ['G#5', 0.3], ['F#5', 0.3], ['E5', 0.3], ['D5', 0.3], ['C#5', 0.6],
  ['D5', 0.3], ['E5', 0.3], ['F#5', 0.3], ['E5', 0.3], ['D5', 0.3], ['B4', 0.3], ['C#5', 0.3], ['A4', 0.6],
  ['F#4', 0.6], ['F#4', 0.6], ['F#4', 0.6], ['F#4', 0.6],
  ['G#4', 0.3], ['A4', 0.3], ['B4', 0.3], ['C#5', 0.3], ['B4', 0.3], ['G#4', 0.3], ['E5', 0.3], ['D5', 0.3],
  ['C#5', 0.3], ['B4', 0.3], ['G#4', 0.6], ['A4', 0.6], ['B4', 1.2]
];

function playMelody() {
  let time = context.currentTime;

  melody.forEach(([note, dur]) => {
    const freq = noteFrequencies[note];
    if (!freq) return;

    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.frequency.value = freq;
    osc.type = 'sine';

    osc.connect(gain);
    gain.connect(context.destination);

    gain.gain.setValueAtTime(0.2, time);
    osc.start(time);
    osc.stop(time + dur);

    time += dur + 0.05; // pequeña pausa entre notas
  });
}
