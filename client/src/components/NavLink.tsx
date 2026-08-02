type NavLinkProps = {
  children: React.ReactNode;
  selected?: boolean;
};

export default function NavLink({ children, selected }: NavLinkProps) {
  return (
    <li
      className="gap-10 text-mist-500 hover:text-mist-700 px-5 hover:bg-mist-100 rounded-sm py-5"
      style={selected ? { textDecorationLine: "underline" } : {}}
    >
      {children}
    </li>
  );
}
