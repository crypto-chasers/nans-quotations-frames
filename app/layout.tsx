import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nan's quotations frame version",
  description: "Robot community #0 member's quotations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
