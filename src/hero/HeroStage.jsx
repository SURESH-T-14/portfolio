import React, { useEffect, useRef } from 'react';
import { buildWord, computeLayout, fontsReady, makeNoise } from './word';

export default function HeroStage({ wordText, imageSrc, active }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const wordRef = useRef(null);
  const noiseRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      imageRef.current = image;
    };
    image.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    let raf = 0;
    let running = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const fill = document.createElement('canvas').getContext('2d');

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const startTime = performance.now();

    const rebuildWord = () => {
      const layout = computeLayout(window.innerWidth, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const fillWidth = Math.max(2, Math.round(layout.word.w * dpr));
      const fillHeight = Math.max(2, Math.round(layout.word.h * dpr));
      fill.canvas.width = fillWidth;
      fill.canvas.height = fillHeight;
      wordRef.current = {
        layout,
        atlas: buildWord(wordText, Math.round(layout.word.capH * dpr))
      };
    };

    const paintLetters = () => {
      const { atlas } = wordRef.current;
      const width = fill.canvas.width;
      const height = fill.canvas.height;
      fill.clearRect(0, 0, width, height);

      const metal = fill.createLinearGradient(0, 0, 0, height);
      metal.addColorStop(0, '#ff4a42');
      metal.addColorStop(0.18, '#d71922');
      metal.addColorStop(0.48, '#ff2930');
      metal.addColorStop(0.72, '#a90d18');
      metal.addColorStop(1, '#f02a2b');
      fill.fillStyle = metal;
      fill.fillRect(0, 0, width, height);

      if (noiseRef.current) {
        fill.globalAlpha = 0.42;
        fill.drawImage(noiseRef.current, 0, 0, width, height);
        fill.globalAlpha = 1;
      }

      fill.globalCompositeOperation = 'source-atop';
      const fire = fill.createRadialGradient(width * 0.5, height * 1.08, 0, width * 0.5, height * 0.7, width * 0.72);
      fire.addColorStop(0, 'rgba(255, 164, 72, .72)');
      fire.addColorStop(0.2, 'rgba(255, 54, 30, .36)');
      fire.addColorStop(0.58, 'rgba(110, 0, 10, .12)');
      fire.addColorStop(1, 'rgba(0, 0, 0, 0)');
      fill.fillStyle = fire;
      fill.fillRect(0, 0, width, height);

      fill.globalCompositeOperation = 'destination-in';
      fill.drawImage(atlas.canvas, 0, 0, width, height);
      fill.globalCompositeOperation = 'source-over';
    };

    const draw = () => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      if (!active || !wordRef.current) return;

      const { layout } = wordRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      const floor = ctx.createRadialGradient(width * 0.5, height * 1.04, 16, width * 0.5, height, width * 0.78);
      floor.addColorStop(0, 'rgba(210, 22, 22, .62)');
      floor.addColorStop(0.38, 'rgba(90, 8, 8, .28)');
      floor.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = floor;
      ctx.fillRect(0, height * 0.52, width, height * 0.48);

      paintLetters();
      const { x, y, w, h } = layout.word;
      ctx.save();
      ctx.shadowColor = 'rgba(255, 25, 25, .42)';
      ctx.shadowBlur = 30;
      ctx.drawImage(fill.canvas, x, y, w, h);
      ctx.restore();
      ctx.drawImage(fill.canvas, x, y, w, h);

      const image = imageRef.current;
      if (image?.naturalWidth) {
        const boxHeight = layout.hero.h;
        const boxWidth = boxHeight * 0.58;
        const scale = Math.min(boxWidth / image.naturalWidth, boxHeight / image.naturalHeight);
        const imageWidth = image.naturalWidth * scale;
        const imageHeight = image.naturalHeight * scale;
        const finalX = layout.hero.cx - imageWidth / 2;
        const finalY = layout.hero.feet - imageHeight;

        const walkProgress = active ? Math.min((performance.now() - startTime) / 1900, 1) : 1;
        const easedWalk = 1 - Math.pow(1 - walkProgress, 3);
        const fromLeft = -imageWidth - 24;
        const imageX = fromLeft + (finalX - fromLeft) * easedWalk;
        const bobOffset = Math.sin(walkProgress * Math.PI * 8) * 6 * (1 - walkProgress * 0.6);
        const imageY = finalY + bobOffset;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.36)';
        ctx.beginPath();
        ctx.ellipse(finalX + imageWidth / 2, finalY + imageHeight + 20, imageWidth * 0.38, imageHeight * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
      }

      const vignette = ctx.createRadialGradient(width * 0.5, height * 0.52, width * 0.12, width * 0.5, height * 0.5, width * 0.82);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, .58)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const start = async () => {
      await fontsReady();
      noiseRef.current = makeNoise();
      fit();
      rebuildWord();
      draw();
    };

    const onResize = () => {
      fit();
      rebuildWord();
    };

    start();
    window.addEventListener('resize', onResize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [wordText, active]);

  return <canvas id="stage" ref={canvasRef} aria-hidden="true" />;
}
