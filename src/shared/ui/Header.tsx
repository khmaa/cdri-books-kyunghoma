import { NavLink } from 'react-router';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'text-text-primary font-bold underline underline-offset-4'
    : 'text-text-secondary hover:text-text-primary';

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-20 border-b border-gray bg-white">
      <div className="mx-auto flex h-full max-w-[960px] items-center justify-between px-6">
        <h1 className="text-title3 font-bold tracking-wide">Kakao Book Store</h1>
        <nav className="flex gap-8">
          <NavLink to="/" className={linkClass} end>
            <span className="text-body1 font-medium">도서 검색</span>
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            <span className="text-body1 font-medium">내가 찜한 책</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
