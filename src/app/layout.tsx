import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSession } from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neon-Next-Auth0 Example",
  description: "Generated by create next app",
};

async function UserInfoBar() {
  const session = await getSession();
  if (!session) {
    return (
      <div className="bg-gray-100 px-4 py-2">
        <span className="text-gray-800">
          <a href="/api/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </span>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="bg-gray-100 px-4 py-2">
      <span className="text-gray-800">
        Welcome, {user.name}!{" "}
        <a href="/api/auth/logout" className="text-blue-600 hover:underline">
          Logout
        </a>
      </span>
    </div>
  );
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <UserInfoBar />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
