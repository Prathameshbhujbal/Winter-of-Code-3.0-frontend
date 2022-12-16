import React, { useRef, useState, useEffect } from "react";
import "./Projects.css";
// import "../../header/NavBar";
import SlideData from "./SlideData";
// import proj_video from "../../../assets/projectAssests/proj_video.mp4";
import NavBar from "../../components/navBar/navBar"
import ProjectCard from "./ProjectCard";
import "./grid.css";
import {
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import "react-icons/fi";
// import backgroundAssets from "../../../assets/sponsors-bg-image.png";

const ProjectsPage = () => {
  let [proj_type, setproj_type] = useState("all");
  let [proj_org, setproj_org] = useState("all");
  const [empty, setEmpty] = useState(false);
  const handleChange = (e) => {

    let empty = true
    for(let i=0; i<SlideData.length; i++)
    {

      if (SlideData[i].tags.includes(e.target.value) && SlideData[i].org_tag.includes(proj_org))
      {
        empty = false;
        break;
      }
    }
    setEmpty(empty);

    setproj_type(e.target.value);
  };
  const handleOrg = (e) => {

    let empty = true
    for(let i=0; i<SlideData.length; i++)
    {

      if (SlideData[i].tags.includes(proj_type) && SlideData[i].org_tag.includes(e.target.value))
      {
        empty = false;
        break;
      }
    }
    setEmpty(empty);

    setproj_org(e.target.value);
  };
  useEffect(() => {
    const proj_form = document.querySelectorAll(".main_item");
    proj_form.forEach((item) => {
      item.addEventListener("click", () => {
        item.children[1].classList.toggle("proj-active");
        item.children[1].children[2].classList.toggle("ideas-active");
        item.children[0].classList.toggle("proj-active-left");
        item.children[0].children[0].children[0].children[0].classList.toggle('idea-hide')
        item.children[0].classList.toggle('back-img');
      });
    });
  }, []);
  const SlidingDiv = useRef(null);
  const calculatePoints = () => {
    var x = window.screen.width;
    if (x > 905) {
      return 750;
    } else if (x > 875) {
      return 500;
    } else if (x > 600) {
      return 250;
    } else {
      return 150;
    }
  }
  const slideLeft = () => {
    SlidingDiv.current.scrollLeft -= calculatePoints();
  };
  const slideRight = () => {
    SlidingDiv.current.scrollLeft += calculatePoints();
  };
  return (
    <div className="projects">
      <div className="background">
      <NavBar navLinkColor="white" />
      </div>
      <div className="projects-page-header">Available Projects</div>
      <div className="temporary">Coming Soon!</div>
      <div className="temp-hide">
      <div className="filter_option">
        <form className="proj_form">
          <select className="proj_slt" onChange={handleChange}>
            <option value="all">All Categories</option>
            <option value="web">Web Development</option>
            <option value="app">App Development</option>
            <option value="ml">Machine Learning</option>
            <option value="cloud">Cloud</option>
            <option value="doc">Documentation</option>
            <option value="compiler">Compiler</option>
            <option value="py">Python</option>
          </select>
        </form>
        <form className="proj_form">
          <select className="proj_slt" onChange={handleOrg}>
            <option value="all">All organizations</option>
            <option value="mojo">Mojo Global</option>
            <option value="llvm">LLVM</option>
            <option value="geeta">The Gita Initiative</option>
            <option value="autodl">Auto DL</option>
            <option value="hoppscotch">Hoppscotch</option>
            <option value="jina">Jina AI</option>
            <option value="edualgo">Edualgo Academy</option>
            <option value="skit">Skit AI</option>
            <option value="asyn">AsyncAPI</option>
            <option value="codedigger">CodeDigger</option>
            <option value="gdsc">GDSC</option>
          </select>
        </form>
      </div>
      {!empty?
      <>
      <div className="container1">
      <div className="Container-arrows">
        <div className="Arrow1" onClick={slideLeft}>
          <FaArrowLeft />
        </div>
        <div className="Arrow2" onClick={slideRight}>
          <FaArrowRight />
        </div>
      </div>
      <div ref={SlidingDiv} className="proj_slides">
        {SlideData.map((slide, idx) => {
          if (slide.tags.includes(proj_type) && slide.org_tag.includes(proj_org)) {
            return <ProjectCard key={idx} data={slide}/>;
          } else {
            return null;
          }
        })}
      </div>
      </div>
      </>
      :<div className="empty_text">
          <h1>No Result Found :</h1>
        </div>}
    </div>
    </div>
  );
};
export default ProjectsPage;