import { codingImg } from "../assets/index";

const article = [
  {
    id: 1,
    category: "programming",
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
    category: "Programming",
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
    category: "Programming",
    name: "Passport auth with react",
    img: codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
  {
    id: 4,
    category: "Programming",
    name: "Hooks",
    img: codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
  {
    id: 5,
    category: "Software engineering",
    name: "Sidee lagu noqda Software engineering",
    img:  codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
  {
    id: 6,
    category: "Reading",
    name: "Baro sida wax loo Akhriyo",
    img: codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
  {
    id: 7,
    category: "Video editing",
    name: "Baro sida loo sameeyo Video editing",
    img: codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
  {
    id: 8,
    category: "Science",
    name: "Wax ka baro Science",
    img: codingImg ,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa enim ut corporis aspernatur
        accusantium beatae est animi fugia accusantium beatae animi fugiat aliquid`,
  },
];

export default article;
