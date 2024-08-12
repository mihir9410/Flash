import React, { useState } from 'react';

const Sidebar = ({ batches, onSelectBatch, onAddBatch, onDeleteBatch }) => {
  const [newBatchName, setNewBatchName] = useState('');

  const handleAddBatch = () => {
    if (newBatchName.trim() !== '') {
      onAddBatch(newBatchName);
      setNewBatchName('');
    }
  };

  return (
    <div className="w-64 bg-zinc-800 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-4">Batches</h2>
        <ul>
          {batches.map(batch => (
            <li key={batch.id} className="flex justify-between items-center mb-2">
              <button
                className="text-white hover:text-green-600"
                onClick={() => onSelectBatch(batch.id)}
              >
                {batch.name}
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => onDeleteBatch(batch.id)} // Ensuring the function is bound correctly
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={newBatchName}
          onChange={(e) => setNewBatchName(e.target.value)}
          placeholder="New Batch Name"
          className="w-full p-2 mb-2 bg-zinc-900 text-white border-none rounded"
        />
        <button
          onClick={handleAddBatch}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Add Batch
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
