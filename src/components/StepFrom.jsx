import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const StepForm = ({ step, onSave, onCancel, isNew = false }) => {
  const [formData, setFormData] = useState(step || {
    name: '',
    description: '',
    type: 'Manual',
    essaType: 'Eliminate',
    persona: '',
    tools: '',
    input: ''
  });

  const handleSubmit = () => {
    onSave(formData);
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '2px solid #d1d5db',
    outline: 'none',
    fontSize: '14px'
  };

  const focusStyle = {
    borderColor: '#000'
  };

  return (
    <div style={{
      border: '2px solid black',
      backgroundColor: 'white',
      padding: '24px',
      marginBottom: '16px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {isNew ? 'Add New Step' : 'Edit Step'}
        </h3>
        <button
          onClick={onCancel}
          style={{
            padding: '4px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <X size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
            Step Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#000'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            style={{
              ...inputStyle,
              height: '80px',
              resize: 'vertical'
            }}
            onFocus={(e) => e.target.style.borderColor = '#000'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="Manual">Manual</option>
              <option value="Automated">Automated</option>
              <option value="Partially Automated">Partially Automated</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
              ESSA Type
            </label>
            <select
              value={formData.essaType}
              onChange={(e) => setFormData({...formData, essaType: e.target.value})}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="Eliminate">Eliminate</option>
              <option value="Simplify">Simplify</option>
              <option value="Standardize">Standardize</option>
              <option value="Automate">Automate</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
            Persona
          </label>
          <input
            type="text"
            value={formData.persona}
            onChange={(e) => setFormData({...formData, persona: e.target.value})}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#000'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
              Tools
            </label>
            <input
              type="text"
              value={formData.tools}
              onChange={(e) => setFormData({...formData, tools: e.target.value})}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              placeholder="Comma-separated tools"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
              Input
            </label>
            <input
              type="text"
              value={formData.input}
              onChange={(e) => setFormData({...formData, input: e.target.value})}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', paddingTop: '16px' }}>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1f2937'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'black'}
          >
            <Save size={16} />
            Save Step
          </button>
          <button
            onClick={onCancel}
            style={{
              border: '2px solid black',
              backgroundColor: 'white',
              padding: '8px 16px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepForm;