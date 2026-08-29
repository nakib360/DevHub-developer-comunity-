import { Google_Sans } from "next/font/google";
import "./globals.css";
import Header from "./_Common/Header/page";
import Footer from "./_Common/Footer/page.";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "Dev Hub",
  description: "Dev Hub a developer comunity",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${googleSans.className}`} suppressHydrationWarning>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
