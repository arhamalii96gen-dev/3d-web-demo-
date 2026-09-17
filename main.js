/* =========================================================
   VOXEL — MAIN.JS
   Three.js is loaded dynamically so the website never gets
   permanently stuck on the loading screen.
========================================================= */


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  document.querySelectorAll(selector);


/* =========================================================
   LOADER
========================================================= */

const loader = $(".loader");
const loaderBar = $("#loaderBar");
const loaderPercent = $("#loaderPercent");

let loaderValue = 0;

function finishLoader() {

  if (!loader) {
    return;
  }

  loader.classList.add("hide");

  document.body.classList.remove("loading");
  document.body.classList.add("loaded");
}


const loaderTimer = setInterval(() => {

  loaderValue +=
    Math.floor(Math.random() * 9) + 4;

  if (loaderValue >= 100) {

    loaderValue = 100;

    clearInterval(loaderTimer);

  }

  if (loaderBar) {
    loaderBar.style.width =
      `${loaderValue}%`;
  }

  if (loaderPercent) {
    loaderPercent.textContent =
      loaderValue;
  }

  if (loaderValue >= 100) {

    setTimeout(
      finishLoader,
      220
    );

  }

}, 45);


/*
  HARD FAILSAFE

  Even if an external module/CDN fails,
  the website MUST NOT remain stuck.
*/

setTimeout(
  finishLoader,
  4000
);


/* =========================================================
   HEADER + SCROLL
========================================================= */

const header =
  $("#header");

const progress =
  $("#progress");

const hero =
  $("#home");


let scrollY = 0;


function handleScroll() {

  scrollY =
    window.scrollY || 0;


  if (header) {

    header.classList.toggle(
      "scrolled",
      scrollY > 50
    );

  }


  if (progress) {

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;


    const percentage =
      documentHeight > 0
        ? (
            scrollY /
            documentHeight
          ) * 100
        : 0;


    progress.style.width =
      `${percentage}%`;

  }


  if (hero) {

    const amount =
      Math.min(
        scrollY /
        Math.max(window.innerHeight, 1),
        1
      );


    hero.style.opacity =
      String(
        1 -
        amount * 0.14
      );

  }

}


window.addEventListener(
  "scroll",
  handleScroll,
  {
    passive: true
  }
);


/* =========================================================
   CURSOR
========================================================= */

const cursorDot =
  $(".cursor-dot");

const cursorRing =
  $(".cursor-ring");


const canHover =
  window.matchMedia(
    "(pointer:fine)"
  ).matches;


if (
  canHover &&
  cursorDot &&
  cursorRing
) {

  let cursorX = 0;
  let cursorY = 0;

  let ringX = 0;
  let ringY = 0;


  window.addEventListener(
    "mousemove",
    (event) => {

      cursorX =
        event.clientX;

      cursorY =
        event.clientY;


      cursorDot.style.left =
        `${cursorX}px`;

      cursorDot.style.top =
        `${cursorY}px`;

    }
  );


  function cursorLoop() {

    ringX +=
      (
        cursorX -
        ringX
      ) * 0.14;


    ringY +=
      (
        cursorY -
        ringY
      ) * 0.14;


    cursorRing.style.left =
      `${ringX}px`;

    cursorRing.style.top =
      `${ringY}px`;


    requestAnimationFrame(
      cursorLoop
    );

  }


  cursorLoop();

}


/* =========================================================
   HOVER CURSOR
========================================================= */

$$(
  "a, button, .work-card, .service"
).forEach(
  (element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        document.body.classList.add(
          "cursor-hover"
        );

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        document.body.classList.remove(
          "cursor-hover"
        );

      }
    );

  }
);


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

if (canHover) {

  $$(".magnetic").forEach(
    (element) => {

      element.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            element.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left -
            rect.width / 2;


          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          element.style.transform =
            `translate(
              ${x * 0.14}px,
              ${y * 0.14}px
            )`;

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.style.transform =
            "translate(0,0)";

        }
      );

    }
  );

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "in-view"
            );

          }

        }
      );

    },
    {
      threshold: 0.15
    }
  );


$$(".reveal").forEach(
  (element) => {

    revealObserver.observe(
      element
    );

  }
);


/* =========================================================
   WORK CARDS
========================================================= */

const workObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

          }

        }
      );

    },
    {
      threshold: 0.12
    }
  );


$$(".work-card").forEach(
  (card) => {

    workObserver.observe(
      card
    );

  }
);


/* =========================================================
   PHILOSOPHY
========================================================= */

const philosophy =
  $("#philosophy");


if (philosophy) {

  const philosophyObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "philosophy-visible"
              );

            }

          }
        );

      },
      {
        threshold: 0.28
      }
    );


  philosophyObserver.observe(
    philosophy
  );

}


/* =========================================================
   CONTACT
========================================================= */

const contact =
  $(".contact-reveal");


if (contact) {

  const contactObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "contact-visible"
              );

            }

          }
        );

      },
      {
        threshold: 0.22
      }
    );


  contactObserver.observe(
    contact
  );

}


/* =========================================================
   PROJECT MODAL
========================================================= */

const modal =
  $("#workModal");

const modalTitle =
  $("#modalTitle");

const modalText =
  $("#modalText");

const modalClose =
  $("#modalClose");


$$(".work-card").forEach(
  (card) => {

    card.addEventListener(
      "click",
      () => {

        if (modalTitle) {

          modalTitle.textContent =
            card.dataset.project ||
            "Project";

        }


        if (modalText) {

          modalText.textContent =
            card.dataset.copy ||
            "Project details.";

        }


        if (modal) {

          modal.classList.add(
            "active"
          );

        }


        document.body.classList.add(
          "loading"
        );

      }
    );

  }
);


function closeModal() {

  if (modal) {

    modal.classList.remove(
      "active"
    );

  }


  document.body.classList.remove(
    "loading"
  );

}


if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeModal
  );

}


if (modal) {

  modal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   SMOOTH ANCHOR LINKS
========================================================= */

$$(
  'a[href^="#"]'
).forEach(
  (link) => {

    link.addEventListener(
      "click",
      (event) => {

        const id =
          link.getAttribute(
            "href"
          );


        if (
          !id ||
          id === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            id
          );


        if (!target) {

          return;

        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  }
);


/* =========================================================
   THREE.JS
   DYNAMIC IMPORT
========================================================= */

async function initThree() {

  try {

    /*
      IMPORTANT:
      Dynamic import means that if Three.js CDN
      fails, the rest of the website STILL works.
    */

    const THREE =
      await import(
        "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"
      );


    const canvas =
      $("#scene");


    if (!canvas) {

      return;

    }


    /* -------------------------------------------------------
       SCENE
    ------------------------------------------------------- */

    const scene =
      new THREE.Scene();


    /* CAMERA */

    const camera =
      new THREE.PerspectiveCamera(
        45,
        innerWidth / innerHeight,
        0.1,
        100
      );


    camera.position.z =
      6;


    /* RENDERER */

    const renderer =
      new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
      });


    renderer.setPixelRatio(
      Math.min(
        devicePixelRatio,
        2
      )
    );


    renderer.setSize(
      innerWidth,
      innerHeight
    );


    renderer.outputColorSpace =
      THREE.SRGBColorSpace;


    /* -------------------------------------------------------
       BALL
    ------------------------------------------------------- */

    const sphere =
      new THREE.Mesh(

        new THREE.IcosahedronGeometry(
          1.8,
          5
        ),

        new THREE.MeshStandardMaterial({
          color: 0xff5733,
          roughness: 0.2,
          metalness: 0.8
        })

      );


    sphere.position.set(
      2.2,
      0,
      0
    );


    scene.add(
      sphere
    );


    /* -------------------------------------------------------
       LIGHTS
    ------------------------------------------------------- */

    const ambient =
      new THREE.AmbientLight(
        0xffffff,
        0.35
      );


    scene.add(
      ambient
    );


    const mainLight =
      new THREE.PointLight(
        0xffffff,
        50
      );


    mainLight.position.set(
      4,
      4,
      5
    );


    scene.add(
      mainLight
    );


    const orangeLight =
      new THREE.PointLight(
        0xff5733,
        30
      );


    orangeLight.position.set(
      -4,
      -2,
      3
    );


    scene.add(
      orangeLight
    );


    const rimLight =
      new THREE.PointLight(
        0xffb4a5,
        10
      );


    rimLight.position.set(
      5,
      -4,
      -2
    );


    scene.add(
      rimLight
    );


    /* -------------------------------------------------------
       GLOW
    ------------------------------------------------------- */

    const glowCanvas =
      document.createElement(
        "canvas"
      );


    glowCanvas.width =
      256;

    glowCanvas.height =
      256;


    const glowContext =
      glowCanvas.getContext(
        "2d"
      );


    if (glowContext) {

      const gradient =
        glowContext.createRadialGradient(
          128,
          128,
          0,
          128,
          128,
          128
        );


      gradient.addColorStop(
        0,
        "rgba(255,87,51,.60)"
      );


      gradient.addColorStop(
        .22,
        "rgba(255,87,51,.28)"
      );


      gradient.addColorStop(
        .58,
        "rgba(255,87,51,.07)"
      );


      gradient.addColorStop(
        1,
        "rgba(255,87,51,0)"
      );


      glowContext.fillStyle =
        gradient;


      glowContext.fillRect(
        0,
        0,
        256,
        256
      );

    }


    const glow =
      new THREE.Sprite(

        new THREE.SpriteMaterial({
          map:
            new THREE.CanvasTexture(
              glowCanvas
            ),

          transparent: true,

          depthWrite: false,

          blending:
            THREE.AdditiveBlending
        })

      );


    glow.scale.set(
      6,
      6,
      1
    );


    scene.add(
      glow
    );


    /* -------------------------------------------------------
       HALO
    ------------------------------------------------------- */

    const ring =
      new THREE.Mesh(

        new THREE.TorusGeometry(
          2.55,
          0.008,
          12,
          160
        ),

        new THREE.MeshBasicMaterial({
          color: 0xff5733,
          transparent: true,
          opacity: 0.08
        })

      );


    ring.rotation.x =
      Math.PI * .62;

    ring.rotation.y =
      Math.PI * .12;


    scene.add(
      ring
    );


    const ring2 =
      new THREE.Mesh(

        new THREE.TorusGeometry(
          3.15,
          0.006,
          12,
          160
        ),

        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.04
        })

      );


    ring2.rotation.x =
      Math.PI * .34;

    ring2.rotation.y =
      Math.PI * .24;


    scene.add(
      ring2
    );


    /* -------------------------------------------------------
       PARTICLES
    ------------------------------------------------------- */

    const particleCount =
      520;


    const positions =
      new Float32Array(
        particleCount * 3
      );


    for (
      let i = 0;
      i < particleCount;
      i++
    ) {

      const direction =
        new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        ).normalize();


      const radius =
        4 +
        Math.random() *
        9;


      positions[
        i * 3
      ] =
        direction.x *
        radius;


      positions[
        i * 3 + 1
      ] =
        direction.y *
        radius *
        .65;


      positions[
        i * 3 + 2
      ] =
        direction.z *
        radius;

    }


    const particleGeometry =
      new THREE.BufferGeometry();


    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );


    const particles =
      new THREE.Points(

        particleGeometry,

        new THREE.PointsMaterial({
          color: 0xff5733,
          size: 0.017,
          transparent: true,
          opacity: .62,
          depthWrite: false
        })

      );


    scene.add(
      particles
    );


    /* -------------------------------------------------------
       MOUSE
    ------------------------------------------------------- */

    let mouseX = 0;
    let mouseY = 0;

    let targetCameraX = 0;
    let targetCameraY = 0;

    let targetBallX = 2.2;
    let targetBallY = 0;


    window.addEventListener(
      "mousemove",
      (event) => {

        mouseX =
          event.clientX /
          innerWidth *
          2 -
          1;


        mouseY =
          -(
            event.clientY /
            innerHeight *
            2 -
            1
          );


        const mobile =
          innerWidth < 900;


        targetCameraX =
          mouseX * .16;


        targetCameraY =
          mouseY * .10;


        targetBallX =
          (mobile ? 1.7 : 2.2) +
          mouseX *
          (mobile ? .14 : .27);


        targetBallY =
          mouseY *
          (mobile ? .12 : .22);

      }
    );


    /* -------------------------------------------------------
       ANIMATION
    ------------------------------------------------------- */

    const clock =
      new THREE.Clock();


    function animate() {

      requestAnimationFrame(
        animate
      );


      const time =
        clock.getElapsedTime();


      /* CAMERA */

      camera.position.x +=
        (
          targetCameraX -
          camera.position.x
        ) * .035;


      camera.position.y +=
        (
          targetCameraY -
          camera.position.y
        ) * .035;


      /* BALL */

      sphere.position.x +=
        (
          targetBallX -
          sphere.position.x
        ) * .035;


      sphere.position.y +=
        (
          targetBallY +
          Math.sin(
            time * .72
          ) *
          .07 -
          sphere.position.y
        ) *
        .028;


      const scrollDepth =
        Math.min(
          scrollY /
          Math.max(
            innerHeight,
            1
          ),
          5
        );


      sphere.position.z =
        Math.sin(
          scrollDepth *
          .36
        ) *
        .11;


      sphere.rotation.x +=
        .0017;


      sphere.rotation.y +=
        .003;


      sphere.rotation.z =
        Math.sin(
          time * .34
        ) *
        .045;


      /* GLOW */

      glow.position.copy(
        sphere.position
      );


      glow.scale.setScalar(
        6 +
        Math.sin(
          time * 1.1
        ) *
        .1
      );


      /* RINGS */

      ring.position.copy(
        sphere.position
      );


      ring2.position.copy(
        sphere.position
      );


      ring.rotation.z +=
        .0017;


      ring2.rotation.z -=
        .0011;


      /* PARTICLES */

      particles.rotation.y =
        time *
        .01;


      particles.rotation.x =
        Math.sin(
          time * .14
        ) *
        .025;


      particles.position.x +=
        (
          mouseX * .08 -
          particles.position.x
        ) *
        .03;


      particles.position.y +=
        (
          mouseY * .045 -
          particles.position.y
        ) *
        .03;


      renderer.render(
        scene,
        camera
      );

    }


    animate();


    /* -------------------------------------------------------
       RESIZE
    ------------------------------------------------------- */

    window.addEventListener(
      "resize",
      () => {

        camera.aspect =
          innerWidth /
          innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
          innerWidth,
          innerHeight
        );


        renderer.setPixelRatio(
          Math.min(
            devicePixelRatio,
            2
          )
        );

      }
    );


  } catch (error) {

    /*
      VERY IMPORTANT:
      3D failure must never kill the website.
    */

    console.error(
      "VOXEL 3D initialization failed:",
      error
    );

    const canvas =
      $("#scene");


    if (canvas) {

      canvas.style.display =
        "none";

    }

  }

}


/* =========================================================
   START 3D WITHOUT BLOCKING THE WEBSITE
========================================================= */

initThree();