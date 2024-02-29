import { codingImg } from "../assets/index";

const article = [
  {
    id: 1,
    category: "web application",
    name: "Attendence",
    img: codingImg,
    content: [
      {
        type: "text",
        text: "Article 1 description",
      },
      {
        type: "code",
        code: `function attendence() {
        return  "attendence"
}`,
      },
    ],
  },
  {
    id: 2,
    category: "Database",
    name: "Connect to mysql",
    img:  codingImg ,
    content: [
      {
        type: "text",
        text: "Article 2 description",
      },
      {
        type: "code",
        code: `function() {
            return "connect to mysql"
        }`,
      },
    ],
  },

  {
    id: 3,
    category: "auth",
    name: "Passport auth with react",
    img: codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
  {
    id: 4,
    category: "react state",
    name: "Hooks",
    img: codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
  {
    id: 5,
    category: "Express",
    name: "setup Express.js",
    img:  codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
  {
    id: 6,
    category: "Express",
    name: "setup Express.js",
    img: codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
  {
    id: 7,
    category: "Express",
    name: "setup Express.js",
    img: codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
  {
    id: 8,
    category: "Express",
    name: "setup Express.js",
    img: codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
];

export default article;
