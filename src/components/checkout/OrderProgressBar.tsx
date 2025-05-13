import React from "react";
import { FaMapMarkedAlt, FaCalendarDay, FaCreditCard, FaCheckCircle } from "react-icons/fa";

const steps = [
  { title: "انتخاب آدرس", icon: <FaMapMarkedAlt /> },
  { title: "انتخاب تاریخ تحویل", icon: <FaCalendarDay /> },
  { title: "انتخاب روش پرداخت", icon: <FaCreditCard /> },
  { title: "بررسی نهایی سفارش", icon: <FaCheckCircle /> },
];

type OrderProgressBarProps = {
  currentStep: number;
};

const OrderProgressBar: React.FC<OrderProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep - 1;

          const iconBgColor = isCompleted ? "bg-primary-600" : isCurrent ? "bg-yellow-400" : "bg-neutral-300";

          const textColor = isCompleted ? "text-primary-600" : isCurrent ? "text-yellow-400" : "text-neutral-600";

          return (
            <div key={index} className="flex flex-col items-center space-x-2 md:flex-row">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${iconBgColor} text-white`}>{step.icon}</div>
              <span className={`text-xs sm:text-base md:text-lg ${textColor}`}>{step.title}</span>
            </div>
          );
        })}
      </div>

      <div className="h-2.5 w-full rounded-full bg-neutral-200">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default OrderProgressBar;
