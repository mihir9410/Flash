import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Flashcard from './Flashcard';

const Container = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/batches')
      .then(response => setBatches(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddBatch = (batchName) => {
    axios.post('http://localhost:5000/api/batches', { name: batchName })
      .then(response => setBatches([...batches, response.data]))
      .catch(error => console.error(error));
  };

  const handleSelectBatch = (batchId) => {
    const batch = batches.find(b => b.id === batchId);
    if (batch) {
      axios.get(`http://localhost:5000/api/flashcards/${batchId}`)
        .then(response => setSelectedBatch({ ...batch, flashcards: response.data }))
        .catch(error => console.error(error));
    }
  };

  const handleDeleteBatch = (batchId) => {
    axios.delete(`http://localhost:5000/api/batches/${batchId}`)
      .then(() => {
        setBatches(batches.filter(batch => batch.id !== batchId));
        if (selectedBatch && selectedBatch.id === batchId) {
          setSelectedBatch(null);
        }
      })
      .catch(error => console.error('Error deleting batch:', error));
  };

  const handleDeleteFlashcard = (batchId) => {
    axios.delete(`http://localhost:5000/api/flashcards/${batchId}`)
      .then(() => {
        setBatches(batches.filter(batch => batch.id !== batchId));
        if (selectedBatch && selectedBatch.id === batchId) {
          setSelectedBatch(null);
        }
      })
      .catch(error => console.error('Error deleting batch:', error));
  };

  function handleAddFlashcard(question, answer) {
    if (selectedBatch) {
      axios.post('http://localhost:5000/api/flashcards', {
        batch_id: selectedBatch.id,
        question,
        answer
      })
        .then(response => {
          const updatedBatches = batches.map(batch => batch.id === selectedBatch.id
            ? { ...batch, flashcards: [...batch.flashcards, response.data] }
            : batch
          );
          setBatches(updatedBatches);
          setSelectedBatch({
            ...selectedBatch,
            flashcards: [...selectedBatch.flashcards, response.data]
          });
        })
        .catch(error => console.error(error));
    }
  }

  return (
    <div className="flex min-h-screen bg-zinc-700 text-white">
      <Sidebar
        batches={batches}
        onSelectBatch={handleSelectBatch}
        onAddBatch={handleAddBatch}
        onDeleteBatch={handleDeleteBatch}
      />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 flex-1">
          {selectedBatch ? (
            <Flashcard
              batch={selectedBatch}
              onAddFlashcard={handleAddFlashcard}
              onDeleteFlashcard={handleDeleteFlashcard}
            />
          ) : (
            <h1>Select a flashcard batch</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Container;
