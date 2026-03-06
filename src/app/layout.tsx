import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AzadLink — Free Internet for All",
  description:
    "AzadLink is a non-profit organization fighting internet censorship. Connecting millions in Iran, China, Russia, and beyond to the free internet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
