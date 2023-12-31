import Header from "../Components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        className="flex min-h-screen p-24 items-start justify-center bg-gray-100"
        id="view-layout"
      >
        {children}
      </main>
    </>
  );
}
