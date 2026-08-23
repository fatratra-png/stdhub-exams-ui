const Navbar = () => {
  return (
    <header className="w-full h-16 bg-white border-b border-contact/40 flex items-center justify-end px-8 shrink-0 select-none">
      <div className="flex items-center gap-4">
        <div className="text-right">
          {/* Student's name */}
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/70 text-white font-bold flex items-center justify-center text-sm shadow-sm">
          {/* Student's avatar */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
