const Placeholder = ({ title, description }) => (
  <section className="animate-fade-in">
    <h1 className="text-2xl text-navy mb-2">{title}</h1>
    {description && (
      <p className="text-sm text-navy-dark/60 max-w-md">{description}</p>
    )}
  </section>
);

export default Placeholder;
