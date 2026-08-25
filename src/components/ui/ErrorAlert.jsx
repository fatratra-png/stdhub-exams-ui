const ErrorAlert = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
    <p className="text-red-600 text-sm font-medium">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="mt-3 text-sm font-semibold text-navy hover:underline cursor-pointer">
        Réessayer
      </button>
    )}
  </div>
);

export default ErrorAlert;
