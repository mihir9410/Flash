import React, { useState } from 'react';

const Flashcard = ({ batch, onAddFlashcard, onDeleteFlashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const currentCard = batch.flashcards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < batch.flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAddFlashcard = () => {
    onAddFlashcard(question, answer);
    setQuestion('');
    setAnswer('');
    setShowPopup(false);
  };

  const handleDelete = () => {
    onDeleteFlashcard(currentCard.id);
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-white text-black p-10 rounded-lg shadow-lg w-full max-w-2xl text-center">
        <div className={`${isFlipped ? 'hidden' : 'block'}`}>
          <h2 className="text-3xl">{currentCard?.question || 'No cards available'}</h2>
        </div>
        <div className={`${isFlipped ? 'block' : 'hidden'}`}>
          <h2 className="text-3xl">{currentCard?.answer || 'No answer available'}</h2>
        </div>
        <button onClick={handleFlip} className="absolute top-2 right-2 text-blue-500">
          Flip
        </button>
        {currentCard && (
          <button onClick={handleDelete} className="absolute top-2 left-2 text-red-500">
            Delete
          </button>
        )}
      </div>
      <div className="mt-4 flex space-x-4">
        <button onClick={handlePrev} className="bg-blue-600 text-white py-2 px-4 rounded">Previous</button>
        <button onClick={handleNext} className="bg-blue-600 text-white py-2 px-4 rounded">Next</button>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setShowPopup(true)}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Add Flashcard
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Add a New Flashcard</h2>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Question"
              className="w-full p-2 mb-2 bg-zinc-900 text-white border-none rounded"
            />
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer"
              className="w-full p-2 mb-2 bg-zinc-900 text-white border-none rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddFlashcard}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
