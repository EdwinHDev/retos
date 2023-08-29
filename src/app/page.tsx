"use client";

import { FormEvent, useEffect, useState } from "react";

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

  const [retos, setRetos] = useState<IReto[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(INITIAL_ERROR);

  console.log(retos)

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
    const ahora = hoy.toLocaleString();

    const nuevoReto: IReto = {
      name: name,
      date: ahora,
      check: false
    }

    localStorage.setItem("retos", JSON.stringify([...retos, nuevoReto]));
    setRetos([...retos, nuevoReto]);
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

  return (
    <main className="flex min-h-screen h-full">

      <div className="container mx-auto px-4">
        <section className="flex flex-col justify-center items-center h-full">
          <h1 className="text-center text-zinc-200 text-4xl font-semibold mb-10">Retos diarios</h1>
          <div className="flex justify-center w-full gap-6">
            <section className="max-w-md w-full h-max border border-zinc-800 py-6 px-4 lg:px-10 rounded-xl">
              <h2 className="text-zinc-200 text-2xl mb-4">Crear reto</h2>
              <form onSubmit={handleSubmit}>
                <article className="mb-10">
                  <label
                    htmlFor="name"
                    className="block text-zinc-400 mb-2"
                  >Nombre</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Crear carrusel de imagenes"
                    className="w-full px-4 py-2 rounded-lg bg-zinc-800"
                  />
                </article>
                <button
                  className="px-4 py-3 w-full uppercase font-medium bg-emerald-500 hover:bg-emerald-400/90 rounded-lg"
                  type="submit"
                >
                  Crear reto
                </button>
              </form>
            </section>
            <section className="flex flex-col gap-2 max-w-lg w-full h-max border border-zinc-800 py-6 px-4 lg:px-10 rounded-xl">
              {
                retos.length > 0 ? (
                  retos.map((reto, index) => (
                    <article key={index} className="flex justify-between items-center gap-4 w-full border border-zinc-800 rounded-lg p-4 hover:bg-zinc-950 select-none">
                      <div>
                        <p className="text-zinc-500 text-sm">{reto.date}</p>
                        <p className="text-zinc-300 font-medium">{reto.name}</p>
                      </div>
                      <div className="w-10 h-10 border border-zinc-800 rounded-lg flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="accent-emerald-500"
                          checked={reto.check}
                          onChange={() => updateCheck(index)}
                        />
                      </div>
                    </article>
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
