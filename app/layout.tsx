import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="shortcut icon" href="/48x48.png" type="image/x-icon" />
        <title>Trens | Blaze API Challenge</title>
      </head>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
