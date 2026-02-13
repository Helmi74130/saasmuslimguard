import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestion des vidéos - Muslim Guard',
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
