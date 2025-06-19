import React from 'react';
import { Eye, Edit2, Trash2, UserCircle, Wrench } from 'lucide-react';

const Badge = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const StepCard = ({ step, onView, onEdit, onDelete, onDragStart, onDragEnd, onDragOver }) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-900 text-lg">
          {step.name}
        </h4>
        <div className="flex items-center space-x-2">
          <button
            onClick={onView}
            className="text-gray-500 hover:text-gray-700 p-1"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={onEdit}
            className="text-gray-500 hover:text-gray-700 p-1"
            title="Edit Step"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete Step"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <UserCircle size={14} className="mr-2" />
          <span>{step.persona}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Wrench size={14} className="mr-2" />
          <span>{step.tools}</span>
        </div>
        <div className="flex items-center">
          <Badge className={`px-2 py-1 rounded-full text-xs ${
            step.type === 'Automated' ? 'bg-emerald-100 text-emerald-800' :
            step.type === 'Partially Automated' ? 'bg-amber-100 text-amber-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            {step.type}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default StepCard; 