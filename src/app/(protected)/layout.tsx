//src/app/(protected)/layou.tsx
import LayoutWrapper from '@/app/components/layout/LayoutWrapper';

export default function WithLayout({ children }: { children: React.ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
