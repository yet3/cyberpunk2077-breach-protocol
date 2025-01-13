interface IProps {
  className?: string;
}

export const PortfolioIcon = ({ className }: IProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      viewBox="0 0 16 16"
    >
      <title>Portfolio icon</title>
      <path d="M14 5h-3V3a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1M6 3h4v2H6zM2 13V6h12v7z" />
    </svg>
  );
};
