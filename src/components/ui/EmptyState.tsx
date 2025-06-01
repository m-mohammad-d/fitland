import React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}


export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {

  return (
    <div className="rounded-xl border border-gray-100 bg-white py-12 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mb-6 text-gray-500">{description}</p>
      {action && (
        <div className="flex items-center justify-center">
        {action}
        </div>
      )}
    </div>
  );
}
