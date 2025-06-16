import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';

const MediaPanel: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);

  const fetchMediaFiles = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/media');
      if (response.ok) {
        const files = await response.json();
        setMediaFiles(files);
      } else {
        console.error('Failed to fetch media files');
      }
    } catch (error) {
      console.error('Error fetching media files:', error);
    }
  };

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('media', selectedFile);

    try {
      const response = await fetch('http://localhost:3001/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        setSelectedFile(null); // Reset after upload
        fetchMediaFiles(); // Refresh media list
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred during upload.');
    }
  };

  return (
    <div className="w-full h-full bg-gray-800 bg-opacity-50 p-4 rounded-lg flex flex-col">
      <h2 className="text-white text-lg mb-4 text-center">Media Player</h2>
      <div className="flex flex-col items-center space-y-4 mb-4">
        <label className="flex flex-col items-center">
          <span className="text-white mb-2">Select a file to upload:</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </label>
        {selectedFile && <p className="text-white text-sm">Selected: {selectedFile.name}</p>}
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </div>
      <hr className="border-gray-600 my-2" />
      <div className="flex-grow overflow-y-auto">
        <h3 className="text-white text-md mb-2">Uploaded Media</h3>
        {mediaFiles.length > 0 ? (
          <ul className="space-y-2">
            {mediaFiles.map((file, index) => (
              <li key={index} className="text-white bg-gray-700 p-2 rounded">
                {file}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No media files found.</p>
        )}
      </div>
    </div>
  );
};

export default MediaPanel;
