import HeaderComponent from "../components/common/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <HeaderComponent />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
