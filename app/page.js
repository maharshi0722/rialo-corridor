"use client";
import React, { useEffect, useRef } from "react";

export default function CorridorGallery() {
  const corridorRef = useRef(null);

  useEffect(() => {
    let z = -120;
    const speed = window.innerWidth < 700 ? 0.65 : 1.05; // faster
    const animate = () => {
      z += speed;
      if (corridorRef.current) {
        corridorRef.current.style.transform =
          `translate(-50%,-50%) translateZ(${z}px)`;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const helpers = [
    { id:"00", name:"RialORCA", img:"/images/00.png"},
    { id:"0",  name:"EricArgent", img:"/images/0.png"},
    { id:"01", name:"AQCCapital", img:"/images/1.png"},
    { id:"02", name:"Ali LY", img:"/images/2.png"},
    { id:"03", name:"DR1MMER", img:"/images/3.png"},
    { id:"04", name:"Flippedface", img:"/images/4.png"},
    { id:"05", name:"Gatoverde", img:"/images/5.png"},
    { id:"06", name:"Ishu", img:"/images/6.png"},
    { id:"07", name:"JEAMS", img:"/images/7.png"},
    { id:"08", name:"K.Gufran", img:"/images/8.png"},
    { id:"09", name:"Keep", img:"/images/9.png"},
    { id:"10", name:"KingJ", img:"/images/10.png"},
    { id:"11", name:"Koushik Núr", img:"/images/11.png"},
    { id:"12", name:"LongLife", img:"/images/12.png"},
    { id:"13", name:"Luka", img:"/images/13.png"},
    { id:"14", name:"MS DHONI", img:"/images/14.png"},
    { id:"15", name:"l0oble", img:"/images/15.png"},
    { id:"16", name:"Richard12", img:"/images/16.png"},
    { id:"17", name:"Rollins", img:"/images/17.png"},
    { id:"18", name:"Süleyman", img:"/images/18.png"},
    { id:"19", name:"VibeVortex", img:"/images/19.png"},
    { id:"20", name:"Yozi柚子", img:"/images/20.png"},
    { id:"21", name:"alextine", img:"/images/21.png"},
    { id:"22", name:"silverwave", img:"/images/22.png"},
    { id:"23", name:"DORA", img:"/images/23.png"}
  ];

  const half = Math.ceil(helpers.length / 2);
  const left = helpers.slice(0, half);
  const right = helpers.slice(half);

  return (
    <>
      <style>{`
        :root { color-scheme: dark; }
        body { margin: 0; overflow: hidden; background: #141326; font-family: sans-serif; }

        .scene {
          position: fixed;
          inset: 0;
          perspective: 1700px;
          background: radial-gradient(circle at 50% 18%, #3f3b6c 0%, #141326 55%, #090912 100%);
        }

        .corridor {
          position: absolute;
          top: 50vh;
          left: 50%;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%);
        }

        .wall {
          position: absolute;
          top: -38vh;
          height: 185vh;
          width: 44vw;
          transform-style: preserve-3d;
        }
        .leftWall { left: -44vw; }
        .rightWall { right: -44vw; }

        .frame {
          position: absolute;
          top: -4px;
          width: clamp(150px, 20vw, 260px);
          height: clamp(228px, 29vw, 368px);
        }
        .frame img {
          width: 100%; height: 100%; object-fit: cover;
          border: 8px solid #0e0e14;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 12px 42px rgba(0,0,0,0.9);
        }
        .frame.left  { left: clamp(16px, 4.2vw, 88px);  transform-origin: left; }
        .frame.right { right: clamp(16px, 4.2vw, 88px); transform-origin: right; }
        .nameTag {
          text-align: center;
          color: #f7f7f7;
          font-size: 13px;
          margin-top: 8px;
          letter-spacing: 0.01em;
          opacity: 0.95;
        }

        .carpet {
          position: absolute;
          bottom: -520vh;
          left: 50%;
          transform: translateX(-50%) rotateX(83.6deg);
          width: clamp(240px, 30vw, 420px);
          height: 820vh;
          background:
            radial-gradient(ellipse at 50% 18%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 28%),
            linear-gradient(#c40000, #ff2b2b);
          background-size: 140% 22%, auto;
          background-repeat: no-repeat;
          background-position: center top;
          border-left: 10px solid #ffd000;
          border-right: 10px solid #ffd000;
        }

        /* Portal removed */

        .logo {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(80px, 16vw, 140px);
          z-index: 25;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .scene { perspective: 1150px; }
          .corridor { top: 64vh; }
          .wall { width: 118vw; top: -6vh; }   /* raise walls */
          .leftWall { left: -114vw; }
          .rightWall { right: -114vw; }

          .frame {
            width: clamp(160px, 70vw, 230px);   /* bigger images mobile */
            height: clamp(240px, 82vw, 340px);
            top: 12px;                          /* move images up */
          }
          .frame.left  { left: clamp(12px, 14vw, 38px); transform: translateZ(var(--z)) rotateY(16deg); }
          .frame.right { right: clamp(12px, 14vw, 38px); transform: translateZ(var(--z)) rotateY(-16deg); }

          .carpet {
            width: clamp(200px, 78vw, 360px);
            height: 900vh;
            bottom: -640vh;
            transform: translateX(-50%) rotateX(82.7deg); /* a hair flatter */
            border-left: 8px solid #ffd000;
            border-right: 8px solid #ffd000;
          }

          .logo { width: clamp(72px, 20vw, 110px); top: 48%; }
        }
      `}</style>

      <div className="scene">
        <img className="logo" src="/images/logo2.svg" alt="Logo" />

        <div ref={corridorRef} className="corridor">
          <div className="carpet" />
          <div className="wall leftWall">
            {left.map((p, i) => (
              <div
                key={p.id}
                className="frame left"
                style={{
                  "--z": `${i * -420}px`,
                  transform: `translateZ(${i * -420}px) rotateY(54deg)`
                }}
              >
                <img src={p.img} alt={p.name} />
                <div className="nameTag">{p.name}</div>
              </div>
            ))}
          </div>
          <div className="wall rightWall">
            {right.map((p, i) => (
              <div
                key={p.id}
                className="frame right"
                style={{
                  "--z": `${i * -420}px`,
                  transform: `translateZ(${i * -420}px) rotateY(-54deg)`
                }}
              >
                <img src={p.img} alt={p.name} />
                <div className="nameTag">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}