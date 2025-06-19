import React from 'react';
import { X } from 'lucide-react';

const ViewModal = ({ step, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {step.name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Description</h4>
              <p className="mt-1 text-gray-600">{step.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Type</h4>
                <p className="mt-1 text-gray-600">{step.type}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">ESSA Type</h4>
                <p className="mt-1 text-gray-600">{step.essaType}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Persona</h4>
                <p className="mt-1 text-gray-600">{step.persona}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Tools</h4>
                <p className="mt-1 text-gray-600">{step.tools}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Input</h4>
              <p className="mt-1 text-gray-600">{step.input}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal; 