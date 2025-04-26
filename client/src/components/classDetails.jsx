import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../components/classdetails.module.css";

const ClassDetails = () => {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState(null);
  const [dynamicRight, setDynamicRight] = useState(null);

  const classContent = {
    "start-here": {
      rightTitle: "Getting Started",
      rightDesc: "Watch the Welcome Video, Read Community Guidelines, Join the Intro Chat.",
      sections: [
        {
          title: "Welcome",
          sub: [],
          rightTitle: "Getting Started",
          rightDesc: "Watch the Welcome Video, Read Community Guidelines, Join the Intro Chat."
        },
        {
          title: "Your First Steps",
          sub: [],
          rightTitle: "Your First Steps",
          rightDesc: "Create your Profile, Pick your Role, Start the Fundamentals."
        }
      ]
    },
    "cybersecurity-projects-resources": {
      rightTitle: "Free Resources",
      rightDesc: "Downloadable labs, cheat sheets, and walkthroughs.",
      sections: [
        {
          title: "Welcome",
          sub: [],
          rightTitle: "Free Resources",
          rightDesc: "Downloadable labs, cheat sheets, and walkthroughs."
        },
        {
          title: "Project Ideas",
          sub: ["Pentesting Lab Setup", "SIEM Use Case", "Malware Analysis"],
          subRightContent: [
            {
              rightTitle: "Pentesting Lab Setup",
              rightDesc: "Learn how to build a personal pentesting environment."
            },
            {
              rightTitle: "SIEM Use Case",
              rightDesc: "Create a simple use case in a Security Information and Event Management system."
            },
            {
              rightTitle: "Malware Analysis",
              rightDesc: "Introduction to analyzing basic malware samples safely."
            }
          ]
        },
        {
          title: "Tools & Platforms",
          sub: ["TryHackMe", "Hack The Box", "Security Onion"],
          subRightContent: [
            {
              rightTitle: "TryHackMe",
              rightDesc: "Interactive learning platform for cybersecurity beginners."
            },
            {
              rightTitle: "Hack The Box",
              rightDesc: "Hands-on hacking labs for learning and skill development."
            },
            {
              rightTitle: "Security Onion",
              rightDesc: "Free and open platform for threat hunting, security monitoring, and log management."
            }
          ]
        }
      ]
    },
    "cybersecurity-fundamentals": {
      rightTitle: "Foundational Tools",
      rightDesc: "Firewalls, IDS/IPS, Antivirus, and Encryption.",
      sections: [
        {
          title: "Welcome",
          sub: [],
          rightTitle: "Foundational Tools",
          rightDesc: "Firewalls, IDS/IPS, Antivirus, and Encryption."
        },
        {
          title: "Core Concepts",
          sub: ["CIA Triad", "Threat vs Vulnerability", "Common Attacks"],
          subRightContent: [
            {
              rightTitle: "CIA Triad",
              rightDesc: "Confidentiality, Integrity, and Availability - core security principles."
            },
            {
              rightTitle: "Threat vs Vulnerability",
              rightDesc: "Understanding the difference between threats and system weaknesses."
            },
            {
              rightTitle: "Common Attacks",
              rightDesc: "Phishing, malware, ransomware, and how they work."
            }
          ]
        },
        {
          title: "Protocols & Layers",
          sub: ["TCP/IP Basics", "OSI Model", "Common Ports"],
          subRightContent: [
            {
              rightTitle: "TCP/IP Basics",
              rightDesc: "Fundamentals of how devices communicate over the internet."
            },
            {
              rightTitle: "OSI Model",
              rightDesc: "7-layer framework for understanding network communications."
            },
            {
              rightTitle: "Common Ports",
              rightDesc: "Important ports like 80, 443, 22, and what they are used for."
            }
          ]
        }
      ]
    }
  };

  const content = classContent[slug] || {
    rightTitle: "Not Found",
    rightDesc: "No info found for this topic.",
    sections: []
  };

  const handleToggle = (index) => {
    if (slug === "start-here") {
      const selectedSection = content.sections[index];
      setDynamicRight({
        rightTitle: selectedSection.rightTitle,
        rightDesc: selectedSection.rightDesc
      });
    } else {
      // if the section has NO subs (like Welcome), update right content
      if (content.sections[index].sub.length === 0) {
        setDynamicRight({
          rightTitle: content.sections[index].rightTitle,
          rightDesc: content.sections[index].rightDesc
        });
        setActiveSection(null); // close any dropdowns
      } else {
        setActiveSection(index === activeSection ? null : index);
      }
    }
  };

  const handleSubClick = (sectionIndex, subIndex) => {
    const selectedSub = content.sections[sectionIndex].subRightContent[subIndex];
    setDynamicRight({
      rightTitle: selectedSub.rightTitle,
      rightDesc: selectedSub.rightDesc
    });
  };

  const rightBoxContent = dynamicRight || { rightTitle: content.rightTitle, rightDesc: content.rightDesc };

  return (
    <div className={styles.classdetailcontainer}>
      {/* Left Box */}
      <div className={styles.leftBox}>
        {content.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => handleToggle(sectionIndex)}
            >
              {section.title}
            </div>
            {slug !== "start-here" && section.sub.length > 0 && (
              <AnimatePresence>
                {activeSection === sectionIndex && (
                  <motion.div
                    className={styles.subSection}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {section.sub.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className={styles.subItem}
                        onClick={() => handleSubClick(sectionIndex, subIndex)}
                      >
                        {subItem}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>

      {/* Right Box */}
      <div className={`${styles.classbox} ${styles.classboxRight}`}>
        <h2>{rightBoxContent.rightTitle}</h2>
        <p>{rightBoxContent.rightDesc}</p>
      </div>
    </div>
  );
};

export default ClassDetails;
