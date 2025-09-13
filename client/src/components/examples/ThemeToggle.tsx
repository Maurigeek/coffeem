import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="p-8 bg-background">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Basculer entre mode clair/sombre</h3>
        <ThemeToggle />
      </div>
    </div>
  );
}