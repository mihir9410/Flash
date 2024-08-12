import React from 'react';

const Modal = ({ isOpen, onClose, onAddFlashcard }) => {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question && answer) {
      onAddFlashcard(question, answer);
      setQuestion('');
      setAnswer('');
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Add New Flashcard</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Flashcard question"
            className="block w-full p-2 mb-4 border rounded border-gray-700"
            required
          />
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Flashcard answer"
            className="block w-full p-2 mb-4 border rounded border-gray-700"
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Flashcard
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default Modal;
