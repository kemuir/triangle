export function copyToCB() {
    const canvas = document.getElementById("myCanvas");
    canvas.toBlob(function(blob) { 
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
        document.getElementById("check").className=""
        setTimeout(function () {document.getElementById("check").className="hidden"},5000)
    });
}
