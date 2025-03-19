import React, { useEffect, useState } from "react";
import { db } from '../firebase'; // Import your Firestore database
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersCollection = collection(db, 'users'); // Adjust the collection name as needed
        const memberSnapshot = await getDocs(membersCollection);
        const memberList = memberSnapshot.docs.map(doc => {
          const data = doc.data();
          return data.displayName || ""; // Get the display name or an empty string
        });
        setMembers(memberList);
      } catch (error) {
        console.error("Error fetching members: ", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="about">
      <h4>Members</h4>
      {members.length > 0 ? (
    <ul className="list-disc pl-5">
      {members.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  ) : (
    <p>No members found.</p>
  )}
    </div>
  );
};

export default Members;