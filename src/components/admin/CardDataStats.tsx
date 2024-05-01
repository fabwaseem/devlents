import { ArrowDown, ArrowUp } from "lucide-react";
import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-lg  bg-gray px-7 py-6 shadow-default  dark:bg-dark">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-300 ">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="font-bold">{total}</h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && "text-green-500"
          } ${levelDown && "text-red-500"} `}
        >
          {rate}

          {levelUp && <ArrowUp size={16} />}
          {levelDown && <ArrowDown size={16} />}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
