"use client";

import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

interface Props {
  updateCheck: (index: number) => void;
  index: number;
  name: string;
  date: string;
  check: boolean;
}

export const Reto = ({ updateCheck, index, name, date, check }: Props) => {

  const [explode, setExplode] = useState(false);

  const explodeConffeti = () => {
    setExplode(true);
    setTimeout(() => {
      setExplode(false);
    }, 1000);
  }

  return (
    <article className={`${check ? "bg-emerald-500/10 hover:bg-emerald-500/20" : "bg-transparent hover:bg-zinc-950"} flex justify-between items-center gap-4 w-full border border-zinc-800 rounded-lg p-4 select-none`}>
      <div>
        <p className="text-zinc-500 text-sm">{date}</p>
        <p className="text-zinc-300 font-medium">{name}</p>
      </div>
      <div className="w-10 h-10 border border-zinc-800 rounded-lg flex justify-center items-center">
        {
          explode && <ConfettiExplosion />
        }
        <input
          type="checkbox"
          className="relative disabled:before:absolute disabled:before:w-full disabled:before:h-full disabled:before:bg-emerald-400 disabled:before:rounded-sm disabled:before:mix-blend-multiply"
          checked={check}
          onChange={() => updateCheck(index)}
          disabled={check}
          onClick={explodeConffeti}
        />
      </div>
    </article>
  )
}
