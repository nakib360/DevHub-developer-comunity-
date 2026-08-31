import { Google_Sans } from "next/font/google";
import "../(Main)/globals.css"


const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});


export default function AuthLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${googleSans.className}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
