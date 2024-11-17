import "./globals.css";
import { Poppins } from "next/font/google";

const poppins_init = Poppins({
  subsets: ['latin'],
  weight:['100', '400', '700']
})
export const metadata = {
  title: "Yoni Guest House",
  description: "Guest House in Debre Brihan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins_init.className}`}>
        {children}
      </body>
    </html>
  );
}
