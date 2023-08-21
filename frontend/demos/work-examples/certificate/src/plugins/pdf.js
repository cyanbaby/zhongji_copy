/**
 * @file 导出pdf文件
 */
import html2canvas from "html2canvas";
import JsPDF from "jspdf";

/* eslint-disable */

const PDF = {};

// a4
let a4Width = 595.28;
let a4Height = 841.89;

let defaultOptions = {
  name: new Date().getTime(),
  scale: window.devicePixelRatio * 2,
  padding: 0,
  width: 595.28 * 2,
  allowTaint: true,
  onclone: function (dom) {
    let screen = dom.querySelector(".pdf-screen");
    screen.style.width = 595.28 * 2 + "px";
    screen.style.padding = "10px";
  },
};

PDF.install = function (Vue, rootOptions = {}) {
  Vue.prototype.$pdf = function (dom, options = rootOptions) {
    options = Object.assign(defaultOptions, options);

    html2canvas(dom, options).then((canvas) => {
      let position = 0;

      // 生成的画布元素宽高（需要收缩回原比例大小）
      let canvasWidth = canvas.width / options.scale;
      let canvasHeight = canvas.height / options.scale;

      // 页面等比例缩放后宽高
      let pageWidth = a4Width;
      let pageHeight = (a4Width / canvasWidth) * canvasHeight;

      //返回图片dataURL，参数：图片格式和清晰度(0-1)
      let jpeg = canvas.toDataURL("image/jpeg", 1.0);

      //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
      let doc = new JsPDF("", "pt", "a4");

      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (canvasHeight < pageHeight) {
        doc.addImage(jpeg, "JPEG", 0, 0, pageWidth, pageHeight); // 从图片顶部开始打印
      } else {
        while (canvasHeight > 0) {
          doc.addImage(jpeg, "JPEG", 0, position, pageWidth, pageHeight);
          canvasHeight -= pageHeight;
          position -= a4Height;

          //避免添加空白页
          if (canvasHeight > 0) {
            doc.addPage();
          }
        }
      }
      doc.save(options.name + ".pdf");
    });
  };
};

export default PDF;
