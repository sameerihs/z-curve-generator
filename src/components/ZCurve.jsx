// import React, { useState, useEffect } from 'react';

// const ZCurve = ({ strokeWidth = 6, processes = [] }) => {
//   const [dimensions, setDimensions] = useState({ width: 1200, height: 300 });
  
//   useEffect(() => {
//     const updateDimensions = () => {
//       const screenWidth = window.innerWidth;
//       let width, height;
      
//       if (screenWidth < 640) {
//         width = Math.max(800, screenWidth * 1.5);
//         height = 250;
//       } else if (screenWidth < 1024) {
//         width = Math.max(1000, screenWidth * 0.9);
//         height = 280;
//       } else if (screenWidth < 1280) {
//         width = 1100;
//         height = 300;
//       } else {
//         width = 1200;
//         height = 300;
//       }
      
//       setDimensions({ width, height });
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   const { width, height } = dimensions;
//   const padding = Math.max(60, width * 0.08);
  
//   const yLevels = [
//     height * 0.15,
//     height * 0.5,
//     height * 0.85
//   ];
//   const arcRadius = Math.min(42, width * 0.035);

//   const availableWidth = width - 2 * padding;
//   const firstX = padding;
//   const firstY = yLevels[0];
//   const extraStart = Math.min(50, width * 0.04);
//   const lastX = width - padding;
//   const lastY = yLevels[2];
//   const responsiveStrokeWidth = Math.max(4, Math.min(strokeWidth, width / 150));

//   return (
//     <div style={{ width: '100%', height: '100%', overflowX: 'auto', backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '8px' }}>
//       <svg
//         viewBox={`0 0 ${width} ${height}`}
//         preserveAspectRatio="xMidYMid meet"
//         style={{ width: '100%', height: '100%', minWidth: '600px', minHeight: '200px' }}
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
//             <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
//           </marker>
//         </defs>

//         {/* Start segment */}
//         <path
//           d={`M ${firstX - extraStart},${firstY} L ${firstX},${firstY}`}
//           stroke="#000"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />

//         {/* Z-Curve Segments */}
//         <path
//           d={`M ${firstX},${firstY} L ${width - padding},${firstY}`}
//           stroke="#000"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />
//         <path
//           d={`M ${width - padding},${yLevels[0]} A ${arcRadius},${arcRadius} 0 0 1 ${width - padding},${yLevels[1]}`}
//           stroke="#000"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />
//         <path
//           d={`M ${padding},${yLevels[1]} L ${width - padding},${yLevels[1]}`}
//           stroke="#000"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />
//         <path
//           d={`M ${padding},${yLevels[1]} A ${arcRadius},${arcRadius} 0 0 0 ${padding},${yLevels[2]}`}
//           stroke="#000"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />
//         <path
//           d={`M ${padding},${yLevels[2]} L ${lastX},${lastY}`}
//           stroke="#000"
//           strokeWidth={responsiveStrokeWidth}
//           fill="none"
//           strokeLinecap="round"
//           markerEnd="url(#arrow)"
//         />

//         {/* Process Nodes */}
//         {processes.map((proc, index) => {
//           const totalNodes = processes.length;
//           const nodesPerRow = Math.ceil(totalNodes / yLevels.length);
          
//           const rowIndex = Math.floor(index / nodesPerRow);
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
//                          (cx + tooltipWidth / 2 > width ? width - tooltipWidth : cx - tooltipWidth / 2);

//           const titleFontSize = Math.max(10, Math.min(16, width / 80));
//           const tooltipTitleSize = Math.max(12, Math.min(14, width / 90));
//           const tooltipTextSize = Math.max(10, Math.min(12, width / 100));

//           return (
//             <g key={index} className="group">
//               <circle
//                 cx={cx}
//                 cy={cy}
//                 r={radius}
//                 fill="white"
//                 stroke="#000"
//                 strokeWidth="3"
//                 style={{ cursor: 'pointer', transition: 'stroke 0.2s' }}
//                 onMouseEnter={(e) => e.target.setAttribute('stroke', '#666')}
//                 onMouseLeave={(e) => e.target.setAttribute('stroke', '#000')}
//               />
//               <text
//                 x={cx}
//                 y={cy - radius - 8}
//                 fontSize={titleFontSize}
//                 fill="#000"
//                 fontWeight="bold"
//                 textAnchor="middle"
//                 style={{ pointerEvents: 'none', userSelect: 'none' }}
//               >
//                 {window.innerWidth < 640 ? proc.name.split('.')[0] + '.' : proc.name}
//               </text>
              
//               <foreignObject
//                 x={tooltipX}
//                 y={cy - 60}
//                 width={tooltipWidth}
//                 height="200"
//                 style={{ 
//                   opacity: 0, 
//                   transition: 'opacity 0.3s',
//                   pointerEvents: 'none',
//                   zIndex: 10
//                 }}
//                 className="tooltip"
//               >
//                 <div style={{
//                   backgroundColor: 'white',
//                   border: '2px solid black',
//                   borderRadius: '8px',
//                   boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
//                   padding: '12px',
//                   fontSize: '12px',
//                   lineHeight: '1.4',
//                   pointerEvents: 'auto',
//                   transform: 'translateY(8px)',
//                   transition: 'transform 0.2s'
//                 }}>
//                   <h4 style={{ 
//                     fontWeight: 'bold', 
//                     color: 'black', 
//                     marginBottom: '8px',
//                     fontSize: `${tooltipTitleSize}px`
//                   }}>
//                     {proc.name}
//                   </h4>
//                   <p style={{ 
//                     color: '#374151', 
//                     marginBottom: '8px',
//                     fontSize: `${tooltipTextSize}px`
//                   }}>
//                     {proc.description}
//                   </p>
//                   <div style={{ 
//                     color: '#6b7280',
//                     fontSize: `${tooltipTextSize - 1}px`
//                   }}>
//                     <div style={{ marginBottom: '4px' }}><strong>Type:</strong> {proc.type}</div>
//                     <div style={{ marginBottom: '4px' }}><strong>ESSA:</strong> {proc.essaType}</div>
//                     <div><strong>Persona:</strong> {proc.persona}</div>
//                   </div>
//                 </div>
//               </foreignObject>
//             </g>
//           );
//         })}
//       </svg>
//     </div>
//   );
// };

// export default ZCurve;