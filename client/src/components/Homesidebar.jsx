import React, { useContext, useEffect, useState } from "react";
import { mustafa } from "../assets/index";
import { Link } from "react-router-dom";
import { InputContext } from "../context/context";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import UserSidebar from "./userSidebar";

const Sidebar = () => {
  const { clickedCategory, user, AddclickCategory } = useContext(InputContext);
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

  const totalMembers = members.length;
  const totalAdmins = members.filter(member => member.role === "admin").length;
  const totalOnline = members.filter(member => member.isOnline === true).length; // Only if you store `isOnline` field

  return user ? (
    <UserSidebar />
  ) : (
    <div className="DiscoverHome">
      <div className="Discover">
        <img src={mustafa} alt="Community" />
        <h2 className="font-bold">CyberHack | Community</h2>
        <p>CyberHack.com</p>
        <Link>
          <p className="seeMore">
            Break into Cybersecurity with Training, Hands-On Projects and a Career Pathway Call - Did we say this is free?
          </p>
          <p>START HERE</p>
        </Link>
      </div>

      <div className="footerSidebar">
        <p>{totalMembers} members</p>
        <p>{totalOnline} online</p>
        <p>{totalAdmins} admins</p>
      </div>
    </div>
  );
};

export default Sidebar;
