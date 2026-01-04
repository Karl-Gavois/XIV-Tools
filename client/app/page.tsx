import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0f1526] to-[#0b0f1a] text-gray-100">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold tracking-wide text-yellow-400">
            XIV Tools
          </h1>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-gray-300 hover:text-white">
              Outils
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              À propos
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              Connexion
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-4 text-4xl font-bold">Outils pratiques pour FFXIV</h2>
        <p className="mb-8 max-w-2xl text-gray-300">
          Simplifiez vos soirées cartes aux trésors et la gestion de votre
          compagnie libre grâce à des outils clairs, rapides et partageables.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/loot-tables/create"
            className="rounded-md bg-gradient-to-r from-yellow-500 to-amber-600 px-6 py-3 font-medium text-black shadow-lg hover:brightness-110"
          >
            Créer un tableau de loot
          </Link>
          <Link
            href="#tools"
            className="rounded-md border border-white/20 px-6 py-3 hover:bg-white/10"
          >
            Voir les outils
          </Link>
        </div>
      </section>

      {/* Tools grid */}
      <section id="tools" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Loot tables */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <h3 className="text-lg font-semibold">Tableaux de loot</h3>
            </div>
            <p className="mb-6 text-sm text-gray-300">
              Créez et partagez des tableaux de répartition des gains pour vos
              soirées cartes aux trésors.
            </p>
            <Link
              href="/loot-tables"
              className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:underline"
            >
              Créer un tableau →
            </Link>
          </div>

          {/* Planner */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl opacity-70">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <h3 className="text-lg font-semibold">Planner (à venir)</h3>
            </div>
            <p className="mb-6 text-sm text-gray-300">
              Organisez les événements de votre CL avec un calendrier simple et
              partagé.
            </p>
            <span className="text-sm italic text-gray-400">
              Bientôt disponible
            </span>
          </div>

          {/* Calculator */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl opacity-70">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🧮</span>
              <h3 className="text-lg font-semibold">Calculateur de gils</h3>
            </div>
            <p className="mb-6 text-sm text-gray-300">
              Calculs automatiques et répartitions rapides des gains.
            </p>
            <span className="text-sm italic text-gray-400">
              Bientôt disponible
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between gap-4">
          <div>© 2024 XIV Tools</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">
              À propos
            </Link>
            <Link href="#" className="hover:text-white">
              Conditions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
