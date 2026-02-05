"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const Particle = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      //   loadStarsPreset(engine);

      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: "#000",
      },
      particles: {
        groups: {
          group1: {
            number: {
              value: 120,
              limit: {
                value: 400,
              },
              density: {
                enable: true,
                height: 800,
                width: 800,
              },
            },
            shape: {
              type: "circle",
            },
            move: {
              direction: MoveDirection.bottomLeft, // First group moves to the right
              straight: true,
              speed: {
                min: 1,
                max: 2,
              },
              enable: true,
              outModes: {
                default: OutMode.out,
              },
              random: true,
            },
            opacity: {
              animation: {
                enable: true,
                speed: 1.2,
                sync: false,
              },
              value: { min: 0, max: 1 },
            },
            size: {
              value: { min: 1, max: 10 },
              animation: {
                enable: true,
                speed: {
                    min: 1,
                    max: 20,
                },
                minimumValue: 1,
                maximumValue: 5,
                sync: false,
                startValue: "random",
                destroy: "none",
              },
            },
          },
          group2: {
            number: {
              value: 100,
              limit: {
                value: 400,
              },
              density: {
                enable: true,
                height: 800,
                width: 800,
              },
            },
            shape: {
              type: "circle",
            },
            move: {
              direction: MoveDirection.topRight, // Second group doesn't move
              straight: true,
              speed: {
                min: 0.3,
                max: 2,
              },
              enable: true,
              outModes: {
                default: OutMode.out,
              },
              random: true,
            },
            opacity: {
              animation: {
                enable: true,
                speed: 1.2,
                sync: false,
              },
              value: { min: 0, max: 1 },
            },
            size: {
              value: { min: 1, max: 3 },
              animation: {
                enable: true,
                speed: 8,
                minimumValue: 1,
                maximumValue: 5,
                sync: false,
                startValue: "random",
                destroy: "none",
              },
            },
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default Particle;
