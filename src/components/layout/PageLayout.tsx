import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  mode?: 'paginated' | 'loadmore' | 'detail';
}

export default function PageLayout({ children, mode = 'paginated' }: PageLayoutProps) {
  const getBackground = () => {
    switch (mode) {
      case 'loadmore':
        return 'bg-[#E8F5E9]'; // Strong mint green
      case 'paginated':
        return 'bg-[#F8FBFF]'; // Light lavender/blue
      case 'detail':
        return 'bg-[#FDFCFE]'; // Clean detail page bg
      default:
        return 'bg-background';
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
