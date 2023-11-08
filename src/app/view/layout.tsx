import Header from "../Components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen p-24 items-center justify-center bg-gray-100">
        {children}
      </main>
    </>
  );
}
