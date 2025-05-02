import React, { useState, useContext, useRef, useEffect } from "react";
import {
  FaPaperclip,
  FaYoutube,
  FaLink,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { InputContext } from "../context/context";
//import { v4 as uuidv4 } from "uuid"; // Remove uuid import
import { db } from "../firebase"; // Ensure Firebase is imported
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Firestore functions
import { createClient } from "@supabase/supabase-js"; // Import Supabase client
import { format } from "date-fns";

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Write = () => {
  const { user, setGeneratedTexts } = useContext(InputContext);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [category, setCategory] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [file, setFile] = useState(null);
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [showYoutubePopup, setShowYoutubePopup] = useState(false);
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
    if (!user) {
      console.error("User is not authenticated. Cannot post.");
      return; // Prevent posting if user is not authenticated
    }
    if (!title || !category) return; // Ensure title and category are filled

    let imgUrl = null;

    if (file) {
      try {
        // Upload the file to Supabase Storage
        const { data, error } = await supabase.storage
          .from("articles-images")
          .upload(`images/${file.name}`, file);

        if (error) {
          throw error;
        }
        // Get the public URL of the uploaded file
        imgUrl = `${supabaseUrl}/storage/v1/object/public/articles-images/${data.path}`;
      } catch (uploadError) {
        console.error("Error uploading file: ", uploadError);
        return; // Exit the function if file upload fails
      }
    }

    const newPost = {
      //id: uuidv4(), // REMOVE THIS LINE!  Firestore generates the ID
      title,
      content,
      img: imgUrl,
      youtube: youtubeLink,
      link: linkValue,
      category,
      author: user.displayName || "Guest",
      authorImg: user.photoURL || null,
      date: format(new Date(), "PPP p"),
      likes: [],
      comments: [],
      timestamp: serverTimestamp(), // Add a timestamp
      userId: user?.uid,
      email: user?.email,
    };

    try {
      const docRef = await addDoc(collection(db, "articles"), newPost); // Get the DocumentReference

      // Optional:  If you *really* need the ID inside the document, you can update it:
      // await updateDoc(docRef, { id: docRef.id });  //But this is usually unnecessary

      setGeneratedTexts((prev) => [...prev, newPost]); // This is incorrect, see Books.jsx
      console.log("Document added successfully with ID: ", docRef.id); // Log the Firestore-generated ID

      // Reset fields
      setTitle("");
      setContent("");
      setYoutubeLink("");
      setLinkValue("");
      setFile(null);
      setCategory("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="inputOfWrite">
        {!isOpen && (
          <div
            className="flex w-[500px] bg-white rounded-lg border border-gray-300 p-3 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            {/*<img
            className="userImg"
            src={user.photoURL || nin}
            onClick={() => setOpen(!open)}
            alt="User Avatar"
            style={{ cursor: "pointer" }}
    /> */}
            <input
              type="text"
              placeholder="Write something..."
              className=" w-full p-4 bg-gray-100 rounded-md text-gray-700 placeholder-gray-400 outline-none cursor-pointer"
              readOnly
            />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10">
          <div className="bg-white border rounded-lg p-4 w-full max-w-xl mx-8 relative shadow-lg z-10">
            <p className="font-bold mb-2">{user.displayName || "Guest User"}</p>
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
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button onClick={() => fileInputRef.current.click()}>
                  <FaPaperclip size={20} />
                </button>
                <button onClick={() => setShowLinkPopup(true)}>
                  <FaLink size={20} />
                </button>
                <button onClick={() => setShowYoutubePopup(true)}>
                  <FaYoutube size={20} />
                </button>
                <select
                  className="border rounded p-1"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="All">All</option>
                  <option value="Web Security">Web Security</option>
                  <option value="Network">Network</option>
                  <option value="Pentesting">Pentesting</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 border rounded text-red-500"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  className={`px-3 py-1 border rounded text-green-600 ${
                    !title ? "opacity-50 cursor-not-allowed" : ""
                  }`}
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
                <a
                  href={youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {youtubeLink}
                </a>
              </div>
            )}

            {showLinkPopup && (
              <div className="fixed z-20 bg-white border p-4 rounded shadow-lg">
                <input
                  type="text"
                  placeholder="Paste Link"
                  value={linkValue}
                  onChange={(e) => setLinkValue(e.target.value)}
                  className="border rounded p-2"
                />
                <button onClick={() => setShowLinkPopup(false)}>Done</button>
              </div>
            )}

            {showYoutubePopup && (
              <div className="fixed z-20 bg-white border p-4 rounded shadow-lg">
                <input
                  type="text"
                  placeholder="Paste YouTube Link"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  className="border rounded p-2"
                />
                <button onClick={() => setShowYoutubePopup(false)}>Done</button>
              </div>
            )}

            {linkValue && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Link:</p>
                <a
                  href={linkValue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {linkValue}
                </a>
              </div>
            )}

            {file && (
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-gray-600">Attached File:</p>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Attached"
                  className="w-16 h-16 rounded"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Write;