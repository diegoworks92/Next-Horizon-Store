import { Sulphur_Point } from "next/font/google";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import ClientCursorWrapper from "../components/CustomCursor/ClientCursorWrapper";
import "../sass/globals.sass";

const sulphur_point = Sulphur_Point({
  weight: ["400"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sulphur_point.className}>
        <div className="app-layout">
          <Header />
          <ClientCursorWrapper />
          <main className="app-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
