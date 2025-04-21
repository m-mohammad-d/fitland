import React from "react";
import {
  FaMapMarkedAlt,
  FaShippingFast,
  FaCalendarDay,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

// مراحل پراسس بار
const steps = [
  { title: "انتخاب آدرس", icon: <FaMapMarkedAlt /> },
  { title: "انتخاب روش ارسال", icon: <FaShippingFast /> },
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
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep - 1;

          const iconBgColor = isCompleted
            ? "bg-primary-600"
            : isCurrent
            ? "bg-yellow-400"
            : "bg-neutral-300";

          const textColor = isCompleted
            ? "text-primary-600"
            : isCurrent
            ? "text-yellow-400"
            : "text-neutral-600";

          return (
            <div key={index} className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBgColor} text-white`}
              >
                {step.icon}
              </div>
              <span className={`text-lg ${textColor}`}>{step.title}</span>
            </div>
          );
        })}
      </div>

      <div className="w-full bg-neutral-200 rounded-full h-2.5">
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
