import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { InputContext } from "../context/context";

const Members = () => {
  const { user } = useContext(InputContext);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersCollection = collection(db, "users");
        const memberSnapshot = await getDocs(membersCollection);
        const memberList = memberSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMembers(memberList);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleRemoveMember = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this member?");
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "users", id));
      setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  return (
    <div className="flex justify-center mt-12">
  <div className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md">
    <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">Community Members</h2>

    {members.length > 0 ? (
      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center mt-50 justify-between p-4 bg-gray-100 rounded-xl hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <img
                src={member.photoURL || "https://via.placeholder.com/40?text=User"}
                alt={member.displayName}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <div className="flex flex-col">
                <span className="font-medium text-gray-800 text-sm">{member.displayName || "Unnamed Member"}</span>
                <span className="text-xs text-gray-500">
                  {user?.uid === member.id ? "You" : member.role === "admin" ? "Admin" : "Member"}
                </span>
              </div>
            </div>

            {user?.role === "admin" && user.uid !== member.id && (
              <button
                onClick={() => handleRemoveMember(member.id)}
                className="px-4 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">No members found.</p>
    )}
  </div>
</div>
  );
};

export default Members;
