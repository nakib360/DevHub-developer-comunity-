"use client";

import { useRef } from "react";
import styles from "./DottedBackground.module.css";

export default function DottedBackground({ children }) {
  const backgroundRef = useRef(null);

  const updateCursorPosition = (event) => {
    const background = backgroundRef.current;

    if (!background) return;

    const bounds = background.getBoundingClientRect();
    background.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    background.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
  };

  const hideCursorEffect = () => {
    const background = backgroundRef.current;

    if (!background) return;

    background.style.setProperty("--cursor-x", "-240px");
    background.style.setProperty("--cursor-y", "-240px");
  };

  return (
    <main
      ref={backgroundRef}
      className={styles.background}
      onPointerMove={updateCursorPosition}
      onPointerLeave={hideCursorEffect}
    >
      {children}
    </main>
  );
}
