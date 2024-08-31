import HeaderComponent from "../../components/common/header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <HeaderComponent />
      </header>
      <main>{children}</main>
    </>
  );
}
