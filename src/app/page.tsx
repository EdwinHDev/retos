"use client";

import { Reto } from "@/components/Reto";
import { FormEvent, useEffect, useRef, useState } from "react";

interface IReto {
  name: string;
  date: string;
  check: boolean;
}

interface IError {
  state: boolean;
  message: string;
}

const INITIAL_ERROR: IError = {
  state: false,
  message: ""
}

export default function Home() {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [retos, setRetos] = useState<IReto[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(INITIAL_ERROR);

  useEffect(() => {

    const getRetos = JSON.parse(localStorage.getItem("retos")!);

    if (!getRetos) {
      localStorage.setItem("retos", JSON.stringify([]));
    }
    setRetos(getRetos);

  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validando campo
    if (name === "") {
      focusInput();
      setError({
        state: true,
        message: "El nombre es obligatorio"
      });

      setTimeout(() => {
        setError(INITIAL_ERROR);
      }, 3000);
      return;
    }


    const hoy = new Date();
    const ahora = hoy.toLocaleString("en-US");

    const nuevoReto: IReto = {
      name: name,
      date: ahora,
      check: false
    }

    const newArray = [...retos];
    if(newArray.length > 9) {
      newArray.pop();
    }

    localStorage.setItem("retos", JSON.stringify([nuevoReto, ...newArray]));
    setRetos([nuevoReto, ...newArray]);
    setName("");
  }

  const updateCheck = (index: number) => {
    const updateCheckBox = retos.map((reto, i) => {
      if (i === index) {
        return { ...reto, check: !reto.check };
      }
      return reto;
    });

    setRetos(updateCheckBox);
    localStorage.setItem("retos", JSON.stringify(updateCheckBox));
  };

  const focusInput = () => {
    inputRef.current?.focus();
  }

  return (
    <main className="flex min-h-screen h-full">

      <div className="container mx-auto px-4">
        <section className="flex flex-col justify-center items-center h-full">
          <h1 className="text-center text-zinc-200 text-4xl font-semibold mb-10">Retos diarios</h1>
          <div className="flex flex-col lg:flex-row justify-center w-full gap-6">
            <section className="lg:max-w-md w-full h-max border border-zinc-800 py-6 px-4 lg:px-10 rounded-xl">
              <h2 className="text-zinc-200 text-2xl mb-4">Crear reto</h2>
              <form onSubmit={handleSubmit}>
                <article className="mb-10">
                  <label
                    htmlFor="name"
                    className={`block mb-2 ${error.state ? "text-red-400" : "text-zinc-400"} after:content-['*'] after:ml-0.5 after:text-red-400`}
                  >Nombre del reto</label>
                  <input
                    ref={inputRef}
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Crear carrusel de imagenes"
                    className={`w-full px-4 py-2 rounded-lg bg-zinc-800 outline outline-2 outline-offset-0 outline-transparent ${error.state ? "focus:outline-red-400" : "focus:outline-zinc-500"}`}
                  />
                <div className={`${error.state ? "opacity-100 h-4 mt-2" : "opacity-0 h-0 mt-0"} text-sm text-red-400 transition-all duration-100 overflow-hidden`}>
                  El nombre del reto es obligatorio
                </div>
                </article>
                <button
                  className="px-4 py-3 w-full uppercase font-medium bg-emerald-500 hover:bg-emerald-400/90 rounded-lg"
                  type="submit"
                >
                  Crear reto
                </button>
              </form>
            </section>
            <section className="flex flex-col gap-2 lg:max-w-lg w-full h-max border border-zinc-800 py-6 px-4 lg:px-10 rounded-xl">
              {
                retos && retos.length > 0 ? (
                  retos.map((reto, index) => (
                    <Reto
                      key={index}
                      index={index}
                      updateCheck={() => updateCheck(index)}
                      name={reto.name}
                      date={reto.date}
                      check={reto.check}
                    />
                  ))
                ) : (
                  <p className="text-zinc-300">No hay retos creados</p>
                )
              }
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
