const LoadingSpinner = ({ message = "Chargement..." }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-3">
    <div className="w-8 h-8 border-[3px] border-contact border-t-navy rounded-full animate-spin" />
    <p className="text-sm text-navy-dark/50">{message}</p>
  </div>
);

export default LoadingSpinner;
