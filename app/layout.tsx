export const metadata = {
  title: 'KUEPER Knowledge Graph',
  description: 'Operational portal for the KUEPER Knowledge Graph'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
