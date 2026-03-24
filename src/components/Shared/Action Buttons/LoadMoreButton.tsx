interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
  className?: string;
  label?: string;
  loadingLabel?: string;
}

const LoadMoreButton = ({
  onClick,
  isLoading,
  className = "w-full rounded-lg bg-blue-500 px-3 py-3 text-center text-white transition-colors duration-300 hover:bg-blue-600",
  label = "Load More",
  loadingLabel = "Loading...",
}: LoadMoreButtonProps) => {
  return (
    <button onClick={onClick} disabled={isLoading} className={className}>
      {isLoading ? loadingLabel : label}
    </button>
  );
};

export default LoadMoreButton;
