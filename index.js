import { generateRightTriangle } from "./right_triangle.js";
import { generateTriangle } from "./triangle.js";
import { copyToCB } from "./util.js";

document.getElementById("generate").addEventListener("click",generateTriangle);
document.getElementById("copy").addEventListener("click",copyToCB);