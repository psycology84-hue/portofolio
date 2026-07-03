export default function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Adi Very Firmansyah. Built with Next.js & TailwindCSS.</p>
      </div>
    </footer>
  );
}