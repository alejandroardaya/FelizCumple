<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Cajita Musical La Vie en Rose</title>
<style>
  body {
    background: #fcefdc;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: 'DM Sans', sans-serif;
    margin: 0;
  }
  .cajita {
    position: relative;
    width: 320px;
  }
  .tapa {
    position: absolute;
    top: 0;
    width: 320px;
    height: 80px;
    background: #a0522d;
    border-radius: 12px 12px 0 0;
    transform-origin: top center;
    transition: transform 1.2s ease-out;
    z-index: 2;
  }
  .base {
    margin-top: 80px;
    width: 320px;
    height: 250px;
    background: #cd853f;
    border-radius: 0 0 12px 12px;
    padding: 20px;
    text-align: center;
    color: #4b2e0c;
    position: relative;
    z-index: 1;
  }
  #mensaje {
    font-size: 20px;
    opacity: 0;
    transition: opacity 1.5s ease-in;
    margin-top: 30px;
  }
  #mensaje.visible {
    opacity: 1;
  }
  #play {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
</style>
</head>
<body>
  <div class="cajita">
    <div class="tapa"></div>
    <div class="base">
      <p id="mensaje">Feliz cumple Chule de mi corazón, Dios te bendiga mucho.</p>
      <button id="play">🎵 Abrir caja</button>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/tone@14.7.77/build/Tone.min.js"></script>
  <script>
    const tapa = document.querySelector('.tapa');
    const mensaje = document.getElementById('mensaje');
    const boton = document.getElementById('play');

    const notesLaVieEnRose = [
      ["B4", "8n"], ["C#5", "8n"], ["D5", "8n"], ["E5", "8n"], ["D5", "8n"], ["B4", "8n"], ["G#4", "4n."],
      ["B4", "8n"], ["C#5", "8n"], ["D5", "8n"], ["E5", "8n"], ["F#5", "8n"], ["E5", "8n"], ["D5", "4n"],
      ["E5", "8n"], ["F#5", "8n"], ["E5", "8n"], ["D5", "8n"], ["C#5", "8n"], ["A4", "8n"], ["B4", "8n"], ["G#4", "8n"],
      ["E5", "8n"], ["F#5", "8n"], ["G#5", "8n"], ["F#5", "8n"], ["E5", "8n"], ["D5", "8n"], ["C#5", "4n"],
      ["D5", "8n"], ["E5", "8n"], ["F#5", "8n"], ["E5", "8n"], ["D5", "8n"], ["B4", "8n"], ["C#5", "8n"], ["A4", "4n"],
      ["F#4", "4n"], ["F#4", "4n"], ["F#4", "4n"], ["F#4", "4n"],
      ["G#4", "8n"], ["A4", "8n"], ["B4", "8n"], ["C#5", "8n"], ["B4", "8n"], ["G#4", "8n"], ["E5", "8n"], ["D5", "8n"],
      ["C#5", "8n"], ["B4", "8n"], ["G#4", "4n"], ["A4", "4n"], ["B4", "2n"]
    ];

    const synth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.05, decay: 0.2, sustain: 0.3, release: 1 }
    }).toDestination();

    const speedFactor = 1.5;

    boton.addEventListener('click', async () => {
      boton.disabled = true;

      await Tone.start();

      tapa.style.transform = 'rotateX(-90deg)';
      mensaje.classList.add('visible');

      let now = Tone.now();
      notesLaVieEnRose.forEach(([note, duration]) => {
        const durSeconds = Tone.Time(duration).toSeconds() * speedFactor;
        synth.triggerAttackRelease(note, durSeconds, now);
        now += durSeconds;
      });
    });
  </script>
</body>
</html>
