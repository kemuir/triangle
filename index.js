import { generateRightTriangle } from "./right_triangle.js";
import { copyToCB } from "./util.js";

document.getElementById("generate").addEventListener("click",generateRightTriangle);
document.getElementById("copy").addEventListener("click",copyToCB);