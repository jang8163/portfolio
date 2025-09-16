// components/Section.tsx
import Container from './Container';

type Padding = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type Background = 'default' | 'muted' | 'secondary';

type Props = {
  id: string;
  title?: string;
  className?: string;
  padding?: Padding;
  background?: Background;
  children: React.ReactNode;
};

const paddingMap: Record<Padding, string> = {
  none: '',
  sm: 'py-10',
  md: 'py-14',
  lg: 'py-20',
  xl: 'py-[calc(var(--spacing-section)*1.4)]',
  '2xl': 'py-[calc(var(--spacing-section)*2)]',
};

const bgMap: Record<Background, string> = {
  default: 'bg-background',
  muted: 'bg-muted',
  secondary: 'bg-secondary',
};

export default function Section({
  id,
  title,
  className = '',
  padding = 'xl',
  background = 'default',
  children,
}: Props) {
  return (
    <section
      id={id}
      aria-label={title ?? id}
      className={`scroll-mt-24 ${bgMap[background]} ${paddingMap[padding]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
