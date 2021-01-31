const canvas = () => {
    let cv = document.createElement("canvas");
    cv.setAttribute("id", "canvas");
    cv.setAttribute("width", "1366");
    cv.setAttribute("height", "768");
  
    document.body.appendChild(cv);
};

export default canvas;