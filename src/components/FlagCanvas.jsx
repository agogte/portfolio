import React, { useEffect, useRef } from "react";

/**
 * The hero's live diagram: users arrive, the evaluation engine resolves each
 * one against the rule chain, and they exit as ON or OFF. Roughly a third
 * land ON, matching the 30% rollout shown on the engine — the point being
 * that the split is deliberate, not random noise.
 *
 * Colours are read from the CSS custom properties so it follows the theme,
 * and the animation collapses to a static frame under prefers-reduced-motion.
 */
const ROLLOUT = 0.3;

const FlagCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let width = 0;
    let height = 0;
    let users = [];
    let tick = 0;
    let seq = 0;

    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const rgb = (name) => `rgb(${cs.getPropertyValue(name).trim()})`;
      return {
        muted: rgb("--sg-muted"),
        line: rgb("--sg-line"),
        accent: rgb("--sg-accent"),
        signal: rgb("--sg-signal"),
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const geometry = () => {
      const midY = height / 2;
      const engineW = Math.min(width * 0.3, 190);
      const engineH = Math.min(height * 0.5, 165);
      return {
        midY,
        userX: width * 0.11,
        engineX: width * 0.5 - engineW / 2,
        engineW,
        engineH,
        outX: width * 0.88,
        onY: height * 0.28,
        offY: height * 0.74,
        nodeW: Math.min(width * 0.13, 62),
        nodeH: Math.min(height * 0.13, 40),
      };
    };

    const draw = () => {
      const p = readPalette();
      const g = geometry();
      const engineTop = g.midY - g.engineH / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '500 10px "IBM Plex Mono", monospace';

      // rails
      ctx.strokeStyle = p.line;
      ctx.beginPath();
      ctx.moveTo(g.userX + g.nodeW / 2, g.midY);
      ctx.lineTo(g.engineX, g.midY);
      ctx.stroke();

      [g.onY, g.offY].forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(g.engineX + g.engineW, g.midY);
        ctx.lineTo(g.outX - g.nodeW / 2, y);
        ctx.stroke();
      });

      // user node
      ctx.strokeStyle = p.line;
      ctx.strokeRect(
        g.userX - g.nodeW / 2,
        g.midY - g.nodeH / 2,
        g.nodeW,
        g.nodeH
      );
      ctx.fillStyle = p.muted;
      ctx.fillText("USER", g.userX, g.midY);

      // evaluation engine with its rule chain
      ctx.strokeStyle = p.accent;
      ctx.strokeRect(g.engineX, engineTop, g.engineW, g.engineH);

      ctx.fillStyle = p.muted;
      ctx.fillText("EVALUATE", g.engineX + g.engineW / 2, engineTop - 14);

      const rules = ["OVERRIDE", "SEGMENT", `ROLLOUT ${ROLLOUT * 100}%`];
      const rowH = g.engineH / rules.length;
      rules.forEach((label, i) => {
        const y = engineTop + rowH * i;
        if (i > 0) {
          ctx.strokeStyle = p.line;
          ctx.beginPath();
          ctx.moveTo(g.engineX, y);
          ctx.lineTo(g.engineX + g.engineW, y);
          ctx.stroke();
        }
        ctx.fillStyle = i === rules.length - 1 ? p.accent : p.muted;
        ctx.font = '500 9.5px "IBM Plex Mono", monospace';
        ctx.fillText(label, g.engineX + g.engineW / 2, y + rowH / 2);
      });
      ctx.font = '500 10px "IBM Plex Mono", monospace';

      // outcome nodes — green means genuinely enabled, not decoration
      ctx.strokeStyle = p.signal;
      ctx.strokeRect(
        g.outX - g.nodeW / 2,
        g.onY - g.nodeH / 2,
        g.nodeW,
        g.nodeH
      );
      ctx.fillStyle = p.signal;
      ctx.fillText("ON", g.outX, g.onY);

      ctx.strokeStyle = p.line;
      ctx.strokeRect(
        g.outX - g.nodeW / 2,
        g.offY - g.nodeH / 2,
        g.nodeW,
        g.nodeH
      );
      ctx.fillStyle = p.muted;
      ctx.fillText("OFF", g.outX, g.offY);

      // users in flight
      users.forEach((u) => {
        ctx.fillStyle = u.stage === 0 ? p.accent : u.on ? p.signal : p.muted;
        ctx.fillRect(u.x - 3, u.y - 3, 6, 6);
      });
    };

    const step = () => {
      const g = geometry();
      tick += 1;

      if (tick % 30 === 0) {
        seq += 1;
        users.push({
          x: g.userX + g.nodeW / 2,
          y: g.midY,
          stage: 0,
          // Deterministic split so the rollout percentage reads true.
          on: seq % Math.round(1 / ROLLOUT) === 0,
        });
      }

      users = users.filter((u) => {
        if (u.stage === 0) {
          u.x += Math.max(width * 0.003, 1.3);
          if (u.x >= g.engineX + g.engineW) {
            u.stage = 1;
            u.sx = u.x;
            u.sy = u.y;
            u.progress = 0;
          }
          return true;
        }
        u.progress += 0.017;
        const tx = g.outX - g.nodeW / 2;
        const ty = u.on ? g.onY : g.offY;
        u.x = u.sx + (tx - u.sx) * u.progress;
        u.y = u.sy + (ty - u.sy) * u.progress;
        return u.progress < 1;
      });

      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      resize();
      if (reduceMotion) {
        const g = geometry();
        // Static frame: a few users resting on the inbound rail.
        users = [0, 1, 2].map((i) => ({
          x: g.userX + g.nodeW / 2 + 26 + i * 22,
          y: g.midY,
          stage: 0,
        }));
        draw();
        return;
      }
      raf = requestAnimationFrame(step);
    };

    start();

    const onResize = () => {
      resize();
      if (reduceMotion) draw();
    };
    window.addEventListener("resize", onResize);

    // Repaint on theme change so the diagram picks up the new palette.
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative border border-line">
      <canvas
        ref={canvasRef}
        className="block aspect-[4/3] w-full"
        role="img"
        aria-label="Diagram: users evaluated against override, segment and percentage-rollout rules, exiting as on or off"
      />
      <a
        href="https://github.com/agogte/feature-flag-service"
        target="_blank"
        rel="noopener noreferrer"
        className="sg-eyebrow absolute bottom-3 left-4 transition-colors hover:text-accent"
      >
        feature flag service · go →
      </a>
    </div>
  );
};

export default FlagCanvas;
