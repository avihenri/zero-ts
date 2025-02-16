
import clsx from "clsx";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  type: "app" | "system";
  to?: string;
  onClick?: () => void;
  icon?: ReactNode;
  iconClassName?: string;
  children: ReactNode;
}

export function MenuItem({
  type,
  to,
  onClick,
  children,
  icon,
  iconClassName,
}: MenuItemProps) {
  const className = clsx(
    "p-2 font-semibold rounded-xl my-1 cursor-pointer flex items-center w-full bg-grey-900 hover:scale-[1.02]",
    type === "app"
      ? "text-primary-400 hover:text-primary-300"
      : "text-action-400 hover:text-action-300"
  );

  if (to) {
    return (
      <Link
        to={to}
        className={className}
        data-testid="menu-item"
      >
        {icon && <span className={`${iconClassName} flex items-center`}>{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      data-testid="menu-item"
    >
      {icon && <span className={`${iconClassName} flex items-center`}>{icon}</span>}
      {children}
    </button>
  );
}
