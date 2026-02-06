import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Página não encontrada</p>
        <div className=" mb-6">
          <p className="text-sm text-muted-foreground">A rota que você tentou acessar não existe.</p>
        </div>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          Voltar para Início
        </Link>
      </div>
    </div>
  );
}
