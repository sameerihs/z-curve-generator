// import React, { useState, useRef } from 'react';
// import { Download, Plus, Upload } from 'lucide-react';
// import { StepCard, StepFormModal, ViewModal } from './StepComponents';

// // Helper function to wrap text
// function wrapText(text, maxWords = 3) {
//   const words = text.split(' ');
//   if (words.length <= maxWords) return text;
  
//   const lines = [];
//   for (let i = 0; i < words.length; i += maxWords) {
//     lines.push(words.slice(i, i + maxWords).join(' '));
//   }
//   return lines;
// }

// // Z-Curve Component
// const wrapText = (text, maxWords = 3) => {
//   const words = text.split(' ');
//   if (words.length <= maxWords) return text;
  
//   const lines = [];
//   for (let i = 0; i < words.length; i += maxWords) {
//     lines.push(words.slice(i, i + maxWords).join(' '));
//   }
//   return lines;
// };

// const ZCurve = ({ strokeWidth = 6, processes = [] }) => {
//   const [dimensions, setDimensions] = useState({ width: 1200, height: 700 });

//   React.useEffect(() => {
//     const updateDimensions = () => {
//       const screenWidth = window.innerWidth;
//       let width, height;

//       if (screenWidth < 640) {
//         width = Math.max(800, screenWidth * 1.5);
//         height = 650; // Increased height
//       } else if (screenWidth < 1024) {
//         width = Math.max(1000, screenWidth * 0.9);
//         height = 680; // Increased height
//       } else if (screenWidth < 1280) {
//         width = 1100;
//         height = 700; // Increased height
//       } else {
//         width = 1200;
//         height = 700; // Increased height
//       }

//       setDimensions({ width, height });
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   const { width, height } = dimensions;
//   const padding = Math.max(60, width * 0.08);

//   // Adjusted yLevels to maintain Z-curve's visual proportion within the new height
//   const yLevels = [
//     height * 0.20, // Slightly higher starting point
//     height * 0.50,
//     height * 0.80 // Slightly lower ending point
//   ];
//   const arcRadius = Math.min(42, width * 0.035);

//   const availableWidth = width - 2 * padding;

//   const firstX = padding;
//   const firstY = yLevels[0];
//   const extraStart = Math.min(50, width * 0.04);

//   const lastX = width - padding;
//   const lastY = yLevels[2];

//   const responsiveStrokeWidth = Math.max(4, Math.min(strokeWidth, width / 150));

//   // Color mapping for automation types
//   const getNodeColor = (type) => {
//     switch (type) {
//       case 'Automated':
//         return '#10b981'; // Green
//       case 'Partially Automated':
//         return '#f59e0b'; // Amber
//       case 'Manual':
//         return '#f97316'; // Dark orange
//       default:
//         return '#10b981';
//     }
//   };

//   return (
//     <div className="w-full h-full overflow-x-auto">
//       <svg
//         viewBox={`0 0 ${width} ${height}`}
//         preserveAspectRatio="xMidYMid meet"
//         className="w-full h-full min-w-[600px]"
//         style={{ minHeight: '350px' }}
//       >
//         <defs>
//           <marker
//             id="arrow"
//             viewBox="0 0 10 10"
//             refX="5"
//             refY="5"
//             markerWidth="4"
//             markerHeight="4"
//             orient="auto-start-reverse"
//           >
//             <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
//           </marker>
//         </defs>

//         <path
//           d={`M ${firstX - extraStart},${firstY} L ${firstX},${firstY}`}
//           stroke="#10b981"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />

//         <path
//           d={`M ${firstX},${firstY} L ${width - padding},${firstY}`}
//           stroke="#10b981"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />
//         <path
//           d={`M ${width - padding},${yLevels[0]} A ${arcRadius},${arcRadius} 0 0 1 ${width - padding},${yLevels[1]}`}
//           stroke="#10b981"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />
//         <path
//           d={`M ${padding},${yLevels[1]} L ${width - padding},${yLevels[1]}`}
//           stroke="#10b981"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />
//         <path
//           d={`M ${padding},${yLevels[1]} A ${arcRadius},${arcRadius} 0 0 0 ${padding},${yLevels[2]}`}
//           stroke="#10b981"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />
//         <path
//           d={`M ${padding},${yLevels[2]} L ${lastX},${lastY}`}
//           stroke="#10b981"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//           markerEnd="url(#arrow)"
//         />

//         {processes.map((proc, index) => {
//           const totalNodes = processes.length;
//           const nodesPerRow = Math.ceil(totalNodes / yLevels.length);
//           const minNodeSpacing = Math.max(120, availableWidth / (nodesPerRow + 1));

//           let rowIndex = Math.floor(index / nodesPerRow);
//           let positionInRow = index % nodesPerRow;

//           const actualNodesInThisRow = Math.min(nodesPerRow, totalNodes - (rowIndex * nodesPerRow));
//           if (rowIndex === 1) {
//             positionInRow = actualNodesInThisRow - 1 - positionInRow;
//           }

//           const effectiveWidth = availableWidth - 50;
//           const stepInRow = actualNodesInThisRow > 1 ? effectiveWidth / (actualNodesInThisRow - 1) : 0;
//           const cx = actualNodesInThisRow === 1 ? padding + effectiveWidth / 2 : padding + (positionInRow * stepInRow);

//           const cy = yLevels[rowIndex % yLevels.length];

//           const radius = Math.max(18, Math.min(28, width / 45));

//           const tooltipWidth = Math.min(240, width * 0.25);
//           const tooltipX = cx - tooltipWidth / 2 < 0 ? 0 :
//                              (cx + tooltipWidth / 2 > width ? width - tooltipWidth : cx - tooltipWidth / 2);

//           const titleFontSize = Math.max(10, Math.min(16, width / 80));
//           const tooltipTitleSize = Math.max(12, Math.min(14, width / 90));
//           const tooltipTextSize = Math.max(10, Math.min(12, width / 100));
//           const personaFontSize = Math.max(9, Math.min(12, width / 100));

//           const nodeColor = getNodeColor(proc.type);

//           return (
//             <g key={index} className="group">
//               <circle
//                 cx={cx}
//                 cy={cy}
//                 r={radius}
//                 fill="white"
//                 stroke={nodeColor}
//                 strokeWidth="3"
//                 className="cursor-pointer hover:stroke-blue-500 transition-colors"
//               />
//               <text
//                 x={cx}
//                 y={cy - radius - 8}
//                 fontSize={titleFontSize}
//                 fill="#111827"
//                 fontWeight="bold"
//                 textAnchor="middle"
//                 fontFamily="'Inter', system-ui, -apple-system, sans-serif"
//                 className="pointer-events-none select-none"
//               >
//                 {wrapText(proc.name).map((line, i) => (
//                   <tspan
//                     key={i}
//                     x={cx}
//                     dy={i === 0 ? 0 : titleFontSize * 1.2}
//                     className="hidden sm:inline"
//                   >
//                     {line}
//                   </tspan>
//                 ))}
//                 <tspan
//                   x={cx}
//                   dy={0}
//                   className="sm:hidden"
//                 >
//                   {proc.name?.split('.')[0] + '.'}
//                 </tspan>
//               </text>

//               {/* Persona text below node */}
//               <text
//                 x={cx}
//                 y={cy + radius + 16}
//                 fontSize={personaFontSize}
//                 fill="#4b5563"
//                 textAnchor="middle"
//                 className="pointer-events-none select-none"
//               >
//                 {proc.persona}
//               </text>

//               <foreignObject
//                 x={tooltipX}
//                 y={cy - 60}
//                 width={tooltipWidth}
//                 height="200"
//                 className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
//                 style={{ zIndex: 50 }}
//               >
//                 <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-3 text-xs leading-snug pointer-events-auto transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
//                   <h4
//                     className="font-semibold text-blue-600 mb-2"
//                     style={{ fontSize: `${tooltipTitleSize}px` }}
//                   >
//                     {proc.name}
//                   </h4>
//                   <p
//                     className="text-gray-700 mb-2"
//                     style={{ fontSize: `${tooltipTextSize}px` }}
//                   >
//                     {proc.description}
//                   </p>
//                   <div
//                     className="text-gray-500 space-y-1"
//                     style={{ fontSize: `${tooltipTextSize - 1}px` }}
//                   >
//                     <div><strong>Type:</strong> {proc.type}</div>
//                     <div><strong>ESSA:</strong> {proc.essaType}</div>
//                     <div><strong>Persona:</strong> {proc.persona}</div>
//                   </div>
//                 </div>
//               </foreignObject>
//             </g>
//           );
//         })}

//         {/* Legend - Adjusted position for increased height */}
//         <g transform={`translate(${padding}, ${height - 20})`}> {/* Moved legend up */}
//           <text x="0" y="0" fontSize="18" fontWeight="bold" fill="#111827">Legend:</text>

//           {/* Manual */}
//           <circle cx="80" cy="-5" r="10" fill="white" stroke="#f97316" strokeWidth="3" />
//           <text x="95" y="0" fontSize="18" fill="#111827">Manual</text>

//           {/* Partially Automated */}
//           <circle cx="180" cy="-5" r="10" fill="white" stroke="#f59e0b" strokeWidth="3" />
//           <text x="195" y="0" fontSize="18" fill="#111827">Partially Automated</text>

//           {/* Automated */}
//           <circle cx="385" cy="-5" r="10" fill="white" stroke="#10b981" strokeWidth="3" />
//           <text x="400" y="0" fontSize="18" fill="#111827">Automated</text>
//         </g>
//       </svg>
//     </div>
//   );
// };

// // StepCard Component
// const StepCard = ({ step, onView, onEdit, onDelete, onDragStart, onDragEnd, onDragOver }) => {
//   return (
//     <div
//       draggable
//       onDragStart={onDragStart}
//       onDragEnd={onDragEnd}
//       onDragOver={onDragOver}
//       className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-move"
//     >
//       <div className="flex items-start justify-between mb-3">
//         <h4 className="font-medium text-gray-900 text-lg">
//           {step.name}
//         </h4>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={onView}
//             className="text-gray-500 hover:text-gray-700 p-1"
//             title="View Details"
//           >
//             <Eye size={16} />
//           </button>
//           <button
//             onClick={onEdit}
//             className="text-gray-500 hover:text-gray-700 p-1"
//             title="Edit Step"
//           >
//             <Edit2 size={16} />
//           </button>
//           <button
//             onClick={onDelete}
//             className="text-red-500 hover:text-red-700 p-1"
//             title="Delete Step"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       </div>
      
//       <div className="space-y-2 text-sm">
//         <div className="flex items-center text-gray-600">
//           <UserCircle size={14} className="mr-2" />
//           <span>{step.persona}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <Tool size={14} className="mr-2" />
//           <span>{step.tools}</span>
//         </div>
//         <div className="flex items-center">
//           <Badge className={`px-2 py-1 rounded-full text-xs ${
//             step.type === 'Automated' ? 'bg-emerald-100 text-emerald-800' :
//             step.type === 'Partially Automated' ? 'bg-amber-100 text-amber-800' :
//             'bg-orange-100 text-orange-800'
//           }`}>
//             {step.type}
//           </Badge>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Step Form Modal Component
// const StepFormModal = ({ step, onSave, onClose, isNew = false }) => {
//   const [formData, setFormData] = useState({
//     name: step?.name || '',
//     description: step?.description || '',
//     type: step?.type || 'Manual',
//     essaType: step?.essaType || 'Eliminate',
//     persona: step?.persona || '',
//     tools: step?.tools || '',
//     input: step?.input || ''
//   });

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold text-gray-900">
//               {isNew ? 'Add New Step' : step?.name}
//             </h3>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Step Name</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => handleChange('name', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter step name"
//                   required
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => handleChange('description', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
//                   placeholder="Enter step description"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                 <select
//                   value={formData.type}
//                   onChange={(e) => handleChange('type', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   <option value="Manual">Manual</option>
//                   <option value="Automated">Automated</option>
//                   <option value="Partially Automated">Partially Automated</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">ESSA Type</label>
//                 <select
//                   value={formData.essaType}
//                   onChange={(e) => handleChange('essaType', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   <option value="Eliminate">Eliminate</option>
//                   <option value="Simplify">Simplify</option>
//                   <option value="Standardize">Standardize</option>
//                   <option value="Automate">Automate</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Persona</label>
//                 <input
//                   type="text"
//                   value={formData.persona}
//                   onChange={(e) => handleChange('persona', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter persona"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Tools</label>
//                 <input
//                   type="text"
//                   value={formData.tools}
//                   onChange={(e) => handleChange('tools', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter tools (comma separated)"
//                   required
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
//                 <input
//                   type="text"
//                   value={formData.input}
//                   onChange={(e) => handleChange('input', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter required input"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
//               >
//                 {isNew ? 'Create Step' : 'Save Changes'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const ZCurveGenerator = () => {
//   const [steps, setSteps] = useState([]);
//   const [selectedStep, setSelectedStep] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', or 'add'
//   const fileInputRef = useRef(null);
//   const [draggedStep, setDraggedStep] = useState(null);

//   const handleAddStep = () => {
//     setSelectedStep(null);
//     setModalMode('add');
//     setIsModalOpen(true);
//   };

//   const handleViewStep = (index) => {
//     setSelectedStep(steps[index]);
//     setModalMode('view');
//     setIsModalOpen(true);
//   };

//   const handleEditStep = (index) => {
//     setSelectedStep(steps[index]);
//     setModalMode('edit');
//     setIsModalOpen(true);
//   };

//   const handleSaveStep = (stepData) => {
//     if (modalMode === 'add') {
//       const newStep = { ...stepData, id: steps.length + 1 };
//       setSteps([...steps, newStep]);
//     } else if (modalMode === 'edit' && selectedStep) {
//       const updatedSteps = steps.map(step => 
//         step.id === selectedStep.id ? { ...stepData, id: step.id } : step
//       );
//       setSteps(updatedSteps);
//     }
//     setIsModalOpen(false);
//   };

//   const handleDeleteStep = (index) => {
//     const updatedSteps = steps.filter((_, i) => i !== index);
//     const reindexedSteps = updatedSteps.map((step, i) => ({ ...step, id: i + 1 }));
//     setSteps(reindexedSteps);
//   };

//   const handleDragStart = (e, index) => {
//     setDraggedStep(index);
//     e.dataTransfer.effectAllowed = 'move';
//     e.target.classList.add('opacity-50');
//   };

//   const handleDragEnd = (e) => {
//     e.target.classList.remove('opacity-50');
//     setDraggedStep(null);
//   };

//   const handleDragOver = (e, index) => {
//     e.preventDefault();
//     if (draggedStep === null || draggedStep === index) return;

//     const newSteps = [...steps];
//     const draggedItem = newSteps[draggedStep];
//     newSteps.splice(draggedStep, 1);
//     newSteps.splice(index, 0, draggedItem);
    
//     const reindexedSteps = newSteps.map((step, i) => ({ ...step, id: i + 1 }));
//     setSteps(reindexedSteps);
//     setDraggedStep(index);
//   };

//   const downloadFile = (format) => {
//     const svgElement = document.querySelector('.z-curve-container svg');
//     if (!svgElement) {
//       console.error('SVG element not found');
//       alert('Z-curve not found. Please make sure you have added steps first.');
//       return;
//     }
  
//     if (format === 'svg') {
//       // Create a completely new SVG with clean structure
//       const viewBox = svgElement.getAttribute('viewBox') || '0 0 1200 700';
//       const [vx, vy, vw, vh] = viewBox.split(' ').map(Number);
      
//       // Start building clean SVG
//       let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${vw}" height="${vh}">
//     <defs>
//       <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
//         <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
//       </marker>
//     </defs>
//   `;
  
//       // Get all paths (the Z-curve lines)
//       const paths = svgElement.querySelectorAll('path');
//       paths.forEach(path => {
//         const d = path.getAttribute('d');
//         const stroke = path.getAttribute('stroke');
//         const strokeWidth = path.getAttribute('stroke-width');
//         const fill = path.getAttribute('fill');
//         const strokeLinecap = path.getAttribute('stroke-linecap');
//         const markerEnd = path.getAttribute('marker-end');
        
//         svgContent += `  <path d="${d}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill || 'none'}"`;
//         if (strokeLinecap) svgContent += ` stroke-linecap="${strokeLinecap}"`;
//         if (markerEnd) svgContent += ` marker-end="${markerEnd}"`;
//         svgContent += ' />\n';
//       });
  
//       // Get all circles (the step nodes)
//       const circles = svgElement.querySelectorAll('circle');
//       circles.forEach(circle => {
//         const cx = circle.getAttribute('cx');
//         const cy = circle.getAttribute('cy');
//         const r = circle.getAttribute('r');
//         const fill = circle.getAttribute('fill');
//         const stroke = circle.getAttribute('stroke');
//         const strokeWidth = circle.getAttribute('stroke-width');
        
//         svgContent += `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />\n`;
//       });
  
//       // Get all text elements (labels and legend)
//       const texts = svgElement.querySelectorAll('text');
//       texts.forEach(text => {
//         const x = text.getAttribute('x');
//         const y = text.getAttribute('y');
//         const fontSize = text.getAttribute('fontSize') || text.style.fontSize;
//         const fill = text.getAttribute('fill');
//         const fontWeight = text.getAttribute('fontWeight') || text.style.fontWeight;
//         const textAnchor = text.getAttribute('textAnchor') || text.style.textAnchor;
//         const textContent = text.textContent;
        
//         svgContent += `  <text x="${x}" y="${y}"`;
//         if (fontSize) svgContent += ` font-size="${fontSize}"`;
//         if (fill) svgContent += ` fill="${fill}"`;
//         if (fontWeight) svgContent += ` font-weight="${fontWeight}"`;
//         if (textAnchor) svgContent += ` text-anchor="${textAnchor}"`;
//         svgContent += `>${textContent}</text>\n`;
//       });
  
//       svgContent += '</svg>';
      
//       // Create and download
//       const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
//       const url = URL.createObjectURL(svgBlob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'z-curve.svg';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
      
//     } else if (format === 'png') {
//       // First create the clean SVG like above
//       const viewBox = svgElement.getAttribute('viewBox') || '0 0 1200 700';
//       const [vx, vy, vw, vh] = viewBox.split(' ').map(Number);
      
//       let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${vw}" height="${vh}">
//     <defs>
//       <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
//         <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
//       </marker>
//     </defs>
//   `;
//   // const paths = svgElement.querySelectAll('path);
//   // paths.forEach(path => {const d=path.getAttribute('d'); const stroke=path.getAttribute('stroke');})
//       // Add all elements like in SVG export
//       const paths = svgElement.querySelectorAll('path');
//       paths.forEach(path => {
//         const d = path.getAttribute('d');
//         const stroke = path.getAttribute('stroke');
//         const strokeWidth = path.getAttribute('stroke-width');
//         const fill = path.getAttribute('fill');
//         const strokeLinecap = path.getAttribute('stroke-linecap');
//         const markerEnd = path.getAttribute('marker-end');
        
//         svgContent += `  <path d="${d}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill || 'none'}"`;
//         if (strokeLinecap) svgContent += ` stroke-linecap="${strokeLinecap}"`;
//         if (markerEnd) svgContent += ` marker-end="${markerEnd}"`;
//         svgContent += ' />\n';
//       });
  
//       const circles = svgElement.querySelectorAll('circle');
//       circles.forEach(circle => {
//         const cx = circle.getAttribute('cx');
//         const cy = circle.getAttribute('cy');
//         const r = circle.getAttribute('r');
//         const fill = circle.getAttribute('fill');
//         const stroke = circle.getAttribute('stroke');
//         const strokeWidth = circle.getAttribute('stroke-width');
        
//         svgContent += `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />\n`;
//       });
  
//       const texts = svgElement.querySelectorAll('text');
//       texts.forEach(text => {
//         const x = text.getAttribute('x');
//         const y = text.getAttribute('y');
//         const fontSize = text.getAttribute('fontSize') || text.style.fontSize;
//         const fill = text.getAttribute('fill');
//         const fontWeight = text.getAttribute('fontWeight') || text.style.fontWeight;
//         const textAnchor = text.getAttribute('textAnchor') || text.style.textAnchor;
//         const textContent = text.textContent;
        
//         svgContent += `  <text x="${x}" y="${y}"`;
//         if (fontSize) svgContent += ` font-size="${fontSize}"`;
//         if (fill) svgContent += ` fill="${fill}"`;
//         if (fontWeight) svgContent += ` font-weight="${fontWeight}"`;
//         if (textAnchor) svgContent += ` text-anchor="${textAnchor}"`;
//         svgContent += `>${textContent}</text>\n`;
//       });
  
//       svgContent += '</svg>';
      
//       // Convert to PNG
//       const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
//       const url = URL.createObjectURL(svgBlob);
      
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const scale = 2;
//         canvas.width = vw * scale;
//         canvas.height = vh * scale;
        
//         const ctx = canvas.getContext('2d');
//         ctx.fillStyle = 'white';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         ctx.scale(scale, scale);
//         ctx.drawImage(img, 0, 0, vw, vh);
        
//         canvas.toBlob((blob) => {
//           const pngUrl = URL.createObjectURL(blob);
//           const link = document.createElement('a');
//           link.href = pngUrl;
//           link.download = 'z-curve.png';
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//           URL.revokeObjectURL(pngUrl);
//           URL.revokeObjectURL(url);
//         }, 'image/png');
//       };
      
//       img.onerror = () => {
//         console.error('Failed to load SVG for PNG conversion');
//         alert('Failed to generate PNG. Please try SVG format instead.');
//         URL.revokeObjectURL(url);
//       };
      
//       img.src = url;
      
//     } else if (format === 'json') {
//       const data = {
//         steps: steps,
//         metadata: {
//           createdAt: new Date().toISOString(),
//           version: '1.0'
//         }
//       };
      
//       const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
//       const url = URL.createObjectURL(jsonBlob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'z-curve-data.json';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     }
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/json') {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const data = JSON.parse(e.target.result);
//           if (data.steps && Array.isArray(data.steps)) {
//             setSteps(data.steps);
//           }
//         } catch (error) {
//           alert('Invalid JSON file');
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="border-b border-gray-200 bg-white sticky top-0 z-20">
//         <div className="max-w-full mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-gray-900">Z-Curve Generator</h1>
            
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
//             >
//               <Upload size={16} className="mr-2" />
//               Upload JSON
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex h-[calc(100vh-73px)]">
//         {/* Left Side - Process Steps */}
//         <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">Process Steps</h2>
//             <button
//               onClick={handleAddStep}
//               className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
//             >
//               <Plus size={16} className="mr-2" />
//               Add Step
//             </button>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {steps.map((step, index) => (
//               <StepCard
//                 key={step.id}
//                 step={step}
//                 onView={() => handleViewStep(index)}
//                 onEdit={() => handleEditStep(index)}
//                 onDelete={() => handleDeleteStep(index)}
//                 onDragStart={(e) => handleDragStart(e, index)}
//                 onDragEnd={handleDragEnd}
//                 onDragOver={(e) => handleDragOver(e, index)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right Side - Z-Curve */}
//         <div className="w-1/2 p-6 flex flex-col">
//           <div className="flex-grow bg-white border border-gray-200 rounded-lg p-6 z-curve-container">
//             <div className="h-full">
//               <ZCurve processes={steps} />
//             </div>
//           </div>
          
//           {/* Download Options */}
//           <div className="mt-4 flex justify-end">
//             <div className="relative">
//               <select 
//                 onChange={(e) => {
//                   if (e.target.value) {
//                     downloadFile(e.target.value);
//                     e.target.value = '';
//                   }
//                 }}
//                 className="appearance-none bg-black text-white px-4 py-2 rounded-md pr-8 cursor-pointer"
//                 defaultValue=""
//               >
//                 <option value="" disabled>Download</option>
//                 <option value="png">PNG</option>
//                 <option value="svg">SVG</option>
//                 <option value="json">JSON</option>
//               </select>
//               <Download size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
//             </div>
//           </div>
//         </div>
//       </div>

//         {/* Steps Section */}
//         <div className="space-y-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold text-gray-900">Process Steps</h2>
//             <button
//               onClick={handleAddStep}
//               className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
//             >
//               <Plus size={16} className="mr-2" />
//               Add Step
//             </button>
//           </div>

//           {/* Existing Steps */}
//           {steps.map((step, index) => (
//             <StepForm
//               key={step.id}
//               step={step}
//               onUpdate={(data) => handleStepUpdate(data, index)}
//               onDelete={() => handleDeleteStep(index)}
//             />
//           ))}

//           {/* New Step Form */}
//           {showAddForm && (
//             <StepForm
//               step={null}
//               onUpdate={(data) => handleStepUpdate(data)}
//               onDelete={() => setShowAddForm(false)}
//               isNew={true}
//             />
//           )}

//           {steps.length === 0 && !showAddForm && (
//             <div className="text-center py-12 text-gray-500">
//               <p className="text-lg mb-4">No steps added yet</p>
//               <p className="text-sm">Click "Add Step" to start building your Z-Curve</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Hidden file input */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept=".json"
//         onChange={handleFileUpload}
//         className="hidden"
//       />
//     </div>
//   );
// };

// export default ZCurveGenerator;