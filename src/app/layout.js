import "./globals.css";


export const metadata = {
  title: "ECOSORT",
  description: "GAME FOR KIDS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
