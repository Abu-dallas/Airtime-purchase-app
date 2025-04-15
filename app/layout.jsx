import ToastProvider from "@/components/ToastProvider";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Airtime app",
  description: "fund your account with Airtime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
