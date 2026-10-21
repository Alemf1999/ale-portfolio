// ============================================
// MODAL DE CONTACTO
// ============================================

const animatedCursor = document.getElementById('animated-cursor');

if (animatedCursor && window.matchMedia('(pointer: fine)').matches) {
  document.body.appendChild(animatedCursor);
  document.documentElement.classList.add('has-animated-cursor');

  window.addEventListener('pointermove', (event) => {
    animatedCursor.style.left = `${event.clientX}px`;
    animatedCursor.style.top = `${event.clientY}px`;
    animatedCursor.classList.add('is-visible');
  });

  window.addEventListener('pointerleave', () => {
    animatedCursor.classList.remove('is-visible');
  });

  window.addEventListener('pointerenter', () => {
    animatedCursor.classList.add('is-visible');
  });
}

const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');

if (backgroundMusic && musicToggle) {
  const musicStateKey = 'portfolio-background-music';
  let savedMusicState = null;

  try {
    const storedMusicState = sessionStorage.getItem(musicStateKey);
    if (storedMusicState) {
      const parsedState = JSON.parse(storedMusicState);
      if (parsedState && typeof parsedState === 'object'
        && Number.isFinite(parsedState.time)) {
        savedMusicState = {
          time: parsedState.time,
          userPaused: parsedState.userPaused === true
        };
      }
    }
  } catch (error) {
    console.error('No se pudo restaurar el estado de la música:', error);
  }
  let userPaused = savedMusicState ? savedMusicState.userPaused : false;

  function syncMusicToggle() {
    const isPlaying = !backgroundMusic.paused;
    musicToggle.textContent = isPlaying ? '♪' : '♫';
    musicToggle.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
  }

  function playBackgroundMusic() {
    backgroundMusic.play().catch((error) => {
      syncMusicToggle();
      if (error.name !== 'NotAllowedError') {
        console.error('No se pudo reproducir la música de fondo:', error);
      }
    });
  }

  function restoreMusicState() {
    if (!savedMusicState) return;

    const maxTime = Number.isFinite(backgroundMusic.duration)
      ? Math.max(0, backgroundMusic.duration - 0.1)
      : savedMusicState.time;
    backgroundMusic.currentTime = Math.min(savedMusicState.time, maxTime);

    if (userPaused) {
      syncMusicToggle();
    } else {
      playBackgroundMusic();
    }
  }

  musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
      userPaused = false;
      playBackgroundMusic();
    } else {
      userPaused = true;
      backgroundMusic.pause();
      syncMusicToggle();
    }
  });

  backgroundMusic.addEventListener('play', syncMusicToggle);
  backgroundMusic.addEventListener('pause', syncMusicToggle);
  backgroundMusic.addEventListener('error', () => {
    musicToggle.setAttribute(
      'aria-label',
      document.documentElement.lang === 'en' ? 'Music unavailable' : 'Música no disponible'
    );
    console.error('No se pudo cargar el archivo de música:', backgroundMusic.currentSrc);
  });

  window.addEventListener('pagehide', () => {
    try {
      sessionStorage.setItem(musicStateKey, JSON.stringify({
        time: backgroundMusic.currentTime,
        userPaused
      }));
    } catch (error) {
      console.error('No se pudo guardar el estado de la música:', error);
    }
  });

  if (savedMusicState) {
    if (backgroundMusic.readyState >= 1) {
      restoreMusicState();
    } else {
      backgroundMusic.addEventListener('loadedmetadata', restoreMusicState, { once: true });
    }
  } else {
    playBackgroundMusic();
  }
}

const contactModal = document.getElementById('contact-modal');
const openContactBtn = document.getElementById('open-contact');

if (contactModal && openContactBtn) {
  const closeContactBtn = document.getElementById('close-contact');

  function openContactModal() {
    contactModal.classList.add('is-open');
    contactModal.setAttribute('aria-hidden', 'false');
  }

  function closeContactModal() {
    contactModal.classList.remove('is-open');
    contactModal.setAttribute('aria-hidden', 'true');
  }

  openContactBtn.addEventListener('click', openContactModal);

  if (closeContactBtn) {
    closeContactBtn.addEventListener('click', closeContactModal);
  }

  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      closeContactModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('is-open')) {
      closeContactModal();
    }
  });
}

// ============================================
// PROYECTOS: DATOS DE LOS PROYECTOS
// ============================================
// Para editar un proyecto, cambia sus datos aquí.
// El "id" debe coincidir con el data-project de la
// tarjeta correspondiente en works.html.
// "images" es la lista de fotos que aparecen en la
// columna derecha del modal (puedes poner las que quieras).
// Si una imagen no existe todavía en assets/images/,
// se muestra un bloque de color en su lugar.

const projectsData = {

"Consorte II": {
    title: "Consorte II",
    category: "Editorial",
    meta: "Procreate ✩ 2026",
    reel: "https://www.instagram.com/reel/DYmxg3NsGR5/",
    description: "Para esta segunda parte quise mostrar a una protagonista mucho más <strong>guerrera</strong>, en contraposición a la primera entrega. Mantenemos el <strong>gripher</strong> como elemento de la historia, pero con una paleta mucho más <strong>colorida y primaveral</strong>, con tonos rosados y detalles en el lomo. El mayor reto fue encajar la <strong>sinopsis</strong> sin quitarle protagonismo a la contraportada ya que en un primer momento no se iba a incluir sinopsis, y me gustó mucho el resultado final. ",
      images: [
      "assets/images/proyectos/Consorte 2/consorte 1.png",
      "assets/images/proyectos/Consorte 2/consorte 2.jpg",
      "assets/images/proyectos/Consorte 2/consorte 3.png",
      "assets/images/proyectos/Consorte 2/consorte 4.jpg"
    ]
  },


  "sirenas": {
    title: "Sirenas",
    category: "Ilustración",
    meta: "Procreate ✩ 2026",
    reel: "https://www.instagram.com/reel/DYmxg3NsGR5/",
    description: "Ilustración que surgió como una practica para poder ilustrar de una forma más organizada, pasé más tiempo del habitual <b>perfeccionando el boceto</b> para poder hacer una mejor ilustración final, esta ilustración formó parte de <b>mail club de mayo</b>.",
    images: [
      "assets/images/proyectos/sirenas/sirenas 1.gif",
      "assets/images/proyectos/sirenas/sirenas 2.png",
      "assets/images/proyectos/sirenas/sirenas 3.jpg",
    ]
  },
  "astral": {
    title: "Astral",
    category: "Ilustración",
    meta: "Procreate ✩ 2024",
    reel: "",
    description: "Inicialmente esta ilustración la hice varios años antes (2022) pero decidí <b>rediseñarla</b>, utilicé una imagen de referencia para la pose de la chica, en esta época me enfoque en el retrato y la mirada, era algo que me interesaba mucho.",
    images: [
      "assets/images/proyectos/astral/astral 1.jpg",
      "assets/images/proyectos/astral/astral 2.png",
      "assets/images/proyectos/astral/astral 3.jpg",
    ]
  },

"bruja": {
    title: "Bruja",
    category: "Ilustración",
    meta: "Procreate ✩ 2026",
    reel: "",
    description: "Siempre me ha costado trabajar los <strong>fondos</strong>, así que en esta ilustración quise probar una perspectiva diferente. Me costó bastante, pero también disfruté añadiendo muchos detalles a la habitación. Buscaba una estética <strong>otoñal, brujil y acogedora</strong>, y al final me gustó mucho el resultado.",
    images: [
      "assets/images/proyectos/habitacion bruja/bruja 1.gif",
      "assets/images/proyectos/habitacion bruja/bruja 2.png"
    ]
  },


  "111": {
    title: "111",
    category: "Ilustración",
    meta: "Procreate ✩ 2026",
    reel: "",
    description: "Esta ilustración formó parte del <b>mail club de septiembre</b> con la temática de la espiritualidad, es una ilustración que me tomó 4h aprox. Está inspirada en la carta del <b>tarot de la estrella</b>.",
    images: [
      "assets/images/proyectos/111/111 1.gif",
      "assets/images/proyectos/111/111 2.jpg",
      "assets/images/proyectos/111/111 3.jpg",
    ]
  },
  "calendario-de-adviento": {
    title: "Calendario de Adviento",
    category: "Web/Apps",
    meta: "Wordpress ✩ 2024",
    reel: "https://www.instagram.com/reel/DC4k269sf7o/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    description: "Este calendario de adviento fue uno de mis primeros proyectos en wordpress, se trata de un <b>calendario interactivo</b>, automaticamente los regalos se desbloquean según van llegando los días, además incluí <b>música navideña</b> dandole click al título, para poder hacer el <b>HTML+CSS+JS</b> me ayudé de chatgpt y tutoriales de youtube.",
    images: [
      "assets/images/proyectos/calendario adviento/calendario 1.gif",
      "assets/images/proyectos/calendario adviento/calendario 2.png",
      "assets/images/proyectos/calendario adviento/calendario 3.jpg",
      "assets/images/proyectos/calendario adviento/calendario 4.jpg",
      "assets/images/proyectos/calendario adviento/calendario 5.jpg",
    ]
  },
  "amor-implacable": {
    title: "Amor Implacable",
    category: "Editorial",
    meta: "Procreate ✩ 2025",
    reel: "https://www.instagram.com/reel/DNLoiXKscOD/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    description: "Esta portada fue para el <b>mafia romance \"Amor implacable\"</b> Buscamos que la portada reflejase la fuerza de la <b>protagonista</b> y que ella era la \"dominante\" en esta historia, pero que claramente destacase el romance.",
    images: [
      "assets/images/proyectos/amor/amor 1.jpg",
      "assets/images/proyectos/amor/amor 2.jpg",
      "assets/images/proyectos/amor/amor 3.jpg",
    ]
  },
  "calendario-de-adviento-2-0": {
    title: "Calendario de Adviento 2.0",
    category: "Web/Apps",
    meta: "Wordpress ✩ 2026",
    reel: "https://www.instagram.com/reel/DRt-aCbjHLM/",
    description: "Este proyecto fue otro calendario de adviento pero en <b>formato app</b> usando Visual Studio Code, la idea era regalarlo a las personas de mi patreon, cada día habían ejercicios que ayudaban a <b>desbloquear la creatividad</b>, para ver una mejora en esos 24 días, se elaboró mediante <b>vibe coding</b> y las ilustraciones las hice yo en Procreate.",
    images: [
      "assets/images/proyectos/calendario/calendario 1.gif",
      "assets/images/proyectos/calendario/calendario 2.jpg",
      "assets/images/proyectos/calendario/calendario 3.png"    
    ]
  },

"No me pidas clemencia": {
    title: "No me pidas clemencia",
    category: "Editorial",
    meta: "Procreate ✩ 2026",
    reel: "",
    description: "En esta portada trabajé con dos protagonistas, uno masculino, que siempre supone un reto para mí, ya que estoy más acostumbrada a dibujar personajes femeninos. La idea era crear una estética <strong>oscura y misteriosa</strong>, propia de un thriller, pero sin perder la <strong>tensión romántica</strong> entre ambos personajes.",
    images: [
      "assets/images/proyectos/clemencia/clemencia 3.png",
      "assets/images/proyectos/clemencia/clemencia 2.png",
      "assets/images/proyectos/clemencia/clemencia 1.png"    
    ]
  },


  "pichi-pichi-pitch": {
    title: "Pichi pichi pitch",
    category: "Ilustración",
    meta: "Procreate ✩ 2026",
    reel: "https://www.instagram.com/reel/DbsZ8jisYNS/",
    description: "Esta ilustración formó parte del <b>mail club de agosto</b>, está inspirada en la serie <b>Pichi pichi pitch</b>, esta marcó mi infancia y mi concepción del <b>amor</b>, y quisé explorar la intensidad que sentía en su momento.",
    images: [
      "assets/images/proyectos/pichi pichi pitch/pichi 1.gif",
      "assets/images/proyectos/pichi pichi pitch/pichi 2.png",
      "assets/images/proyectos/pichi pichi pitch/pichi 3.png"

    ]
  },
  "hipotesis-del-amor": {
    title: "Hipótesis del amor",
    category: "Ilustración",
    meta: "Procreate ✩ 2026",
    reel: "https://www.instagram.com/reel/DdV-AztsOXz/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
    description: "<b>La hipótesis del amor</b> es un libro que me leí en agosto 2026, ya que la película salía en septiembre y la novela me gustó tanto que decidí hacer una ilustración, para así, componer <b>un pack con ilustración, pegatinas etc.</b>.",
    images: [
      "assets/images/proyectos/hipotesis/hipotesis 1.gif",
      "assets/images/proyectos/hipotesis/hipotesis 2.png",
      "assets/images/proyectos/hipotesis/hipotesis 3.jpg"


    ]
  },
  "tienda": {
    title: "Tienda",
    category: "Proyectos personales",
    meta: "Shopify ✩ 2026",
    reel: "https://www.instagram.com/reel/DZLj7FaMWb1/",
    description: "Un proyecto que quisé empezar desde hace mucho, pero me daba miedo, sobre todo la <b>lógistica y la inversión inicial</b>, tras mucha investigación la hice a traves de <b>Shopify</b>, y compuse toda la estetica acorde a mi idea y el <b>universo creativo que estoy creando</b>.",
    images: [
      "assets/images/proyectos/tienda/tienda 1.png",
      "assets/images/proyectos/tienda/tienda 2.png",
      "assets/images/proyectos/tienda/tienda 3.png"

    ]
  },
  "capitulo-0": {
    title: "Capítulo 0",
    category: "Ilustración",
    meta: "Procreate ✩ 2026",
    reel: "",
    description: "Una de mis ilusiones como ilustradora era poder hacer una <b>portada de música</b>, lo compartí por redes y Blanca me contactó para hacer la portada de su primer album, <b>Capítulo 0</b>, quería hablar de la <b>nostalgia</b> y que hubiese muchos elementos que a ella le inspiran por lo que decidimos componer la escena desde su habitación.",
    images: [
      
      "assets/images/originales/cap.0.gif",
      "assets/images/proyectos/cap 0/cap 2.png",
      "assets/images/proyectos/cap 0/cap 3.png"

    ]
  },
  "bebotario": {
    title: "Bebotario",
    category: "Proyectos personales",
    meta: "Procreate ✩ 2025",
    reel: "",
    description: "Para el 3º cumpleaños de mi sobrina, decidí hacerle un <b>bebotario</b>, algo que me encantaría poder tener hoy, es un <b>diccionario</b> en el que están plasmadas todas las palabras que vuelve suyas un bebé, junto a su significado, hice la <b>ilustración</b> en Procreate y unas páginas para apuntar las palabras, después lo lleve a plastificar.",
    images: [
       "assets/images/proyectos/bebotario/bebotario 1.jpg",
      "assets/images/proyectos/bebotario/bebotario 2.png",
      "assets/images/proyectos/bebotario/bebotario 3.png"
    ]
  },
  "pegatinas": {
    title: "Pegatinas",
    category: "Proyectos personales",
    meta: "Procreate ✩ 2026",
    reel: "https://www.instagram.com/reel/DSFJKzADO_L/?utm_source=ig_web_copy_link&xtok=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
    description: "Este es un recopilatorio de algunos <b>diseños de pegatinas</b> que he hecho, todas han nacido para el <b>mail club</b> y posteriormente han formado parte de mi tienda online.",
    images: [
      "assets/images/proyectos/pegatinas/pegatinas 1.png",
      "assets/images/proyectos/pegatinas/pegatinas 2.jpg",
      "assets/images/proyectos/pegatinas/pegatinas 3.jpg",
      "assets/images/proyectos/pegatinas/pegatinas 4.jpg",
      "assets/images/proyectos/pegatinas/pegatinas 5.jpg",
    ]
  },
  "consorte": {
    title: "Consorte",
    category: "Editorial",
    meta: "Procreate ✩ 2025",
    reel: "https://www.instagram.com/reel/DXMplmHjPtq/",
    description: "Esta portada fue para la novela <b>Consorte parte 1</b>. La autora me dio referencias del universo y distintos elementos que podían componer la escena, me habló de los <b>contrastes de luz y oscuridad</b> y de como la protagonista debía verse muy <b>dulce y fragil</b>, esta portada me llevó mucho tiempo unas 45h.",
    images: [
       "assets/images/originales/Consorte.jpg",
      "assets/images/proyectos/consorte/consorte 2.jpg",
      "assets/images/proyectos/consorte/consorte 3.jpg"

    ]
  },
  "corona-helada": {
    title: "Corona Helada",
    category: "Editorial",
    meta: "Procreate ✩ 2025",
    reel: "https://www.instagram.com/reel/DJpFW5RMp_k/",
    description: "Esta fue <b>la primera portada que hice</b> y la que me abrió las puertas a poder hacer portadas de novelas, la autora me dió referencias de la protagonista y del universo, estoy <b>especialmente orgullosa</b> de la composición de la escena y de la <b>tipografía</b> ya que está hecha a mano letra por letra.",
    images: [
      "assets/images/originales/Corona_Helada.jpg",
      "assets/images/proyectos/corona helada/corona 2.png",
      "assets/images/proyectos/corona helada/corona 3.png"
    ]
  },


   "hada negra": {
    title: "Hada Negra",
    category: "Ilustración",
    meta: "Procreate ✩ 2025",
    reel: "",
    description: "En esta ilustración quise probar un <strong>estilo diferente</strong>, inspirado en mi interés por el universo, las galaxias y la espiritualidad. Buscaba algo más sencillo, trabajando con animación de <strong>elementos sueltos</strong>, una forma de ilustrar que me gusta mucho. Aunque disfruté el proceso, siento que no termina de encajar del todo con mi estilo.",
    images: [
      "assets/images/proyectos/hada negra/hada 1.gif",
      "assets/images/proyectos/hada negra/hada 2.png"
    ]
  },
  "neocities": {
    title: "Neocities",
    category: "Web/Apps",
    meta: "Obra ✩ 2025",
    reel: "https://www.instagram.com/reel/DX_w0C1s1lB/",
    description: "Tras mucho tiempo haciendo proyectos con vibe coding, decidí empezar algo que me permitiese <b>aprender de forma divertida HTML y CSS</b>, así que me abrí un blog en Neocities, en el que comparto cosas quizás no tan llamativas de mi vida pero que a mi me gusta destacar.",
    images: [
      "assets/images/proyectos/neocities/Neocities 1.jpg",
       "assets/images/proyectos/neocities/Neocities 2.jpg",
        "assets/images/proyectos/neocities/Neocities 3.jpg"
    ]
  },
  "pinturas": {
    title: "Pinturas",
    category: "Proyectos personales",
    meta: "Obra ✩ 2025",
    reel: "https://www.instagram.com/reel/DIeKKBNsBn3/",
    description: "En mi busqueda de probar cosas nuevas y <b>salir de mi zona de confort</b>, elaboré una serie de pinturas para <b>exponerlas en una cafetería</b>. No hay una tematica concreta.",
    images: [
      "assets/images/proyectos/pinturas/pinturas 1.jpg",
       "assets/images/proyectos/pinturas/pinturas 2.jpg",
        "assets/images/proyectos/pinturas/pinturas 3.jpg",
        "assets/images/proyectos/pinturas/pinturas 4.jpg",
        "assets/images/proyectos/pinturas/pinturas 5.jpg"
    ]
  },
  "flotando-en-cartas-de-amor": {
    title: "Flotando en cartas de Amor",
    category: "Ilustración",
    meta: "Procreate ✩ 2023",
    reel: "",
    description: "Esta fue la primera ilustración que considero que <b>definió mi estilo</b> y la forma de trabajar mis ilustraciones, durante mucho tiempo fue mi favorita.",
    images: [
      "assets/images/originales/cartas de amor.jpg",
      "assets/images/proyectos/flotando/flotando 1.png",
      "assets/images/proyectos/flotando/flotando 2.jpg"
    ]
  },
  "calendario-de-creadoras": {
    title: "Calendario de Creadoras",
    category: "Web/Apps",
    meta: "Wordpress ✩ 2025",
    reel: "",
    description: "Este trabajo fue un <b>encargo</b>, usando mi diseño del calendario de adviento la clienta me pidió hacer un <b>calendario de creadoras</b> que proporcionaría de forma gratuita a su comunidad, <b>rediseñé toda la estética</b> pero el mecanismo fue el mismo.",
    images: [
      "assets/images/proyectos/creadoras/creadoras 1.gif",
      "assets/images/proyectos/creadoras/creadoras 2.png",
      "assets/images/proyectos/creadoras/creadoras 3.png"
    ]
  },
  "glow": {
    title: "Glow",
    category: "Ilustración",
    meta: "Procreate ✩ 2024",
    reel: "",
    description: "Me gusta mucho <b>ilustrar retratos</b>, busco referencias de maquillajes que me llamen la atención para <b>trabajar texturas y colores diferentes</b>, siempre uso una imagen de referencia y la modifico a mi gusto.",
    images: [
      "assets/images/originales/glow.png",
      "assets/images/proyectos/glow/glow 2.png",
      "assets/images/proyectos/glow/glow 3.png"
    ]
  },

  "sims": {
    title: "Sims",
    category: "Ilustración",
    meta: "Procreate ✩ 2024",
    reel: "",
    description: "Esta ilustración forma parte de una serie de obras con el mismo estilo. En ese momento me agobiaba no saber cómo <strong>introducir historias en mis ilustraciones</strong>, ya que solía centrarme en los retratos y el trabajo con pinceles. Esta serie me abrió muchísimo la creatividad y me permitió <strong>experimentar con más libertad</strong>. Aunque no terminó siendo mi estilo definitivo, me ayudó a disfrutar más del proceso y a ilustrar sin tantas limitaciones.",
    images: [
      "assets/images/proyectos/sims/sims 1.gif",
      "assets/images/proyectos/sims/sims 2.png",
      "assets/images/proyectos/sims/sims 3.jpg",
      "assets/images/proyectos/sims/sims 4.jpg"
    ]
  },
  "la-ciudad-del-cenit": {
    title: "La ciudad del cenit",
    category: "Editorial",
    meta: "Procreate ✩ 2026",
    reel: "https://www.instagram.com/reel/DXo8dKjjADN/",
    description: "Esta portada fue para la novela <b>La ciudad del cenit</b>, fue un estilo un poco diferente al mio y eso hizo que me tomase más horas, fue todo un reto ilustrar un <b>personaje masculino</b> y un escenario, le quisé dar mucha <b>textura</b> a la ilustración usando piceles que simulasen lapices.",
    images: [
      "assets/images/originales/La ciudad del cenit.jpg ",
      "assets/images/proyectos/la ciudad del cenit/cenit 2.jpg",
      "assets/images/proyectos/la ciudad del cenit/cenit 3.jpg"
    ]
  },
  "manga-nimbus": {
    title: "Manga Nimbus",
    category: "Proyectos personales",
    meta: "Procreate ✩ 2025",
    reel: "https://www.instagram.com/reel/C6_ntiMMfLq/",
    description: "Empecé un proyecto personal de un manga llamado <b>Nimbus</b>, es un proyecto que empecé sin estructurar bien la parte <b>narrativa</b>, por lo que terminé abandonadolo para centrarme en otros proyectos, pero las ilustraciones me gustaron mucho y las quiero destacar, quizás en un futuro empiece algún proyecto similar, partiendo de lo ya aprendido.",
    images: [
      "assets/images/proyectos/nimbus/nimbus 1.jpg",
      "assets/images/proyectos/nimbus/nimbus 2.jpg",
      "assets/images/proyectos/nimbus/nimbus 3.png",
      "assets/images/proyectos/nimbus/nimbus 4.jpg",
      "assets/images/proyectos/nimbus/nimbus 5.jpg",
      "assets/images/proyectos/nimbus/nimbus 6.png"
    ]
  },
  "carpetamagica": {
    title: "Carpetamágica",
    category: "Web/Apps",
    meta: "Wordpress ✩ 2025",
    reel: "https://www.instagram.com/reel/DJR1NnYRXSr/",
    description: "Proyecto web que nace de intentar resolver <b>la problematica de crear proyectos originales para un portfolio</b> esta carpeta la programé para que cada día te dise un mensaje o una problema y poder crear un proyecto a partir de ahi, lo hice con wordpress y las ilustraciones con Procreate.",
    images: [
      "assets/images/proyectos/carpeta mágica/carpeta 1.gif",
      "assets/images/proyectos/carpeta mágica/carpeta 2.png",
      "assets/images/proyectos/carpeta mágica/carpeta 3.png"
    ]
  },
  "la-teoria-del-todo-o-nada": {
    title: "La teoría del todo o nada",
    category: "Ilustración",
    meta: "Procreate ✩ 2025",
    reel: "https://www.instagram.com/reel/DTsq_xZDR-0/",
    description: "Encargo para la autora de <b>La teoría del todo o nada</b>, está ilustración forma parte de un regalo proporcionado en <b>ediciones especiales</b>, hablamos de una escena en concreto de la novela para poder hacer la ilustración.",
    images: [
      "assets/images/originales/la teoría del todo.jpg",
      "assets/images/proyectos/teoria/teoria 2.jpg",
      "assets/images/proyectos/teoria/teoria 3.jpg"
    ]
  },
  "corona-en-llamas": {
    title: "Corona en llamas",
    category: "Editorial",
    meta: "Procreate ✩ 2026",
    reel: "https://www.instagram.com/reel/DVn-u6VjLYT/",
    description: "Esta es la segunda parte de la bilogía de Corona helada, queríamos que ambas portadas <b>se reconociesen facilmente como parte de la misma saga</b>.",
    images: [
      "assets/images/originales/Corona en llamas.png",
      "assets/images/proyectos/corona en llamas/corona 1.png",
      "assets/images/proyectos/corona en llamas/corona 2.png"
    ]
  },
  "squid-games": {
    title: "Squid Games",
    category: "Ilustración",
    meta: "Procreate ✩ 2023",
    reel: "https://www.instagram.com/reel/C7KsIrrsCiw/",
    description: "Estudio de retrato, en este caso trabajé teoría del color.",
    images: [
      "assets/images/originales/Squidgames.jpg",
      "assets/images/proyectos/squidgames/squidgames 2.jpg",
      "assets/images/proyectos/squidgames/squidgames 3.jpg"
    ]
  },
  "carta-blanca": {
    title: "Carta blanca",
    category: "Ilustración",
    meta: "Procreate ✩ 2026",
    reel: "",
    description: "Esta ilustración forma parte del juego de cartas <b>Carta blanca</b>, para cada carta se trabajó con un ilustrador diferente y podíamos <b>escoger la carta con la temática que más nos gustase</b>, yo elegí una de un bosque mágico invernal.",
    images: [
      "assets/images/proyectos/carta blanca/carta blanca 1.jpg",
      "assets/images/proyectos/carta blanca/carta blanca.jpg",
      "assets/images/proyectos/carta blanca/carta blanca 2.png",
      "assets/images/proyectos/carta blanca/carta blanca 3.png"
    ]
  },
  "tfg": {
    title: "TFG",
    category: "Proyectos personales",
    meta: "Procreate ✩ Web3 ✩ 2025",
    reel: "",
    description: "Esta colección forma parte del proyecto que presenté como mi <strong>TFG</strong>. Son una serie de ilustraciones que generé utilizando diferentes elementos por separado (caras, gorros, accesorios) y <strong>randomizándolos</strong> salían cientos de ilustraciones muy diferentes.",
    images: [
      "assets/images/proyectos/restlesslines/restlesslines 1.jpeg",
      "assets/images/proyectos/restlesslines/restlesslines 2.jpg",
      "assets/images/proyectos/restlesslines/restlesslines 3.gif",
      "assets/images/proyectos/restlesslines/restlesslines 4.jpg",
      "assets/images/proyectos/restlesslines/restlesslines 5.png",
      "assets/images/proyectos/restlesslines/restlesslines 6.jpg"
    ]
  },


   "Paint": {
    title: "Paint",
    category: "Ilustración",
    meta: "Procreate ✩ 2025",
    reel: "https://www.instagram.com/reel/DAs3xjuMLYu/",
    description: "De pequeña siempre me gustó mucho <strong>Paint</strong>, aunque no tenía el nivel para hacer todo lo que veía por internet. Tiempo después quise volver a probar y hacer algo con él, esta vez usando solo el <strong>ratón, sin tablet</strong>. El resultado es caótico y sucio, pero me divertí muchísimo haciéndolo y le tengo mucho cariño.",
    images: [
      "assets/images/proyectos/paint/paint 1.mp4",
      "assets/images/proyectos/paint/paint 2.png",
    ]
  },
  "tienda-notion": {
    title: "Tienda Notion",
    category: "Web/Apps",
    meta: "Notion ✩ 2026",
    reel: "https://www.instagram.com/reel/DOYNwR8DK0d/",
    description: "Utiliando <strong>Notion</strong> cree una tienda de planes, <strong>un juego para poder hacer cosas diferentes con tu pareja</strong>, si compras planes de su tienda podras obtener puntos y con esos puntos comprarte planes a ti mismo.",
    images: [
      "assets/images/proyectos/tienda notion/tienda notion 1.gif",
      "assets/images/proyectos/tienda notion/tienda notion 2.jpg",
      "assets/images/proyectos/tienda notion/tienda notion 3.jpg"
    ]
  },

    "wonderpals": {
    title: "Wonderpals",
    category: "Ilustración",
    meta: "Procreate ✩ 2025",
    reel: "",
    description: "Me propusieron hacer una prueba para trabajar como ilustradora en <strong>Wonder Pals</strong>. Aunque finalmente no conseguí el puesto, estoy contenta con el resultado. La idea era <strong>replicar su estilo de ilustración</strong> y crear una pequeña escena sin pautas concretas, simplemente experimentando con su estética.",
    images: [
      "assets/images/proyectos/propuesta/wonderpals 1.gif",
      "assets/images/proyectos/propuesta/wonderpals 2.mp4",
      "assets/images/proyectos/propuesta/wonderpals 3.png"
    ]
  },
  "san-valentin-2-0": {
    title: "San Valentin 2.0",
    category: "Web/Apps",
    meta: "Figma ✩ 2026",
    reel: "https://www.instagram.com/reel/DUgQQnSjBTe/",
    description: "Este proyecto de <strong>San valentín</strong> fue también en figma, era una serie de iconos y al darle click cada uno traía un mensaje bonito ilustrado, una foto, una canción etc...",
    images: [
      "assets/images/proyectos/san valentin 2.0/valentin 1.jpg",
      "assets/images/proyectos/san valentin 2.0/valentin 2.jpg",
      "assets/images/proyectos/san valentin 2.0/valentin 3.jpg"
    ]
  },
  "fyq": {
    title: "FyQ",
    category: "Web/Apps",
    meta: "Wordpress ✩ 2026",
    reel: "https://www.instagram.com/reel/DKJXqtQMm04/",
    description: "Para la página de <strong>preguntas y respuestas</strong> de mi antigua web, hice un panel y a la derecha podías hacer click a las preguntas más frecuentes y entonces <strong>la pantalla principal mostraba la respuesta</strong>, todo esto ilustrado.",
    images: [
      "assets/images/proyectos/chatgpt/chatgpt 1.jpg",
      "assets/images/proyectos/chatgpt/chatgpt 2.jpg",
      "assets/images/proyectos/chatgpt/chatgpt 3.gif"
    ]
  },
  "wishlist": {
    title: "Wishlist",
    category: "Web/Apps",
    meta: "VS Studio ✩ 2026",
    reel: "https://www.instagram.com/reel/DTDRpnSjEyg/",
    description: "A veces <strong>es dificil saber que regalarle a alguien sin preguntarlo directamente</strong>, hice una app para que una persona tuviese en esa página una guía de que cosas le harían ilusión y cuales no. Esta web app ya no está disponible ya que fue mucha la interacción de usuarios y no podía sostener la web economicamente.",
    images: [
      "assets/images/proyectos/wishlist/wishlist 1.gif",
      "assets/images/proyectos/wishlist/wishlist 2.jpg",
      "assets/images/proyectos/wishlist/wishlist 3.jpg"
    ]
  },
  "el-viejo-y-el-mar": {
    title: "El Viejo Y El Mar",
    category: "Ilustración",
    meta: "Animación ✩ Procreate ✩ 2024",
    reel: "https://www.instagram.com/reel/C-2J9JMsgH_/",
    description: "Animación inspirada en una frase del libro <b>El viejo y el mar</b> buscaba una animación sencilla, y mi objetivo era crear una ambientación emocional.",
    images: [
      "assets/images/proyectos/mar/mar.mp4",
      "assets/images/proyectos/mar/mar 2.png",
    ]
  },
  "tamagochi-app": {
    title: "Tamagochi app",
    category: "Web/Apps",
    meta: "VS Studio ✩ 2026",
    reel: "https://www.instagram.com/reel/DPQ6ACfjHWW/",
    description: "Hice un <strong>Tamagochi</strong> al que cuidar registrando tus <strong>hábitos</strong>, si pasaba el tiempo y no registrabas nada el tamagochi se ponía gordo, fumaba o finalmente moría.",
    images: [
      "assets/images/proyectos/tamagochi/tamagochi 1.gif",
      "assets/images/proyectos/tamagochi/tamagochi 2.jpg",
      "assets/images/proyectos/tamagochi/tamagochi 3.jpg"

      
    ]
  },

    "ojos": {
    title: "Ojos",
    category: "Ilustración",
    meta: "Procreate ✩ 2026",
    reel: "",
    description: "Para una de las ediciones de mi club quise incluir un <strong>marcapáginas</strong> y me apetecía probar a ilustrar unos ojos. Aquí muestro un poco el <strong>proceso de creación</strong> de aquella ilustración.",

    images: [
      "assets/images/proyectos/ojos/ojos 1.gif",
      "assets/images/proyectos/ojos/ojos 2.png"

    ]
  },


  "web-alemf-com": {
    title: "Web alemf.com",
    category: "Web/Apps",
    meta: "Wordpress ✩ 2025",
    reel: "https://www.instagram.com/reel/DFdW1A3s1SU/",
    description: "Esta fue <strong>mi antigua web</strong> que cerré, me sirvió principalmente a sumergirme en el mundo web, y empezar poco a poco utilizando <strong>WordPress</strong>.",
    images: [
      "assets/images/proyectos/web/web 1.jpg",
      "assets/images/proyectos/web/web 2.jpg",
      "assets/images/proyectos/web/web 3.jpg"
    ]
  },
  "mail-club": {
    title: "Mail club",
    category: "Proyectos personales",
    meta: "Procreate ✩ 2025-2026",
    reel: "https://www.instagram.com/reel/DYRzY9nMR1d/",
    description: "El <strong>Mail club</strong> fue el primer proyecto como emprendedora que hice, es una <strong>suscripción mensual de correo</strong>, cada mes la temática es diferente y trae una ilustración, unas pegatinas y algo extra. Todo lo ilustro e imprimo yo misma.",
    images: [
      "assets/images/proyectos/mailclub/mail 1.jpg",
      "assets/images/proyectos/mailclub/mail 2.jpg",
      "assets/images/proyectos/mailclub/mail 3.jpg",
      "assets/images/proyectos/mailclub/mail 4.jpg",
      "assets/images/proyectos/mailclub/mail 5.jpg",
      "assets/images/proyectos/mailclub/mail 6.jpg"
    ]
  },
  "tabla-de-surf-tasty-poke": {
    title: "Tabla de Surf Tasty poke",
    category: "Ilustración",
    meta: "Pintura ✩ 2025",
    reel: "https://www.instagram.com/reel/C65oeNlMBQf/",
    description: "Esto formó parte de una campaña publicitaria en <strong>colaboración con la marca Tasty poke</strong>, me enviaron la tabla y yo la pinte usando como referencia una ilustración mía",
    images: [
      "assets/images/proyectos/tabla surf/surf 1.JPG",
      "assets/images/proyectos/tabla surf/surf 2.jpg",
      "assets/images/proyectos/tabla surf/surf 3.GIF",
      "assets/images/proyectos/tabla surf/surf 4.jpg"
    ]
  },
  "tiempo": {
    title: "Tiempo",
    category: "Ilustración",
    meta: "Procreate ✩ 2024",
    reel: "https://www.instagram.com/reel/C6_G4z9sSRI/",
    description: "<strong>Ilustración experimental sobre el tiempo, la filosofía y demás sentimientos espirituales.</strong>, la dejé en pausa varios años y la retomé en 2024.",
    images: [
      "assets/images/proyectos/chica tiempo/tiempo 1.jpg",
      "assets/images/proyectos/chica tiempo/tiempo 2.jpg",
      "assets/images/proyectos/chica tiempo/tiempo 3.jpg",
      "assets/images/proyectos/chica tiempo/tiempo 4.jpg",
      "assets/images/proyectos/chica tiempo/tiempo 5.jpg"
    ]
  },
  "estaciones": {
    title: "Estaciones",
    category: "Ilustración",
    meta: "Animación ✩ Procreate ✩ 2025",
    reel: "https://www.instagram.com/reel/DB0h5OBsaZf/",
    description: "Animación sobre el paso de las estaciones, los momentos ciclicos, la muerte y el renacer.",
    images: [
      "assets/images/proyectos/animacion estaciones/estaciones 1.mp4",
      "assets/images/proyectos/animacion estaciones/estaciones 2.png",
    ]
  },
  "sobres-san-valentin": {
    title: "Sobres San Valentin",
    category: "Web/Apps",
    meta: "Wordpress ✩ 2026",
    reel: "https://www.instagram.com/reel/DUsttHFDL4y/",
    description: "Estos <strong>sobres digitales</strong> tienen cada uno una carta con imagenes, regalos, lo que sea, cada carta es para abrir en un momento especial, programe algunas para que se pudiesen ver en <strong>fechas concretas</strong>, <strong>navidad</strong>, <strong>cumpleaños</strong>... Y otras para que solo se pudiese abrir una a la semana, ya que estas era para abrir en momentos como, cuando estás triste, cuando te aburras, cuando estés enfadado.",
    images: [
      "assets/images/proyectos/sobres/sobres 1.gif",
      "assets/images/proyectos/sobres/sobres 2.png",
      "assets/images/proyectos/sobres/sobres 3.png",
      "assets/images/proyectos/sobres/sobres 4.png"
    ]
  },
  "horario-app": {
    title: "Horario app",
    category: "Web/Apps",
    meta: "VS Studio ✩ 2026",
    reel: "https://www.instagram.com/reel/DUIeKBhDC9M/",
    description: "Esta app busca <strong>randomizar</strong> el tiempo de trabajo, separandolo por tareas, indicas cuantas horas puedes dedicar ese día, y a cada tarea le asignas una prioridad, entonces se va a randomizar un temporizador y cada tarea va a suponer un <strong>tiempo especifico</strong>.",
    images: [
      "assets/images/proyectos/horario/horario 1.gif",
      "assets/images/proyectos/horario/horario 2.png",
      "assets/images/proyectos/horario/horario 3.png"
    ]
  },
  "mathilda": {
    title: "Mathilda",
    category: "Ilustración",
    meta: "Photoshop CS5 ✩ 2018",
    reel: "",
    description: "Ilustración retrato de la pelicula <b>Leon el profesional.</b>",
    images: [
      "assets/images/proyectos/mathilda/mathilda 1.jpg",
      "assets/images/proyectos/mathilda/mathilda 2.png",
      "assets/images/proyectos/mathilda/mathilda 3.png",
      "assets/images/proyectos/mathilda/mathilda 4.png"
    ]
  },
  "postales": {
    title: "Postales",
    category: "Ilustración",
    meta: "Procreate ✩ 2023",
    reel: "",
    description: "Estas postales acompañaron el proyecto que elaboré para mi <strong>TFG</strong>, eran postales con <strong>mensajes positivos</strong> con estética infantil.",
    images: [
      "assets/images/proyectos/postales/postales 1.JPG",
      "assets/images/proyectos/postales/postales 2.jpg",
      "assets/images/proyectos/postales/postales 3.png",
      "assets/images/proyectos/postales/postales 4.png",
      "assets/images/proyectos/postales/postales 5.png",
      "assets/images/proyectos/postales/postales 6.jpg"
    ]
  },
  "ilustraciones-old-portfolio": {
    title: "Ilustraciones old-portfolio",
    category: "Ilustración",
    meta: "Procreate ✩ 2024",
    reel: "",
    description: "Estas ilustraciones pertenecieron a elementos de mi antiguo portfolio.",
    images: [
      "assets/images/proyectos/iconos portfolio/iconos 1.gif",
      "assets/images/proyectos/iconos portfolio/iconos 2.GIF",
      "assets/images/proyectos/iconos portfolio/iconos 3.jpg",
      "assets/images/proyectos/iconos portfolio/iconos 4.gif",
      "assets/images/proyectos/iconos portfolio/iconos 5.GIF",
      "assets/images/proyectos/iconos portfolio/iconos 6.jpg",
      "assets/images/proyectos/iconos portfolio/iconos 7.gif"
    ]
  },
  "cyberpunk": {
    title: "Cyberpunk",
    category: "Ilustración",
    meta: "Procreate ✩ 2023",
    reel: "",
    description: "Ilustración inspirada en la serie <b>Cyberpunk: Edgerunners.</b>",
    images: [
      "assets/images/proyectos/cyberpunk/cyberpunk 1.gif",
      "assets/images/proyectos/cyberpunk/cyberpunk 2.png",
      "assets/images/proyectos/cyberpunk/cyberpunk 3.jpg"
    ]
  },
  "san-valentin": {
    title: "San Valentín",
    category: "Web/Apps",
    meta: "Figma ✩ 2024",
    reel: "https://www.instagram.com/reel/DF8SY-pMuEf/",
    description: "Para San valentin hice una <strong>máquina expendedora de citas</strong>, esto se lo mandabas a la persona con la querías pasar San Valentin y ella escogía una cita, como si de una maquina expendedora se tratase, luego te salía un ticket con el plan, lo hice usando pantallas de figma.",
    images: [
      "assets/images/proyectos/figma valentin/figma 1.png",
      "assets/images/proyectos/figma valentin/figma 2.png",
      "assets/images/proyectos/figma valentin/figma 3.png",
      "assets/images/proyectos/figma valentin/figma 4.png"
    ]
  },

 "clases": {
    title: "Clases",
    category: "enseñanza",
    meta: "Presencial ✩ 2025",
    reel: "",
    description: "Trabajé durante aproximadamente un año en una <strong>academia de arte</strong>, mientras empezaba a crear contenido en redes para tener algo propio. Al no estar muy bien pagado, decidí dar el paso y empezar a ofrecer <strong>clases particulares</strong>. Creé mi propia web y repartí folletos, y a día de hoy sigo dando clases centradas en el arte y la creatividad, siempre priorizando que los niños <strong>disfruten, experimenten y no se frustren</strong>.",
    images: [
      "assets/images/proyectos/clases/clases 4.jpg",
      "assets/images/proyectos/clases/clases 1.jpg",
      "assets/images/proyectos/clases/clases 2.jpg",
      "assets/images/proyectos/clases/clases 3.jpg",
      "assets/images/proyectos/clases/clases 5.jpg",
      "assets/images/proyectos/clases/clases 6.jpg",
      "assets/images/proyectos/clases/clases 7.jpg",
      "assets/images/proyectos/clases/clases 8.jpg",
      "assets/images/proyectos/clases/clases 9.PNG"
    ]
  },


  "justicia": {
    title: "Justicia",
    category: "Ilustración",
    meta: "Photoshop CS5 ✩ 2018",
    reel: "",
    description: "Ilustración que explora el sentimiento de la justicia como algo prostituido.",
    images: [
      "assets/images/originales/justicia.jpg"
    ]
  },

"carteles": {
    title: "Diseño posters",
    category: "Ilustración",
    meta: "Procreate ✩ 2024",
    reel: "",
    description: "Hace unos años empecé a vender <strong>diseños y cartelería en Etsy</strong>. La experiencia fue bastante bien, aunque sentía que tenía cierto límite. Aun así, disfruté mucho creando estos diseños, ya que me ayudaron a <strong>sintetizar ideas y experimentar con otros formatos</strong>.",

    images: [
      "assets/images/proyectos/carteles/carteles 1.JPG",
      "assets/images/proyectos/carteles/carteles 2.JPG",
      "assets/images/proyectos/carteles/carteles 3.JPG"
    ]
  },



  "old-portfolio": {
    title: "Old-Portfolio",
    category: "Web/Apps",
    meta: "Wordpress ✩ 2024",
    reel: "https://www.instagram.com/reel/DEfGtnUMfCM/",
    description: "Mi antiguo portfolio, tardé mucho en hacerlo, era un portfolio muy llamativo y diferente pero siento que era <strong>poco práctico</strong>, siendo el objetivo principal de un portfolio resumir todo tu trabajo para tener una idea clara rápidamente.",
    images: [
      "assets/images/proyectos/old-portfolio/portfolio 1.jpg",
      "assets/images/proyectos/old-portfolio/portfolio 2.png",
      "assets/images/proyectos/old-portfolio/portfolio 3.png",
      "assets/images/proyectos/old-portfolio/portfolio 4.png"

    ]
  },
  "my-melody": {
    title: "My Melody",
    category: "Ilustración",
    meta: "Procreate ✩ 2024",
    reel: "",
    description: "Practica utilizando una <strong>imagen de referencia</strong> en este caso intente hacer la referencia tal cual.",
    images: [
      "assets/images/originales/mymelody.png"
    ]
  },
  "limpiadorcito": {
    title: "Limpiadorcito",
    category: "Web/Apps",
    meta: "VS studio ✩ 2026",
    reel: "https://www.instagram.com/reel/DLdKNJRsCe-/",
    description: "App que diseñé para poder <strong>organizarme el escritorio del ordenador</strong> de una forma más rápida, puedes ver los archivos eliminarlos o cambiarles el titulo y con un botón crea subcarpetas y mete archivos de forma organizada dentro de una carpeta que hayas seleccionado.",
    images: [
      "assets/images/proyectos/limpiadorcito/limpiadorcito 1.webp",
      "assets/images/proyectos/limpiadorcito/limpiadorcito 2.png",
      "assets/images/proyectos/limpiadorcito/limpiadorcito 3.png",
      "assets/images/proyectos/limpiadorcito/limpiadorcito 4.png"
    ]
  },
  "pixel-art-planetas": {
    title: "Pixel art planetas",
    category: "Ilustración",
    meta: "Procreate ✩ 2025",
    reel: "",
    description: "Me encanta el <strong>pixel art</strong> y quise probar a hacer una animación que fue esta, la hice en procreate.",
    images: [
      "assets/images/proyectos/planetas/planetas 1.mp4",
      "assets/images/proyectos/planetas/planetas 2.jpg"
    ]
  },
  "museo": {
    title: "Museo",
    category: "Ilustración",
    meta: "Photoshop CS5 ✩ 2019",
    reel: "",
    description: "Ilustración que hice usando de <strong>inspiración</strong> una imagen de referencia que encontré hace muchos años.",
    images: [
      "assets/images/originales/Museo.jpg"
    ]
  },
  "gris": {
    title: "Gris",
    category: "Ilustración",
    meta: "Photoshop CS5 ✩ 2018",
    reel: "",
    description: "Ilustración que hice cuando me dedicaba a hacer principalmente <strong>retratos</strong>, me gusta mucho el resultado y la composición de la ilustración. Una de mis referentes del momento era Elena Sai",
    images: [
      "assets/images/originales/Gris.jpg"
    ]
  },

  "animacion-musical": {
    title: "Animación Musical",
    category: "Ilustración",
    meta: "Animación ✩ Procreate ✩ 2025",
    reel: "https://www.instagram.com/reel/C9iCZ-hs-SW/",
    description: "Quise experimentar con la <strong>animación</strong>, aunque no tenía experiencia previa y los movimientos no son especialmente fluidos. Aun así, me gustó mucho el resultado. Eran pequeñas escenas pensadas para <strong>Instagram</strong>, sin una temática concreta, simplemente ideas que se me iban ocurriendo y que decidí juntar.",
    images: [
      "assets/images/proyectos/animacion musical/musical 1.mp4",
    ]
  },
  "cafe": {
    title: "Café",
    category: "Ilustración",
    meta: "Photoshop CS5 ✩ 2019",
    reel: "",
    description: "Práctica de retrato.",
    images: [
      "assets/images/originales/Café.jpg"
    ]
  },
  "magia-de-lo-cotidiano": {
    title: "Magia de lo cotidiano",
    category: "Ilustración",
    meta: "Animación ✩ Procreate ✩ 2025",
    reel: "https://www.instagram.com/reel/C_hm3JZM9sQ/",
    description: "Al principio quería crear una escena centrada en la <strong>amistad</strong>, pero los personajes no terminaban de convencerme, así que decidí cambiar de idea. Finalmente, creé una pequeña escena en una <strong>casa mágica dentro de un mundo de fantasía</strong>, con una estética muy acogedora y otoñal.",
    images: [
      "assets/images/proyectos/animacion cotidiano/cotidiano 1.mp4",
      "assets/images/proyectos/animacion cotidiano/cotidiano 2.png",
      "assets/images/proyectos/animacion cotidiano/cotidiano 3.png"
    ]
  },
  "patreon": {
    title: "Patreon",
    category: "Enseñanza",
    meta: "Patreon ✩ 2024",
    reel: "",
    description: "Mi <strong>Patreon</strong> es uno de los proyectos más grandes y de los que más orgullosa estoy. Lo empecé cuando llegué a redes sociales y poco a poco fui ampliándolo con ilustraciones, proyectos para replicar, un mail club, tutoriales, tips y podcasts. Es un espacio donde reúno todo mi <strong>contenido extra y recursos para la comunidad</strong>, y al que le tengo muchísimo cariño porque siento que tiene mucho valor.",
    images: [
      "assets/images/proyectos/patreon/patreon 1.png",
      "assets/images/proyectos/patreon/patreon 2.png",
      "assets/images/proyectos/patreon/patreon 3.png",
      "assets/images/proyectos/patreon/patreon 4.png"
    ]
  }
};

const projectEnglish = {
  "Consorte II": {
    title: "Consort II",
    description: "For this second book, I wanted to portray a much more <strong>warrior-like</strong> protagonist, in contrast with the first instalment. We kept the <strong>griffin</strong> as part of the story, but used a brighter, more <strong>spring-like palette</strong> with pink tones and details on the spine. The main challenge was fitting the <strong>synopsis</strong> without taking attention away from the back cover, which was not originally meant to include one. I really liked the final result."
  },
  sirenas: {
    title: "Mermaids",
    description: "This illustration began as an exercise in creating a more organised workflow. I spent more time than usual <b>refining the sketch</b> to create a stronger final illustration. It was part of the <b>May Mail Club</b>."
  },
  astral: {
    title: "Astral",
    description: "I first made this illustration in 2022, then decided to <b>redesign it</b>. I used a reference image for the pose and focused on the portrait and the character's gaze, which particularly interested me at the time."
  },
  bruja: {
    title: "Witch",
    description: "Backgrounds have always been challenging for me, so I tried a different perspective in this illustration. It was difficult, but I also enjoyed adding details to the room. I wanted an <strong>autumnal, witchy and cosy</strong> look, and I really liked the result."
  },
  "111": {
    title: "111",
    description: "This illustration was part of the <b>September Mail Club</b>, whose theme was spirituality. It took me around four hours and was inspired by the <b>Star tarot card</b>."
  },
  "calendario-de-adviento": {
    title: "Advent Calendar",
    description: "This was one of my first WordPress projects: an <b>interactive advent calendar</b> where gifts unlock automatically as each day arrives. I also added <b>Christmas music</b> that plays when you click the title. I used ChatGPT and YouTube tutorials to build the <b>HTML, CSS and JavaScript</b>."
  },
  "amor-implacable": {
    title: "Implacable Love",
    description: "This cover was for the mafia romance novel <b>Implacable Love</b>. We wanted the cover to show the <b>protagonist's</b> strength and dominance in the story, while keeping the romance clearly in focus."
  },
  "calendario-de-adviento-2-0": {
    title: "Advent Calendar 2.0",
    description: "Another advent calendar, this time as an <b>app</b> made with Visual Studio Code. I created it as a gift for my Patreon community: each day included exercises to <b>unlock creativity</b> and help users grow over 24 days. I made it through vibe coding, and created the illustrations in Procreate."
  },
  "No me pidas clemencia": {
    title: "Don't Ask for Mercy",
    description: "For this cover, I worked with two protagonists, including a male character, which is always a challenge because I am more used to drawing women. The goal was a <strong>dark and mysterious</strong> thriller aesthetic without losing the <strong>romantic tension</strong> between them."
  },
  "pichi-pichi-pitch": {
    title: "Pichi Pichi Pitch",
    description: "This illustration was part of the <b>August Mail Club</b> and was inspired by the series <b>Pichi Pichi Pitch</b>, which shaped my childhood and my understanding of <b>love</b>. I wanted to explore the intensity I felt back then."
  },
  "hipotesis-del-amor": {
    title: "The Love Hypothesis",
    description: "<b>The Love Hypothesis</b> is a book I read in August 2026. The film was coming out in September, and I loved the novel so much that I decided to make an illustration and create a <b>bundle with prints, stickers and more</b>."
  },
  tienda: {
    title: "Shop",
    description: "I had wanted to start this project for a long time, but was nervous about the <b>logistics and initial investment</b>. After researching, I built it on <b>Shopify</b> and created an aesthetic that fits my idea and the <b>creative universe I am building</b>."
  },
  "capitulo-0": {
    title: "Chapter 0",
    description: "One of my dreams as an illustrator was to create a <b>music cover</b>. I shared the idea online and Blanca contacted me to illustrate her debut album, <b>Chapter 0</b>. She wanted to explore <b>nostalgia</b> and include many things that inspire her, so we built the scene around her bedroom."
  },
  bebotario: {
    title: "Baby Dictionary",
    description: "For my niece's third birthday, I made her a <b>baby dictionary</b>: a collection of all the words a baby makes their own, together with their meanings. I illustrated it in Procreate, added pages for writing down words, and had it laminated."
  },
  pegatinas: {
    title: "Stickers",
    description: "A collection of some <b>sticker designs</b> I have made. They were all created for the <b>Mail Club</b> and later became part of my online shop."
  },
  consorte: {
    title: "Consort",
    description: "This cover was for the novel <b>Consort, Part 1</b>. The author shared references to the universe and elements for the scene, along with ideas about <b>light and darkness</b>. The protagonist needed to look <b>sweet and delicate</b>. The cover took around 45 hours."
  },
  "corona-helada": {
    title: "Frozen Crown",
    description: "This was <b>the first cover I ever made</b>, and it opened the door to illustrating book covers. The author shared references for the protagonist and the story world. I am especially proud of the composition and the <b>hand-lettered typography</b>, drawn letter by letter."
  },
  "hada negra": {
    title: "Dark Fairy",
    description: "I wanted to try a <strong>different style</strong>, inspired by my interest in space, galaxies and spirituality. I aimed for a simpler piece using animation of <strong>individual elements</strong>, a way of illustrating I really enjoy. I liked the process, although it does not quite feel like my style."
  },
  neocities: {
    title: "Neocities",
    description: "After spending a long time making projects with vibe coding, I wanted a fun way to <b>learn HTML and CSS</b>, so I started a blog on Neocities. I share parts of my life that may not seem exciting to everyone, but that I enjoy highlighting."
  },
  pinturas: {
    title: "Paintings",
    description: "As I looked for new things to try and ways to <b>step outside my comfort zone</b>, I made a series of paintings to <b>exhibit in a café</b>. There is no specific theme."
  },
  "flotando-en-cartas-de-amor": {
    title: "Floating in Love Letters",
    description: "This was the first illustration I felt <b>defined my style</b> and the way I work. It was my favourite for a long time."
  },
  "calendario-de-creadoras": {
    title: "Creators' Calendar",
    description: "This was a <b>commission</b>. Using my advent calendar design as a starting point, the client asked for a <b>creators' calendar</b> to share with her community for free. I redesigned the whole look, while keeping the same mechanics."
  },
  glow: {
    title: "Glow",
    description: "I love <b>illustrating portraits</b>. I look for makeup references that catch my eye so I can <b>work with different textures and colours</b>. I always start with a reference image and adapt it to my taste."
  },
  sims: {
    title: "Sims",
    description: "This illustration is part of a series with a shared style. At the time, I felt stuck because I did not know how to <strong>add stories to my illustrations</strong>; I usually focused on portraits and brushes. This series opened up my creativity and let me <strong>experiment more freely</strong>. It did not become my definitive style, but it helped me enjoy the process and draw with fewer limits."
  },
  "la-ciudad-del-cenit": {
    title: "The City of Zenith",
    description: "This cover was for the novel <b>The City of Zenith</b>. Its style was different from my usual work, so it took longer. Illustrating a <b>male character</b> and a setting was a real challenge. I added lots of <b>texture</b> using brushes that mimic pencils."
  },
  "manga-nimbus": {
    title: "Nimbus Manga",
    description: "I started a personal manga project called <b>Nimbus</b> without properly structuring its <b>story</b>, and eventually left it to focus on other work. I still love the illustrations and wanted to share them. Maybe I will start a similar project in the future, building on what I learned."
  },
  carpetamagica: {
    title: "Magic Folder",
    description: "A website created to address <b>the challenge of coming up with original portfolio projects</b>. I programmed the folder to give you a prompt or problem each day, helping you create a project from it. I built it with WordPress and made the illustrations in Procreate."
  },
  "la-teoria-del-todo-o-nada": {
    title: "The All-or-Nothing Theory",
    description: "A commission for the author of <b>The All-or-Nothing Theory</b>. This illustration was included as a gift in special editions. We discussed a specific scene from the novel to create it."
  },
  "corona-en-llamas": {
    title: "Crown in Flames",
    description: "The second book in the Frozen Crown duology. We wanted both covers to be <b>instantly recognisable as part of the same series</b>."
  },
  "squid-games": {
    title: "Squid Game",
    description: "A portrait study focused on colour theory."
  },
  "carta-blanca": {
    title: "Blank Card",
    description: "This illustration is part of the <b>Blank Card</b> card game. A different illustrator worked on each card, and we could <b>choose the theme we liked most</b>. I chose a magical winter forest."
  },
  tfg: {
    title: "Final Degree Project",
    description: "This collection is part of my <strong>final degree project</strong>. I created a series of illustrations using separate elements (faces, hats and accessories) and <strong>randomising them</strong> to generate hundreds of different results."
  },
  Paint: {
    title: "Paint",
    description: "I loved <strong>Paint</strong> as a child, even though I could not create the things I saw online. Years later, I tried again, this time using only a <strong>mouse, no tablet</strong>. The result is chaotic and messy, but I had so much fun making it and feel very fond of it."
  },
  "tienda-notion": {
    title: "Notion Shop",
    description: "Using <strong>Notion</strong>, I created a shop of date ideas: <strong>a game for doing different things with your partner</strong>. Buying ideas from the shop earns points that you can use to buy ideas for yourself."
  },
  wonderpals: {
    title: "Wonderpals",
    description: "I was invited to do a test for an illustrator role at <strong>Wonder Pals</strong>. I did not get the position, but I am happy with the result. The brief was to <strong>replicate their illustration style</strong> and create a small scene without specific guidelines, experimenting with their aesthetic."
  },
  "san-valentin-2-0": {
    title: "Valentine's Day 2.0",
    description: "Another <strong>Valentine's Day</strong> project made in Figma: a series of icons, each revealing a lovely illustrated message, a photo, a song and more when clicked."
  },
  fyq: {
    title: "Q&A",
    description: "For the <strong>questions and answers</strong> page of my old website, I made a panel where you could click on frequently asked questions. The main screen would then display <strong>the answer</strong>, with illustrations throughout."
  },
  wishlist: {
    title: "Wishlist",
    description: "Sometimes it is <strong>hard to know what to give someone without asking directly</strong>. I made an app where people could create a guide to things they would or would not like to receive. The web app is no longer available because user activity grew beyond what I could afford to maintain."
  },
  "el-viejo-y-el-mar": {
    title: "The Old Man and the Sea",
    description: "An animation inspired by a line from <b>The Old Man and the Sea</b>. I wanted to keep it simple and create an emotional atmosphere."
  },
  "tamagochi-app": {
    title: "Tamagotchi App",
    description: "I made a <strong>Tamagotchi</strong> that you care for by tracking your <strong>habits</strong>. If time passed without tracking anything, the Tamagotchi would get fat, smoke or eventually die."
  },
  ojos: {
    title: "Eyes",
    description: "For one edition of my club, I wanted to include a <strong>bookmark</strong> and felt like trying to illustrate eyes. Here I show part of the illustration's <strong>creation process</strong>."
  },
  "web-alemf-com": {
    title: "alemf.com Website",
    description: "This was <strong>my old website</strong>, which I closed down. It helped me dive into web design and gradually start using <strong>WordPress</strong>."
  },
  "mail-club": {
    title: "Mail Club",
    description: "The <strong>Mail Club</strong> was my first project as an entrepreneur: a <strong>monthly mail subscription</strong> with a different theme each month, including an illustration, stickers and an extra surprise. I illustrate and print everything myself."
  },
  "tabla-de-surf-tasty-poke": {
    title: "Tasty Poke Surfboard",
    description: "This was part of an advertising campaign in <strong>collaboration with Tasty Poke</strong>. They sent me the board, which I painted using one of my illustrations as a reference."
  },
  tiempo: {
    title: "Time",
    description: "An <strong>experimental illustration about time, philosophy and spiritual feelings</strong>. I put it aside for several years and returned to it in 2024."
  },
  estaciones: {
    title: "Seasons",
    description: "An animation about the changing seasons, cycles, death and rebirth."
  },
  "sobres-san-valentin": {
    title: "Valentine's Envelopes",
    description: "Each of these <strong>digital envelopes</strong> contains a letter, images, gifts or anything else, to be opened for a special occasion. Some were scheduled for specific <strong>dates</strong>, such as <strong>Christmas</strong> or birthdays; others could only be opened once a week, for moments when you feel sad, bored or angry."
  },
  "horario-app": {
    title: "Schedule App",
    description: "This app aims to <strong>randomise</strong> your work time across tasks. You enter how many hours you have, assign each task a priority, and a timer randomises how much time each task gets."
  },
  mathilda: {
    title: "Mathilda",
    description: "A portrait illustration inspired by the film <b>Léon: The Professional.</b>"
  },
  postales: {
    title: "Postcards",
    description: "These postcards accompanied my <strong>final degree project</strong>. They featured <strong>positive messages</strong> with a childlike aesthetic."
  },
  "ilustraciones-old-portfolio": {
    title: "Old Portfolio Illustrations",
    description: "These illustrations were featured in my old portfolio."
  },
  cyberpunk: {
    title: "Cyberpunk",
    description: "An illustration inspired by the series <b>Cyberpunk: Edgerunners.</b>"
  },
  "san-valentin": {
    title: "Valentine's Day",
    description: "For Valentine's Day, I made a <strong>vending machine for date ideas</strong>. You could send it to someone you wanted to spend the day with; they would choose a date and receive a ticket with the plan. I made it using Figma screens."
  },
  clases: {
    title: "Art Classes",
    description: "I worked at an <strong>art academy</strong> for about a year while starting to create content online for myself. The pay was not great, so I decided to offer <strong>private lessons</strong>. I built my own website and handed out flyers. I still teach art and creativity, always making sure children <strong>enjoy themselves, experiment and do not feel frustrated</strong>."
  },
  justicia: {
    title: "Justice",
    description: "An illustration exploring the feeling of justice as something corrupted."
  },
  carteles: {
    title: "Poster Design",
    description: "A few years ago, I started selling <strong>designs and posters on Etsy</strong>. It went quite well, although I felt there was a limit to it. I still loved creating these designs, which helped me <strong>condense ideas and experiment with different formats</strong>."
  },
  "old-portfolio": {
    title: "Old Portfolio",
    description: "My old portfolio took a long time to make and had a striking, unusual look, but I felt it was <strong>not very practical</strong>. A portfolio's main purpose is to summarise your work so people can understand it quickly."
  },
  "my-melody": {
    title: "My Melody",
    description: "A practice piece using a <strong>reference image</strong>. I tried to recreate the reference as closely as possible."
  },
  limpiadorcito: {
    title: "Desktop Cleaner",
    description: "An app I designed to help me <strong>organise my computer desktop</strong> more quickly. You can view, delete or rename files, then create subfolders and sort files into a selected folder with one button."
  },
  "pixel-art-planetas": {
    title: "Pixel Art Planets",
    description: "I love <strong>pixel art</strong> and wanted to try making an animation. This is the result, made in Procreate."
  },
  museo: {
    title: "Museum",
    description: "An illustration inspired by a reference image I found many years ago."
  },
  gris: {
    title: "Grey",
    description: "I made this illustration when I was mainly creating <strong>portraits</strong>. I really like its result and composition. One of my references at the time was Elena Sai."
  },
  "animacion-musical": {
    title: "Musical Animation",
    description: "I wanted to experiment with <strong>animation</strong>, although I had no previous experience and the movements are not especially fluid. I still really liked the result. These were small scenes for <strong>Instagram</strong>, with no set theme, just ideas that came to me and that I decided to bring together."
  },
  cafe: {
    title: "Coffee",
    description: "A portrait study."
  },
  "magia-de-lo-cotidiano": {
    title: "Everyday Magic",
    description: "At first I wanted to create a scene about <strong>friendship</strong>, but I was not happy with the characters, so I changed direction. I ended up creating a small scene in a <strong>magical house in a fantasy world</strong>, with a cosy, autumnal aesthetic."
  },
  patreon: {
    title: "Patreon",
    description: "My <strong>Patreon</strong> is one of my biggest projects and one I am most proud of. I started it when I began posting on social media, then gradually added illustrations, recreatable projects, a Mail Club, tutorials, tips and podcasts. It brings together my <strong>extra content and resources for the community</strong>, and means a lot to me because I believe it offers real value."
  }
};

const interfaceEnglish = {
  "about-title": "About me",
  "about-first": "I am <strong>Alejandra Marín</strong> (1999), a Spanish illustrator currently living in Cartagena, Murcia. I work across different disciplines, although <strong>illustration</strong> is usually my main medium.",
  "about-second": "I love working with stories and creating <strong>feminine, fantastical aesthetics</strong>. I believe aesthetics completely change how we experience something, so I like to take my art further by exploring its functionality through apps, games, projects and entire visual worlds.",
  "about-third": "I consider myself <strong>self-taught</strong>, and my main motivation is to keep exploring and expanding my creative practice. I love learning new things and experimenting with different media, because the more experiences I gather, the broader my perspective and creativity become.",
  "skills-title": "Software I use",
  "home-album": "My portfolio ୨୧ ˖ Hi, I'm <strong>Ale</strong>",
  "home-location": "Spain · 27 · Illustrator ♡",
  "home-chat-name": "➤ Alee says:",
  "home-chat-message": "I don't even know <em>who I am</em> or what I do. How do I know if I'm on the right track?",
  "home-chat-reply-name": "˚.⋆꒰১ ໒꒱⋆.˚ says: ➤",
  "home-chat-reply": "Just make sure the puzzle pieces form a picture you like.",
  "home-sections": "Sections",
  "home-illustration": "Illustration",
  "home-editorial": "Editorial",
  "home-web": "Web/app",
  "home-media-kit": "Media Kit",
  "works-title": "Projects",
  "filter-all": "all",
  "filter-illustration": "Illustration/animation",
  "filter-editorial": "Editorial",
  "filter-web": "Web/Apps",
  "filter-personal": "Personal projects",
  "filter-teaching": "Teaching",
  "filter-aria": "Filter projects by category",
  "nav-about": "about me",
  "nav-projects": "projects",
  "nav-contact": "contact",
  "contact-available": "♡ available for commissions and projects",
  "contact-aria": "Close",
  "close-project-aria": "Close",
  "project-reel": "Reel",
  "image-lightbox-aria": "Enlarged image",
  "close-image-aria": "Close image",
  "project-back": "← back to projects",
  "project-placeholder-title": "Project 1",
  "project-placeholder-meta": "Category · Client · 2026",
  "project-placeholder-description": "Write a short description of the project here: the challenge, your process and the result. Two or three sentences are usually enough.",
  "project-placeholder-alt": "Project 1 detail",
  "document-title-about": "About me ⟡ Ale",
  "document-title-works": "Projects ⟡ Ale Marín",
  "document-title-project": "Project 1 ⟡ Your Name",
  "minimize": "minimise",
  "close": "close"
};

const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
const storedLanguage = localStorage.getItem('portfolio-language');
let currentLanguage = requestedLanguage === 'en' || (requestedLanguage !== 'es' && storedLanguage === 'en') ? 'en' : 'es';

function getLocalizedProject(id) {
  const project = projectsData[id];
  if (!project || currentLanguage !== 'en') return project;

  const translation = projectEnglish[id];
  const categoryTranslations = {
    "Ilustración": "Illustration",
    "Proyectos personales": "Personal projects",
    "Enseñanza": "Teaching",
    "enseñanza": "Teaching"
  };
  const meta = project.meta
    .replace(/\bWordpress\b/gi, 'WordPress')
    .replace(/\bAnimación\b/g, 'Animation')
    .replace(/\bPintura\b/g, 'Painting')
    .replace(/\bObra\b/g, 'Artwork')
    .replace(/\bPresencial\b/g, 'In person');

  return {
    ...project,
    title: translation ? translation.title : project.title,
    category: categoryTranslations[project.category] || project.category,
    meta,
    description: translation ? translation.description : project.description
  };
}

const homeTexts = [
  ['.album-text p:first-child', 'home-album'],
  ['.album-text p:nth-child(2)', 'home-location'],
  ['.chat-left .chat-name', 'home-chat-name'],
  ['.bubble-pink', 'home-chat-message'],
  ['.chat-right .chat-name', 'home-chat-reply-name'],
  ['.bubble-blue', 'home-chat-reply']
];
const homeSpanishTexts = homeTexts.map(([selector]) =>
  document.querySelector(selector)?.innerHTML
);

function applyLanguage() {
  const isEnglish = currentLanguage === 'en';
  const t = interfaceEnglish;
  const setText = (element, english, spanish) => {
    if (element) element.textContent = isEnglish ? english : spanish;
  };
  document.documentElement.lang = isEnglish ? 'en' : 'es';
  document.getElementById('lang-toggle').textContent = isEnglish ? 'ES' : 'EN';

  const aboutPage = document.querySelector('.ab-page');
  if (aboutPage) {
    setText(aboutPage.querySelector('.sr-only'), 'About me', 'Sobre mí');
    const labels = [
      ['✧ about me', '✧ sobre mí'],
      ['✧ facts', '✧ datos'],
      ['✧ languages', '✧ idiomas'],
      ['✧ software', '✧ softwares'],
      ['✧ education', '✧ estudios'],
      ['✧ experience', '✧ experiencia']
    ];
    aboutPage.querySelectorAll('.ab-label').forEach((label, index) => {
      if (labels[index]) setText(label, labels[index][0], labels[index][1]);
    });

    const intro = aboutPage.querySelectorAll('.ab-intro-text p');
    setText(intro[1], 'illustrator · 1999 · Cartagena, Murcia', 'ilustradora · 1999 · cartagena, murcia');
    const introTranslations = [
      [
        'I am a Spanish illustrator. I work across different disciplines, although <strong>illustration</strong> is usually my main medium.',
        'Soy ilustradora española. Trabajo con distintas disciplinas, aunque la <strong>ilustración</strong> suele ser mi medio principal.'
      ],
      [
        'I love working with stories and creating <strong>feminine, fantastical aesthetics</strong>. I believe aesthetics completely change how we experience something, so I take my art further by exploring its functionality through apps, games, projects and entire visual worlds.',
        'Me gusta trabajar con historias y crear <strong>estéticas femeninas y fantásticas</strong>. Creo que la estética cambia por completo la forma en la que experimentamos algo, por eso llevo mi arte más allá, explorando su funcionalidad en aplicaciones, juegos, proyectos y universos visuales enteros.'
      ],
      [
        'I am <strong>self-taught</strong>, and my main motivation is to keep exploring. The more experiences I gather, the broader my perspective and creativity become.',
        'Soy <strong>autodidacta</strong> y mi motor es seguir explorando. Cuantas más experiencias recoja, más podré ampliar mi forma de ver y crear.'
      ]
    ];
    introTranslations.forEach(([english, spanish], index) => {
      const paragraph = intro[index + 2];
      if (paragraph) paragraph.innerHTML = isEnglish ? english : spanish;
    });

    const facts = [
      ['nationality: Spanish', 'nacionalidad: española'],
      ['coffee lover <small>(and no sugar)</small>', 'fan del café <small>(y sin azúcar)</small>'],
      ['internet + books = happy', 'internet + libros = feliz'],
      ['gamer with no time to play', 'gamer frustrada por no tener tiempo']
    ];
    aboutPage.querySelectorAll('.ab-facts li > span:last-child').forEach((fact, index) => {
      if (facts[index]) fact.innerHTML = isEnglish ? facts[index][0] : facts[index][1];
    });
    setText(aboutPage.querySelector('.ab-coffee > span:first-child'), 'caffeine', 'cafeína');
    const coffeeMeter = aboutPage.querySelector('.ab-coffee');
    if (coffeeMeter) coffeeMeter.setAttribute('aria-label', isEnglish ? 'Caffeine level at 80%' : 'Nivel de cafeína al 80%');

    const languageNames = [
      ['Spanish', 'español'],
      ['English', 'inglés'],
      ['French', 'francés']
    ];
    aboutPage.querySelectorAll('.ab-langs .lang > span:first-child').forEach((name, index) => {
      if (languageNames[index]) setText(name, languageNames[index][0], languageNames[index][1]);
    });
    aboutPage.querySelectorAll('.ab-langs .bar[aria-label]').forEach((bar, index) => {
      if (index === 0) bar.setAttribute('aria-label', isEnglish ? 'Native' : 'Nativo');
      else bar.setAttribute('aria-label', isEnglish ? `Level ${index === 1 ? 'B2' : 'A2'}` : `Nivel ${index === 1 ? 'B2' : 'A2'}`);
    });
    const nativeLevel = aboutPage.querySelector('.ab-langs .lang:first-child .lv');
    setText(nativeLevel, 'native', 'nativo');

    const timelineTranslations = [
      [
        [
          'Self-directed learning',
          'Online courses, daily practice and personal projects',
          'Formación autodidacta',
          'cursos online, práctica diaria y proyectos propios'
        ],
        [
          'BA thesis: The feasibility of webmanga in the context of Web3',
          'Grade: 9.2 (proposed for honours)',
          'TFG Viabilidad del Webmanga en el contexto de la web3',
          '9.2 propuesto para matricula de honor'
        ],
        [
          'Erasmus',
          'The Eugeniusz Geppert Academy of Art and Design in Wroclaw',
          'Erasmus',
          'The Eugeniusz Geppert Academy of Art and Design in Wroclaw'
        ],
        [
          'Fine Arts degree',
          'Partly completed at UCLM (Cuenca) and UMU (Murcia)',
          'Grado en Bellas artes',
          'Cursado a medias en la UCLM (cuenca) y la UMU (Murcia)'
        ]
      ],
      [
        [
          'Freelance illustrator',
          'Editorial commissions, brand collaborations and personal projects',
          'Ilustradora freelance',
          'encargos editoriales, colaboraciones con marcas y proyectos propios'
        ],
        [
          'Teaching',
          'Drawing teacher at Pinta con Vincent Academy; private painting and drawing lessons',
          'Enseñanza',
          'Profesora de dibujo en la academia Pinta con Vincent - Clases particulares de pintura y dibujo'
        ],
        [
          'Tech startup',
          'Contributed to the development of Web3 projects',
          'Startup tecnológica',
          'Participación en el desarrollo de proyectos en la web3'
        ],
        [
          'Exhibitions',
          'Participation in group exhibitions',
          'Exposiciones',
          'Participación en exposiciones colecctivas, '
        ]
      ]
    ];
    aboutPage.querySelectorAll('.ab-timeline').forEach((timeline, timelineIndex) => {
      timeline.querySelectorAll('li').forEach((item, itemIndex) => {
        const translation = timelineTranslations[timelineIndex]?.[itemIndex];
        if (!translation) return;
        const date = item.querySelector('.when');
        if (date && (date.textContent.includes('hoy') || date.textContent.includes('present'))) {
          date.textContent = isEnglish ? date.textContent.replace('hoy', 'present') : date.textContent.replace('present', 'hoy');
        }
        setText(item.querySelector('strong'), translation[0], translation[2]);
        const description = item.lastElementChild?.querySelector('span');
        setText(description, translation[1], translation[3]);
      });
    });
    aboutPage.querySelectorAll('.ab-tools span').forEach((tool) => {
      if (tool.textContent === 'Wordpress' || tool.textContent === 'WordPress') {
        setText(tool, 'WordPress', 'Wordpress');
      }
    });
  }

  const legacyAbout = document.querySelector('.about-page');
  if (legacyAbout) {
    setText(legacyAbout.querySelector('.sr-only'), 'About me', 'Sobre mí');
    legacyAbout.querySelectorAll('.fact > span:last-child').forEach((fact, index) => {
      const facts = [
        ['nationality: Spanish', 'nacionalidad: española'],
        ['coffee addict <small>(officially)</small>', 'adicta al café <small>(oficialmente)</small>'],
        ['draws better with rain in the background', 'dibuja mejor con lluvia de fondo'],
        ['always has a paint stain', 'siempre con una mancha de pintura']
      ];
      if (facts[index]) fact.innerHTML = isEnglish ? facts[index][0] : facts[index][1];
    });
    setText(legacyAbout.querySelector('.meter-label'), 'caffeine', 'cafeína');
    const meter = legacyAbout.querySelector('.meter');
    if (meter) meter.setAttribute('aria-label', isEnglish ? 'Caffeine level at 80%' : 'Nivel de cafeína al 80%');
    const windowTitles = legacyAbout.querySelectorAll('.window-title');
    setText(windowTitles[1], 'about-me.txt', 'sobre-mi.txt');
    setText(windowTitles[2], 'software.exe', 'softwares.exe');
    setText(legacyAbout.querySelector('.skills-list li:nth-child(3)'), 'WordPress', 'Wordpress');
  }

  const mediaKit = document.querySelector('.media-kit-page');
  if (mediaKit) {
    setText(mediaKit.querySelector('.sr-only'), 'Media kit', 'media kit');
    const headings = [
      ['✧ media kit', '✧ media kit'],
      ['✧ stats ✧ last 90 days', '✧ stats ✧ últimos 90 días'],
      ['✧ services', '✧ servicios'],
      ['✧ featured Instagram videos', '✧ vídeos destacados de instagram'],
      ['✧ contact', '✧ contacto']
    ];
    mediaKit.querySelectorAll('.mk-label').forEach((heading, index) => {
      if (headings[index]) setText(heading, headings[index][0], headings[index][1]);
    });
    setText(mediaKit.querySelector('.mk-role'), 'illustration · design · web', 'ilustradora · diseño · web');
    setText(mediaKit.querySelector('.mk-bio'), 'I create visual worlds with a feminine, fantastical aesthetic. Creating is what matters most to me, and I carefully choose every collaboration and project.', 'Creo universos visuales con estética femenina y de fantasía, para mi lo más importante es crear. Elijo cada colaboración y proyecto con cuidado.');
    setText(mediaKit.querySelector('.mk-tags'), '🎨 Creativity | ⭐️ Illustration | 🌸 Technology', '🎨 Creatividad | ⭐️ ilustración | 🌸 Tecnología');
    const statLabels = [
      ['Instagram followers', 'seguidores ig'],
      ['TikTok followers', 'tik tok'],
      ['Instagram views', 'Views ig'],
      ['Instagram interactions', 'interacciones ig']
    ];
    mediaKit.querySelectorAll('.stat-label').forEach((label, index) => {
      if (statLabels[index]) setText(label, statLabels[index][0], statLabels[index][1]);
    });
    const services = [
      ['Editorial illustration', 'Covers, books, magazines, packaging', 'ilustración editorial', 'portadas, libros, revistas, packaging'],
      ['Brand collaborations', 'Content, campaigns, launches', 'colaboraciones de marca', 'contenido, campañas, lanzamientos'],
      ['Web design & UX/UI', 'Websites, shops and digital worlds', 'diseño web & ux/ui', 'webs, tiendas y universos digitales'],
      ['Custom projects', 'Games, apps, unusual and beautiful ideas', 'proyectos a medida', 'juegos, apps, ideas raras y bonitas']
    ];
    mediaKit.querySelectorAll('.mk-services li').forEach((item, index) => {
      const service = services[index];
      if (!service) return;
      setText(item.querySelector('strong'), service[0], service[2]);
      setText(item.querySelector('span'), service[1], service[3]);
    });
    mediaKit.querySelectorAll('.mk-video iframe').forEach((video, index) => {
      video.title = isEnglish ? `Featured Instagram video ${index + 1}` : `Vídeo destacado de Instagram ${index + 1}`;
    });
    mediaKit.querySelectorAll('.mk-video a').forEach((link) => {
      setText(link, 'View on Instagram', 'Ver en Instagram');
    });
    setText(mediaKit.querySelector('.mk-link:not(.mk-link-small)'), 'Let’s work together ♡', 'trabajemos juntas ♡');
    const pdfLink = mediaKit.querySelector('.mk-link-small');
    setText(pdfLink, 'Download PDF', 'descargar pdf');
    if (pdfLink) pdfLink.href = isEnglish ? 'assets/media-kit-en.pdf' : 'assets/media-kit.pdf';
  }

  const footerNav = document.querySelector('.footer-links');
  if (footerNav) footerNav.setAttribute('aria-label', isEnglish ? 'Social media and shop' : 'Redes y tienda');
  const footerShop = document.getElementById('footer-shop');
  if (footerShop) footerShop.textContent = isEnglish ? 'Shop' : 'Tienda';
  musicToggle.setAttribute('aria-label', backgroundMusic.error
    ? (isEnglish ? 'Music unavailable' : 'Música no disponible')
    : (isEnglish
      ? (backgroundMusic.paused ? 'Play music' : 'Pause music')
      : (backgroundMusic.paused ? 'Reproducir música' : 'Pausar música')));
  const logo = document.querySelector('.logo');
  if (logo) logo.setAttribute('aria-label', isEnglish ? 'Home' : 'Inicio');
  document.querySelector('.main-nav a[href*="about.html"]').textContent = isEnglish ? t["nav-about"] : 'sobre mí';
  document.querySelector('.main-nav a[href*="works.html"]').textContent = isEnglish ? t["nav-projects"] : 'proyectos';
  document.getElementById('nav-media-kit').textContent = 'media kit';
  document.getElementById('open-contact').textContent = isEnglish ? t["nav-contact"] : 'contacto';
  const contactItems = document.querySelectorAll('.contact-list li');
  if (contactItems[1]?.firstChild) {
    contactItems[1].firstChild.nodeValue = isEnglish ? '♡ Instagram — ' : '♡ instagram — ';
  }
  if (contactItems[2]?.firstChild) {
    contactItems[2].firstChild.nodeValue = isEnglish ? '♡ shop — ' : '♡ tienda — ';
  }
  if (contactItems[3]) {
    contactItems[3].textContent = isEnglish ? t["contact-available"] : '♡ disponible para encargos y proyectos';
  }
  document.getElementById('close-contact').setAttribute('aria-label', isEnglish ? t["contact-aria"] : 'Cerrar');

  const title = document.querySelector('.about-text h1');
  if (title) title.textContent = isEnglish ? t["about-title"] : 'Sobre mí';
  const portrait = document.querySelector('.about-portrait img, .portrait img, .ab-photo img');
  if (portrait) portrait.alt = isEnglish ? 'Portrait of Alejandra Marín' : 'Retrato de Alejandra Marín';
  const aboutParagraphs = [...document.querySelectorAll('.about-text p')].filter((p) => p.textContent.trim());
  const aboutKeys = ["about-first", "about-second", "about-third"];
  const aboutSpanish = [
    'Soy <strong>Alejandra Marín</strong> (1999), una ilustradora española que actualmente vive en Cartagena (Murcia). Trabajo con distintas disciplinas, aunque la <strong>ilustración</strong> suele ser mi medio principal.',
    'Me gusta trabajar con historias y crear <strong>estéticas femeninas y fantásticas</strong>. Creo que la estética cambia por completo la forma en la que experimentamos algo, por eso me gusta llevar mi arte un poco más allá, explorando su funcionalidad a través de aplicaciones, juegos, proyectos y universos visuales enteros.',
    'Me considero <strong>autodidacta</strong> y mi principal motor es seguir explorando y expandiendo mi forma de crear. Me gusta aprender cosas nuevas y experimentar con diferentes medios, porque creo que cuantas más experiencias recoja, más podré ampliar mi forma de ver y crear.'
  ];
  aboutParagraphs.slice(0, 3).forEach((p, index) => {
    p.innerHTML = isEnglish ? t[aboutKeys[index]] : aboutSpanish[index];
  });
  const skillsTitle = document.querySelector('.about-text h2');
  if (skillsTitle) skillsTitle.textContent = isEnglish ? t["skills-title"] : 'Softwares utilizados';

  const worksTitle = document.querySelector('.works-page .page-title');
  if (worksTitle) worksTitle.textContent = isEnglish ? t["works-title"] : 'Proyectos';
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    filterBar.setAttribute('aria-label', isEnglish ? t["filter-aria"] : 'Filtrar proyectos por categoría');
    const filterLabels = {
      todos: ['todos', t["filter-all"]],
      "Ilustración": ['Ilustración/animación', t["filter-illustration"]],
      Editorial: ['Editorial', t["filter-editorial"]],
      "Web/Apps": ['Web/Apps', t["filter-web"]],
      "Proyectos personales": ['Proyectos personales', t["filter-personal"]],
      Enseñanza: ['Enseñanza', t["filter-teaching"]]
    };
    filterBar.querySelectorAll('.filter-btn').forEach((button) => {
      const labels = filterLabels[button.dataset.filter];
      if (labels) button.textContent = isEnglish ? labels[1] : labels[0];
    });
  }

  document.querySelectorAll('.work-card').forEach((card) => {
    const project = getLocalizedProject(card.dataset.project);
    if (!project) return;
    const heading = card.querySelector('h2');
    const meta = card.querySelector('.work-card-info p');
    const image = card.querySelector('img');
    if (heading) heading.textContent = project.title;
    if (meta) meta.textContent = project.meta;
    if (image) image.alt = project.title;
  });

  homeTexts.forEach(([selector, key], index) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = isEnglish ? t[key] : homeSpanishTexts[index];
  });
  document.querySelectorAll('.window-controls button').forEach((button, index) => {
    const label = index % 2 === 0 ? 'minimize' : 'close';
    const spanish = index % 2 === 0 ? 'minimizar' : 'cerrar';
    button.setAttribute('aria-label', isEnglish ? t[label] : spanish);
  });
  const albumImage = document.querySelector('.album-photo img');
  if (albumImage) albumImage.alt = isEnglish ? 'Presentation photo' : 'Foto de presentación';
  const sectionNav = document.querySelector('.pill-nav');
  if (sectionNav) {
    sectionNav.setAttribute('aria-label', isEnglish ? t["home-sections"] : 'Secciones');
    const labels = [
      ['.pill:nth-child(1)', t["home-illustration"], 'Ilustración'],
      ['.pill:nth-child(2)', t["home-editorial"], 'Editorial'],
      ['.pill:nth-child(3)', t["home-web"], 'Web/app'],
      ['.pill:nth-child(4)', t["home-media-kit"], 'Media Kit']
    ];
    labels.forEach(([selector, english, spanish]) => {
      const link = sectionNav.querySelector(selector);
      if (link) link.textContent = isEnglish ? english : spanish;
    });
  }

  const backLink = document.querySelector('.project-page .back-link');
  if (backLink) backLink.textContent = isEnglish ? t["project-back"] : '← volver a proyectos';
  const projectParams = new URLSearchParams(window.location.search);
  if (document.querySelector('.project-page') && !projectParams.has('title')) {
    setText(document.querySelector('.project-page .page-title'), t["project-placeholder-title"], 'Nombre del proyecto 1');
    setText(document.querySelector('.project-page .project-meta'), t["project-placeholder-meta"], 'Categoría · Cliente · 2026');
    setText(
      document.querySelector('.project-page .project-description'),
      t["project-placeholder-description"],
      'Escribe aquí una breve descripción del proyecto: el reto, tu proceso y el resultado. Dos o tres frases suelen bastar.'
    );
    document.querySelectorAll('.project-page .project-gallery img').forEach((image) => {
      image.alt = isEnglish ? t["project-placeholder-alt"] : 'Detalle del proyecto 1';
    });
  }

  const projectClose = document.getElementById('close-project');
  if (projectClose) projectClose.setAttribute('aria-label', isEnglish ? t["close-project-aria"] : 'Cerrar');
  const reelLink = document.getElementById('project-reel');
  if (reelLink) reelLink.textContent = isEnglish ? t["project-reel"] : 'Reel';
  const imageLightbox = document.querySelector('.image-lightbox');
  if (imageLightbox) {
    imageLightbox.setAttribute('aria-label', isEnglish ? t["image-lightbox-aria"] : 'Imagen ampliada');
    imageLightbox.querySelector('.image-lightbox-close').setAttribute('aria-label', isEnglish ? t["close-image-aria"] : 'Cerrar imagen');
  }

  const titleTranslations = {
    about: [t["document-title-about"], 'Sobre mí ⟡ Ale'],
    works: [t["document-title-works"], 'Proyectos ⟡ Ale Marín'],
    project: [t["document-title-project"], 'Nombre del proyecto 1 ⟡ Tu Nombre'],
    mediaKit: ['Media Kit ⟡ Alejandra Marín', 'Media kit ⟡ Alejandra Marín'],
    home: ['Ale Marín ⟡ Portfolio', 'Ale Marín ⟡ portafolio']
  };
  if (document.querySelector('.about-section, .ab-page, .about-page')) document.title = titleTranslations.about[isEnglish ? 0 : 1];
  else if (document.querySelector('.works-page')) document.title = titleTranslations.works[isEnglish ? 0 : 1];
  else if (document.querySelector('.media-kit-page')) document.title = titleTranslations.mediaKit[isEnglish ? 0 : 1];
  else if (document.querySelector('.project-page') && !new URLSearchParams(window.location.search).has('title')) {
    document.title = titleTranslations.project[isEnglish ? 0 : 1];
  } else if (document.querySelector('.home')) document.title = titleTranslations.home[isEnglish ? 0 : 1];
}

const languageToggle = document.getElementById('lang-toggle');
if (languageToggle) {
  languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    localStorage.setItem('portfolio-language', currentLanguage);
    applyLanguage();
  });
}

applyLanguage();

// ============================================
// PROYECTOS: FILTROS
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    workCards.forEach((card) => {
      const show = filter === 'todos' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
});

// ============================================
// PROYECTOS: MODAL DE PROYECTO (dos columnas)
// ============================================
// Cada tarjeta tiene un data-project único (el mismo id
// que su entrada en projectsData, más arriba), así que el
// modal se rellena siempre con los datos de esa entrada.

const projectModal = document.getElementById('project-modal');

if (projectModal) {
  const projectTitleEl = document.getElementById('project-title');
  const projectYearEl = document.getElementById('project-year');
  const projectRoleEl = document.getElementById('project-role');
  const projectReelEl = document.getElementById('project-reel');
  const projectDescriptionEl = document.getElementById('project-description');
  const projectGalleryEl = document.getElementById('project-gallery');
  const closeProjectBtn = document.getElementById('close-project');
  const imageLightbox = document.createElement('div');
  imageLightbox.className = 'image-lightbox';
  imageLightbox.setAttribute('role', 'dialog');
  imageLightbox.setAttribute('aria-modal', 'true');
  imageLightbox.setAttribute('aria-label', currentLanguage === 'en' ? 'Enlarged image' : 'Imagen ampliada');
  imageLightbox.innerHTML = '<button class="image-lightbox-close" type="button" aria-label="Cerrar imagen">&times;</button><img alt="">';
  imageLightbox.querySelector('.image-lightbox-close').setAttribute(
    'aria-label',
    currentLanguage === 'en' ? 'Close image' : 'Cerrar imagen'
  );
  document.body.appendChild(imageLightbox);
  const lightboxImage = imageLightbox.querySelector('img');

  function closeImageLightbox() {
    imageLightbox.classList.remove('is-open');
    imageLightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
  }

  function openImageLightbox(img) {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    imageLightbox.classList.add('is-open');
    imageLightbox.setAttribute('aria-hidden', 'false');
  }

  imageLightbox.setAttribute('aria-hidden', 'true');
  imageLightbox.addEventListener('click', (e) => {
    if (e.target === imageLightbox || e.target.closest('.image-lightbox-close')) {
      closeImageLightbox();
    }
  });

  let activeProjectId = null;

  function openProjectModal(id) {
    const data = getLocalizedProject(id);
    if (!data) return;

    activeProjectId = id;
    projectTitleEl.textContent = data.title;
    projectYearEl.textContent = data.meta;
    projectRoleEl.textContent = data.category;
    if (projectReelEl) {
      const reelUrl = typeof data.reel === 'string' ? data.reel.trim() : '';
      projectReelEl.hidden = !reelUrl;
      projectReelEl.href = reelUrl || '#';
    }
    projectDescriptionEl.innerHTML = data.description;

    projectGalleryEl.innerHTML = '';
    (data.images || []).forEach((src) => {
      const isVideo = /\.(mp4|webm|ogg|mov)(?:[?#].*)?$/i.test(src);
      const media = document.createElement(isVideo ? 'video' : 'img');
      media.src = src;
      if (isVideo) {
        media.controls = true;
        media.playsInline = true;
        media.preload = 'auto';
        media.setAttribute('aria-label', data.title);
      } else {
        media.alt = data.title;
        media.addEventListener('click', () => openImageLightbox(media));
      }
      media.onerror = () => {
        const fallback = document.createElement('div');
        fallback.className = 'gallery-fallback';
        fallback.style.background = '#e8e4da';
        media.replaceWith(fallback);
      };
      projectGalleryEl.appendChild(media);
    });

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    activeProjectId = null;
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  workCards.forEach((card) => {
    card.addEventListener('click', () => {
      openProjectModal(card.dataset.project);
    });
  });

  languageToggle?.addEventListener('click', () => {
    if (activeProjectId) openProjectModal(activeProjectId);
  });

  if (closeProjectBtn) {
    closeProjectBtn.addEventListener('click', closeProjectModal);
  }

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (imageLightbox.classList.contains('is-open')) {
        closeImageLightbox();
      } else if (projectModal.classList.contains('is-open')) {
        closeProjectModal();
      }
    }
  });
}

// ============================================
// PÁGINA DE PROYECTO
// ============================================
// Permite reutilizar los datos de una tarjeta al abrir una página de
// proyecto con ?title=...&meta=...&description=...

const projectPage = document.querySelector('.project-page');

if (projectPage) {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  const meta = params.get('meta');
  const description = params.get('description');
  const titleEl = projectPage.querySelector('.page-title');
  const metaEl = projectPage.querySelector('.project-meta');
  const descriptionEl = projectPage.querySelector('.project-description');

  if (title && titleEl) titleEl.textContent = title;
  if (meta && metaEl) metaEl.textContent = meta;
  if (description && descriptionEl) descriptionEl.innerHTML = description;
  if (title) document.title = `${title} ⟡ Ale Marín`;
}

// ============================================
// MAPA INTERACTIVO ALE MARÍN
// ============================================

const stars = document.querySelectorAll('.interactive-star');

stars.forEach((star) => {

  star.addEventListener('click', () => {

    const step = Number(star.dataset.step);

    // Evitar repetir la animación
    if (star.classList.contains('active')) {
      return;
    }

    // 1. Rellenar estrella
    star.classList.add('active');

    // 2. Mostrar categoría correspondiente
    const category = document.querySelector(
      `[data-content="${step}"]`
    );

    if (category) {

      category.classList.add('visible');

    }

    // 3. Dibujar la línea
    const line = document.querySelector(
      `[data-line="${step}"]`
    );

    if (line) {

      setTimeout(() => {

        line.classList.add('visible');

      }, 300);

    }

    // 4. Mostrar siguiente estrella
    const nextStar = document.querySelector(
      `.star-${step + 1}`
    );

    if (nextStar) {

      setTimeout(() => {

        nextStar.classList.add('visible');

      }, 1000);

    }

  });

});