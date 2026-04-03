import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  mode?: 'paginated' | 'loadmore' | 'detail';
}

export default function PageLayout({ children, mode = 'paginated' }: PageLayoutProps) {
  const getBackground = () => {
    switch (mode) {
      case 'detail':
        return 'bg-[#FDFCFE] shadow-inner'; // Keep detail page clean
      default:
        return 'bg-background'; // Use the 140 40% 95% mint green
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 py-8 px-4 ${getBackground()}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
}
