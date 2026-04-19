import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-6 py-12 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-7">
          <div className="inline-flex rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
            Tailwind CSS is running
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-zinc-950 sm:text-5xl">
              Build your React app with utility-first styling.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600">
              This screen is styled with Tailwind classes from your JSX, so the
              generated CSS now has real utilities to apply.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </button>
            <a
              className="rounded-md border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-cyan-500 hover:text-cyan-700"
              href="https://tailwindcss.com/docs"
              target="_blank"
            >
              Tailwind docs
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
          <div className="relative mx-auto h-56 w-56">
            <img
              src={heroImg}
              className="absolute inset-0 m-auto h-52 w-52 object-contain"
              width="170"
              height="179"
              alt=""
            />
            <img
              src={reactLogo}
              className="absolute left-8 top-8 h-14 w-14 animate-spin"
              alt="React logo"
            />
            <img
              src={viteLogo}
              className="absolute bottom-8 right-8 h-14 w-14 drop-shadow-lg"
              alt="Vite logo"
            />
          </div>

          <div className="mt-6 grid gap-3 text-sm text-zinc-700">
            <p className="rounded-md bg-white p-3 ring-1 ring-zinc-200">
              Edit <code className="font-semibold text-zinc-950">src/App.jsx</code>
              {' '}and Tailwind will rebuild during development.
            </p>
            <p className="rounded-md bg-cyan-50 p-3 text-cyan-900 ring-1 ring-cyan-200">
              Utilities like spacing, colors, borders, and typography are now
              visible on this page.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
