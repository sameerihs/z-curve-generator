import React, { useState, useEffect } from 'react';

// Helper function to wrap text
function wrapText(text, maxWords = 3) {
  if (!text) return [''];  // Handle null or undefined text
  const words = text.split(' ');
  if (words.length <= maxWords) return [text];  // Return array with single line
  
  const lines = [];
  for (let i = 0; i < words.length; i += maxWords) {
    lines.push(words.slice(i, i + maxWords).join(' '));
  }
  return lines;
}

const ZCurve = ({ strokeWidth = 6, processes = [] }) => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 500 });
  
  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      let width, height;
      
      if (screenWidth < 640) {
        width = Math.max(800, screenWidth * 1.5);
        height = 450;
      } else if (screenWidth < 1024) {
        width = Math.max(1000, screenWidth * 0.9);
        height = 480;
      } else if (screenWidth < 1280) {
        width = 1100;
        height = 500;
      } else {
        width = 1200;
        height = 500;
      }
      
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;
  const padding = Math.max(60, width * 0.08);
  
  const yLevels = [
    height * 0.15,
    height * 0.5,
    height * 0.85
  ];
  const arcRadius = Math.min(42, width * 0.035);

  const availableWidth = width - 2 * padding;
  
  const firstX = padding;
  const firstY = yLevels[0];
  const extraStart = Math.min(50, width * 0.04);

  const lastX = width - padding;
  const lastY = yLevels[2];

  const responsiveStrokeWidth = Math.max(4, Math.min(strokeWidth, width / 150));

  // Color mapping for automation types
  const getNodeColor = (type) => {
    switch (type) {
      case 'Automated':
        return '#10b981'; // Green
      case 'Partially Automated':
        return '#f59e0b'; // Amber
      case 'Manual':
        return '#f97316'; // Dark orange
      default:
        return '#10b981';
    }
  };

  return (
    <div className="w-full h-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full min-w-[600px]"
        style={{ minHeight: '350px', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
          </marker>
        </defs>

        <path
          d={`M ${firstX - extraStart},${firstY} L ${firstX},${firstY}`}
          stroke="#10b981"
          strokeWidth={responsiveStrokeWidth}
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={`M ${firstX},${firstY} L ${width - padding},${firstY}`}
          stroke="#10b981"
          strokeWidth={responsiveStrokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        
        <path
          d={`M ${width - padding},${yLevels[0]} A ${arcRadius},${arcRadius} 0 0 1 ${width - padding},${yLevels[1]}`}
          stroke="#10b981"
          strokeWidth={responsiveStrokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        
        <path
          d={`M ${padding},${yLevels[1]} L ${width - padding},${yLevels[1]}`}
          stroke="#10b981"
          strokeWidth={responsiveStrokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        
        <path
          d={`M ${padding},${yLevels[1]} A ${arcRadius},${arcRadius} 0 0 0 ${padding},${yLevels[2]}`}
          stroke="#10b981"
          strokeWidth={responsiveStrokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        
        <path
          d={`M ${padding},${yLevels[2]} L ${lastX},${lastY}`}
          stroke="#10b981"
          strokeWidth={responsiveStrokeWidth}
          fill="none"
          strokeLinecap="round"
          markerEnd="url(#arrow)"
        />

        {processes.map((proc, index) => {
          const totalNodes = processes.length;
          const nodesPerRow = Math.ceil(totalNodes / yLevels.length);
          const minNodeSpacing = Math.max(120, availableWidth / (nodesPerRow + 1));
          
          const rowIndex = Math.floor(index / nodesPerRow);
          let positionInRow = index % nodesPerRow;
          
          const actualNodesInThisRow = Math.min(nodesPerRow, totalNodes - (rowIndex * nodesPerRow));
          if (rowIndex === 1) {
            positionInRow = actualNodesInThisRow - 1 - positionInRow;
          }
          
          const effectiveWidth = availableWidth - 50;
          const stepInRow = actualNodesInThisRow > 1 ? effectiveWidth / (actualNodesInThisRow - 1) : 0;
          const cx = actualNodesInThisRow === 1 ? padding + effectiveWidth / 2 : padding + (positionInRow * stepInRow);
          
          const cy = yLevels[rowIndex % yLevels.length];
          
          const radius = Math.max(18, Math.min(28, width / 45));
          
          const titleFontSize = Math.max(10, Math.min(16, width / 80));
          const personaFontSize = Math.max(9, Math.min(12, width / 100));

          const nodeColor = getNodeColor(proc.type);
          const wrappedName = wrapText(proc.name);

          return (
            <g key={index}>
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="white"
                stroke={nodeColor}
                strokeWidth="3"
                className="cursor-pointer hover:stroke-blue-500 transition-colors"
              />
              <text
                x={cx}
                y={cy - radius - 8}
                fontSize={titleFontSize}
                fill="#111827"
                fontWeight="bold"
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                {wrappedName.map((line, i) => (
                  <tspan
                    key={i}
                    x={cx}
                    dy={i === 0 ? 0 : titleFontSize * 1.2}
                    className="hidden sm:inline"
                  >
                    {line}
                  </tspan>
                ))}
                <tspan
                  x={cx}
                  dy={0}
                  className="sm:hidden"
                >
                  {proc.name?.split('.')[0] + '.'}
                </tspan>
              </text>
              
              <text
                x={cx}
                y={cy + radius + 16}
                fontSize={personaFontSize}
                fill="#4b5563"
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                {proc.persona}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${padding}, ${height - 60})`}>
          <text x="0" y="0" fontSize="14" fontWeight="bold" fill="#111827">Legend:</text>
          
          {/* Manual */}
          <circle cx="80" cy="-5" r="6" fill="white" stroke="#f97316" strokeWidth="2" />
          <text x="95" y="0" fontSize="12" fill="#111827">Manual</text>
          
          {/* Partially Automated */}
          <circle cx="180" cy="-5" r="6" fill="white" stroke="#f59e0b" strokeWidth="2" />
          <text x="195" y="0" fontSize="12" fill="#111827">Partially Automated</text>
          
          {/* Automated */}
          <circle cx="320" cy="-5" r="6" fill="white" stroke="#10b981" strokeWidth="2" />
          <text x="335" y="0" fontSize="12" fill="#111827">Automated</text>
        </g>
      </svg>
    </div>
  );
};

export default ZCurve;