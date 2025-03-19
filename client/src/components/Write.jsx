import React, { useState, useContext, useRef, useEffect } from 'react';
import { FaPaperclip, FaYoutube, FaLink, FaTimes, FaCheck } from 'react-icons/fa';
import { InputContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs
import { db } from '../firebase'; // Ensure Firebase is imported
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Storage functions

const Write = () => {
  const { user, setGeneratedTexts } = useContext(InputContext);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [category, setCategory] = useState('');
  const [showYoutubePopup, setShowYoutubePopup] = useState(false);
  const [tempYoutubeLink, setTempYoutubeLink] = useState('');
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [linkValue, setLinkValue] = useState('');
  const [file, setFile] = useState(null);

  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Post button clicked!"); // Log action
    console.log("Title:", title, "Category:", category); // Log current values
    if (!title || !category) return;

    try {
      let imgUrl = null;

      if (file) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        imgUrl = await getDownloadURL(storageRef);
      }

      const newPost = {
        id: uuidv4(),
        title,
        content,
        img: imgUrl,
        youtube: youtubeLink,
        link: linkValue,
        category,
        author: user ? user.displayName : 'Guest',
        authorImg: user ? user.photoURL : null,
        date: new Date().toISOString(),
        likes: 0,
        comments: [],
      };

      await addDoc(collection(db, "articles"), newPost);
      setGeneratedTexts((prev) => [...prev, newPost]);
      console.log("Document written with ID: ", newPost.id); // Log success
      
      setTitle('');
      setContent('');
      setYoutubeLink('');
      setLinkValue('');
      setFile(null);
      setCategory('');
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mt-10">
      {!isOpen && (
        <div
          className="flex items-center border p-4 rounded cursor-pointer hover:shadow"
          onClick={() => setIsOpen(true)}
          style={{ marginLeft: '50px', marginBottom: "30px", marginTop: "30px" }}
        >
          <input type="text" placeholder="Write something..." className="w-full outline-none cursor-pointer" readOnly />
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10">
          <div 
            className="bg-white border rounded-lg p-4 w-full max-w-xl mx-8 relative shadow-lg z-10"
            style={{ marginLeft: '50px' }}
          >
            <p className="font-bold mb-2">{user ? user.displayName : 'Guest User'}</p>
            <input
              ref={inputRef}
              type="text"
              placeholder="Title"
              className="w-full text-xl font-semibold p-2 mb-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Write something..."
              className="w-full p-2 border rounded mb-2"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-3">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button onClick={() => fileInputRef.current.click()}><FaPaperclip size={20} /></button>
                <button onClick={() => setShowLinkPopup(true)}><FaLink size={20} /></button>
                <button onClick={() => setShowYoutubePopup(true)}><FaYoutube size={20} /></button>
                <select
                  className="border rounded p-1"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Web Security">Web Security</option>
                  <option value="Network">Network</option>
                  <option value="Pentesting">Pentesting</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <button 
                  className="px-3 py-1 border rounded text-red-500"
                  onClick={() => setIsOpen(false)}>
                  <FaTimes /> Cancel
                </button>
                <button
                  className={`px-3 py-1 border rounded text-green-600 ${!title || !category ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!title || !category}
                  onClick={handleSubmit}
                >
                  <FaCheck /> Post
                </button>
              </div>
            </div>

            {youtubeLink && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">YouTube Video:</p>
                <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {youtubeLink}
                </a>
              </div>
            )}

            {linkValue && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Link:</p>
                <a href={linkValue} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {linkValue}
                </a>
              </div>
            )}

            {file && (
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-gray-600">Attached File:</p>
                <img src={URL.createObjectURL(file)} alt="Attached" className="w-16 h-16 rounded" />
              </div>
            )}
          </div>
        </div>
      )}

      {showYoutubePopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-4 rounded shadow-md w-96">
            <p className="mb-2">Paste YouTube Video Link:</p>
            <input
              type="text"
              value={tempYoutubeLink}
              onChange={(e) => setTempYoutubeLink(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 border rounded text-red-500"
                onClick={() => setShowYoutubePopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 border rounded text-green-600"
                onClick={() => {
                  setYoutubeLink(tempYoutubeLink);
                  setTempYoutubeLink('');
                  setShowYoutubePopup(false);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showLinkPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-4 rounded shadow-md w-96">
            <p className="mb-2">Paste Link:</p>
            <input
              type="text"
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 border rounded text-red-500"
                onClick={() => setShowLinkPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 border rounded text-green-600"
                onClick={() => setShowLinkPopup(false)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;