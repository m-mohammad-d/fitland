import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
interface StatCardProps {
  title: string;
  value: string;
  change: number;
  loading?: boolean;
  icon?: React.ElementType;
  description?: string;
}

const StatCard = ({ title, value, change, loading, icon: Icon, description }: StatCardProps) => (
  <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xs font-medium text-gray-500 sm:text-sm">{title}</h3>
      {Icon && <Icon className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />}
    </div>
    {loading ? (
      <div className="mt-2 h-6 animate-pulse rounded bg-gray-200 sm:h-8" />
    ) : (
      <>
        <p className="mt-2 text-lg font-bold sm:text-2xl">{value}</p>
        {description && <p className="mt-1 text-xs text-gray-500 sm:text-sm">{description}</p>}
        <div className="mt-2 flex items-center">
          {change > 0 ? <FaArrowUp className="h-3 w-3 text-green-500 sm:h-4 sm:w-4" /> : <FaArrowDown className="h-3 w-3 text-red-500 sm:h-4 sm:w-4" />}
          <span className={`ml-1 text-xs sm:text-sm ${change > 0 ? "text-green-500" : "text-red-500"}`}>{Math.abs(change).toFixed(1)}%</span>
        </div>
      </>
    )}
  </div>
);

export default StatCard;
