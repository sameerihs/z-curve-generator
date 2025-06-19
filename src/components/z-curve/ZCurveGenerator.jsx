import React, { useState, useRef } from 'react';
import { Download, Plus, Upload } from 'lucide-react';
import ZCurve from './ZCurve';
import StepCard from './StepCard';
import StepFormModal from './StepFormModal';
import ViewModal from './ViewModal';

const ZCurveGenerator = () => {
  const [steps, setSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', or 'add'
  const fileInputRef = useRef(null);
  const [draggedStep, setDraggedStep] = useState(null);

  const handleAddStep = () => {
    setSelectedStep(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleViewStep = (index) => {
    setSelectedStep(steps[index]);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditStep = (index) => {
    setSelectedStep(steps[index]);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSaveStep = (stepData) => {
    if (modalMode === 'add') {
      const newStep = { ...stepData, id: steps.length + 1 };
      setSteps([...steps, newStep]);
    } else if (modalMode === 'edit' && selectedStep) {
      const updatedSteps = steps.map(step => 
        step.id === selectedStep.id ? { ...stepData, id: step.id } : step
      );
      setSteps(updatedSteps);
    }
    setIsModalOpen(false);
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    const reindexedSteps = updatedSteps.map((step, i) => ({ ...step, id: i + 1 }));
    setSteps(reindexedSteps);
  };

  const handleDragStart = (e, index) => {
    setDraggedStep(index);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
    setDraggedStep(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedStep === null || draggedStep === index) return;

    const newSteps = [...steps];
    const draggedItem = newSteps[draggedStep];
    newSteps.splice(draggedStep, 1);
    newSteps.splice(index, 0, draggedItem);
    
    const reindexedSteps = newSteps.map((step, i) => ({ ...step, id: i + 1 }));
    setSteps(reindexedSteps);
    setDraggedStep(index);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.steps && Array.isArray(data.steps)) {
            setSteps(data.steps);
          }
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const downloadFile = (format) => {
    const svgElement = document.querySelector('.z-curve-container svg');
    if (!svgElement) return;

    const bbox = svgElement.getBBox();
    const width = bbox.width;
    const height = bbox.height;

    if (format === 'svg') {
      const clonedSvg = svgElement.cloneNode(true);
      clonedSvg.setAttribute('width', width);
      clonedSvg.setAttribute('height', height);
      
      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'z-curve.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === 'png') {
      const clonedSvg = svgElement.cloneNode(true);
      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width * 2;
          canvas.height = height * 2;
          
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.scale(2, 2);
          ctx.drawImage(img, 0, 0);

          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'z-curve.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        img.src = e.target.result;
      };
      
      reader.readAsDataURL(svgBlob);
    } else if (format === 'json') {
      const data = {
        steps: steps,
        metadata: {
          createdAt: new Date().toISOString(),
          version: '1.0'
        }
      };
      
      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(jsonBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'z-curve-data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Z-Curve Generator</h1>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Upload size={16} className="mr-2" />
              Upload JSON
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Side - Process Steps */}
        <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Process Steps</h2>
            <button
              onClick={handleAddStep}
              className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              <Plus size={16} className="mr-2" />
              Add Step
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                onView={() => handleViewStep(index)}
                onEdit={() => handleEditStep(index)}
                onDelete={() => handleDeleteStep(index)}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, index)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Z-Curve */}
        <div className="w-1/2 p-6 flex flex-col">
          <div className="flex-grow bg-white border border-gray-200 rounded-lg p-6 z-curve-container">
            <div className="h-full">
              <ZCurve processes={steps} />
            </div>
          </div>
          
          {/* Download Options */}
          <div className="mt-4 flex justify-end">
            <div className="relative">
              <select 
                onChange={(e) => {
                  if (e.target.value) {
                    downloadFile(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="appearance-none bg-black text-white px-4 py-2 rounded-md pr-8 cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>Download</option>
                <option value="png">PNG</option>
                <option value="svg">SVG</option>
                <option value="json">JSON</option>
              </select>
              <Download size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        modalMode === 'view' ? (
          <ViewModal
            step={selectedStep}
            onClose={() => setIsModalOpen(false)}
          />
        ) : (
          <StepFormModal
            step={modalMode === 'edit' ? selectedStep : null}
            onSave={handleSaveStep}
            onClose={() => setIsModalOpen(false)}
            isNew={modalMode === 'add'}
          />
        )
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default ZCurveGenerator; 