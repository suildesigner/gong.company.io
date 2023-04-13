const canvas = document.getElementById('canvas');
const canvasB = document.getElementById('canvasB');
const canvasC = document.getElementById('canvasC');
const imgSaveButton = document.getElementById("imgSave");
canvas.width = 0;
canvas.height = 0;
canvasC.width = 0;
canvasC.height = 0;
const ctx = canvas.getContext('2d');
const ctxB = canvasB.getContext('2d');
const ctxC = canvasC.getContext('2d');
const fileInput = document.getElementById('fileInput');
var centerLineX = document.getElementById("centerLineX");
var centerLineY = document.getElementById("centerLineY");
var guideColor = "#000";
let isTextDrawn = false; // 전역 변수, 초기값은 false
var cLive = document.getElementById("colorLive");
let fontF = "GmarketSansMedium";
let canvasBStartX = 0;
let canvasBStartY = 0;

var nowColor = "#000000";

let textYtop = false;
let textYmid = true;
let textYbot = false;
ctxB.textBaseline = 'middle';

let lastX, lastY;
let canvasRatio, imageSize, imgX, imgY;

var colorswitch = "off";



const saveBt = document.querySelector('#saveBt');
const textBt = document.querySelector('#textBt');
const uploadBt = document.querySelector('#uploadBt');
const menuBar = document.querySelector('#menuBar');
let isMenuBarOpen = false;

var boxElement = document.getElementById("colorMom");

var beforeColor; //이전에 선택된 컬러 저장 할 변수


//HTML 로딩이 끝난 후
window.onload = function(){
  init();
}


var typing = document.getElementById('typing');
var typewriter = new Typewriter(typing, {
    loop: true
});

typewriter
.pauseFor(3000)
        .typeString('템플릿을 먼저 선택해 주세요.')
        //.typeString('<br/>')
    //.typeString('선택해 주세요.')
    .pauseFor(7000)
        .deleteAll()                        
        //.typeString('<br/>')        
    .start();


    function init() {
      //2차원 배열 파레트 데이터
      var pallet = [["#FF0000", "#FF5E00", "#FFBB00", "#FFE400", "#ABF200", "#1DDB16", "#00D8FF", "#0054FF", "#0100FF", "#5F00FF", "#FF00DD", "#FF007F", "#000000", "#FFFFFF"],
                    ["#FFD8D8", "#FAE0D4", "#FAECC5", "#FAF4C0", "#E4F7BA", "#CEFBC9", "#D4F4FA", "#D9E5FF", "#DAD9FF", "#E8D9FF", "#FFD9FA", "#FFD9EC", "#F6F6F6", "#EAEAEA"],
                    ["#FFA7A7", "#FFC19E", "#FFE08C", "#FAED7D", "#CEF279", "#B7F0B1", "#B2EBF4", "#B2CCFF", "#B5B2FF", "#D1B2FF", "#FFB2F5", "#FFB2D9", "#D5D5D5", "#BDBDBD"],
                    ["#F15F5F", "#F29661", "#F2CB61", "#E5D85C", "#BCE55C", "#86E57F", "#5CD1E5", "#6799FF", "#6B66FF", "#A566FF", "#F361DC", "#F361A6", "#A6A6A6", "#8C8C8C"],
                    ["#CC3D3D", "#CC723D", "#CCA63D", "#C4B73B", "#9FC93C", "#47C83E", "#3DB7CC", "#4374D9", "#4641D9", "#8041D9", "#D941C5", "#D9418C", "#747474", "#5D5D5D"],
                    ["#980000", "#993800", "#997000", "#998A00", "#6B9900", "#2F9D27", "#008299", "#003399", "#050099", "#3F0099", "#990085", "#99004C", "#4C4C4C", "#353535"],
                    ["#670000", "#662500", "#664B00", "#665C00", "#476600", "#22741C", "#005766", "#002266", "#030066", "#2A0066", "#660058", "#660033", "#212121", "#191919"]];
                    var tag = "";
                    for (i = 0; i < pallet.length; i++) {
                      for (j = 0; j < pallet[i].length; j++) {
                        tag +=
                          "<div id=" +
                          pallet[i][j] +
                          " class='colorBox' onclick='colorSet(this)'></div>";
                      }
                    }
                    //파레트 파싱
                    document.getElementById("palletBox").innerHTML = tag;
                  
                    //색상 입히기
                    var colorBox = document.getElementsByClassName("colorBox");
                    for (i = 0; i < colorBox.length; i++) {
                      colorBox[i].style.background = colorBox[i].id;
                    }
                  
                    const colorOn = document.getElementById("colorOn");
                    const colorMom = document.getElementById("colorMom");
                  
                    colorOn.addEventListener("click", function () {
                      var boxElement = document.getElementById("colorMom");
                      if (colorswitch === "off") {
                        colorswitch = "on";
                        boxElement.style.opacity = "1";
                        boxElement.style.visibility = "visible";
                      } else {
                        colorswitch = "off"
                        boxElement.style.opacity = "0";
                        boxElement.style.visibility = "hidden";
                      }
                    });
                  
                    colorMom.addEventListener("click", function () {
                      var boxElement = document.getElementById("colorMom");
                      if (boxElement !== null) {
                        colorswitch = "off"
                        boxElement.style.opacity = "0";
                        boxElement.style.visibility = "hidden";
                        //boxElement.style.visibility = "hidden";
                      }
                    });
                  }
                  
                  function colorSet(target) {
                    var cLive = document.getElementById("colorLive");
                    var boxElement = document.getElementById("colorMom");
                    cLive.style.background = target.id;
                    nowColor = target.id;
                    colorStart();
                  
                    var activeColorBox = document.querySelector(".colorBox.active");
                    if (activeColorBox !== null) {
                      activeColorBox.classList.remove("active");
                    }
                    target.classList.add("active");
                  
                    beforeColor = target.id;
                  
                    var boxElement = document.getElementById("colorMom");
                    if (boxElement !== null) {
                      
                      colorswitch = "off"
                      boxElement.style.opacity = "0";
                      boxElement.style.visibility = "hidden";
                      //boxElement.style.visibility = "hidden";
                    }
                  }
                  
                  
                  
                  document.addEventListener("click", function(event) {
                    var boxElement = document.getElementById("colorMom");
                    if (boxElement !== null && event.target !== colorOn && !colorOn.contains(event.target)) {
                      
                      colorswitch = "off"
                        boxElement.style.opacity = "0";
                        boxElement.style.visibility = "hidden";
                      //boxElement.style.visibility = "hidden";
                    }
                  });


    $(document).ready(function() {
      // slider 변경 이벤트 리스너
      $("#control").change(function() {
        colorStart();
      });
    });
    
    
    
    

function downloadCanvas(filename) {
  // 새로운 캔버스 생성
  const newCanvas = document.createElement('canvas');
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;
  
  const newCtx = newCanvas.getContext('2d');
  

  // canvasB에 그림 그리기
  ctxB.clearRect(0, 0, canvasB.width, canvasB.height);
  const inputText = document.getElementById("texts").value;
  const textWidth = ctxB.measureText(inputText).width; // 텍스트의 폭 계산
  const fontSize = document.getElementById("control").value;
  const fontFamily = fontF;
  ctxB.font = `${fontSize}px ${fontFamily}`;
  ctxB.fillStyle;
  ctxB.textAlign;
  ctxB.textBaseline;
  
  /*if (textYtop === true) {
    ctxB.fillText(inputText, canvasB.width / 2, 100);
  } else if (textYmid === true) {
    ctxB.fillText(inputText, canvasB.width / 2, canvasB.height / 2);
  } else if (textYbot === true) {
    ctxB.fillText(inputText, canvasB.width / 2, canvasB.height - 100);
  }*/

  ctxB.fillText(inputText, canvasB.width / 2, canvasB.height / 2);
  colorStart();


  // canvas를 newCanvas에 합치기
  newCtx.drawImage(canvas, 0, 0);

  // canvasC를 newCanvas에 합치기
  newCtx.drawImage(canvasC, 0, 0);

  // canvasB를 newCanvas에 합치기
  newCtx.drawImage(canvasB, 0, 0);

  // newCanvas를 이미지로 변환
  const image = newCanvas.toDataURL('image/png');

  // 링크를 생성하고 이미지를 다운로드 받도록 함
  const link = document.createElement('a');
  link.download = "image";
  link.href = image;
  link.click();
}


function printName()  {
  isTextDrawn = false;
  texttest();
}


const buttonS = document.getElementById("control");  //control 슬라이더 눌렀을때
buttonS.addEventListener("click", function() {
  isTextDrawn = false;
  ctxB.clearRect(0, 0, canvasB.width, canvasB.height); //캔버스 초기화
  if (!isTextDrawn) {
    const inputText = document.getElementById("texts").value;
    const textWidth = ctxB.measureText(inputText).width; // 텍스트의 폭 계산
    const fontSize = document.getElementById("control").value;
    const fontFamily = fontF;
    ctxB.font = `${fontSize}px ${fontFamily}`;
    ctxB.fillStyle = nowColor;
    ctxB.textAlign = "center";
    ctxB.textBaseline;
    if(textYtop === true) {
      ctxB.fillText(inputText, canvasB.width / 2, 100);
    } else if(textYmid === true) {
      ctxB.fillText(inputText, canvasB.width / 2, canvasB.height / 2);
    } else if(textYbot === true) {
      ctxB.fillText(inputText, canvasB.width / 2, canvasB.height - 100);
    }
    isTextDrawn = true;
  }
  colorStart();
});

const textPosition = {
  x: 0,
  y: 0,
  threshold: 3,
  add(x, y) {
    this.x += x;
    this.y += y;
    colorStart();
  },
  reset() {
    this.x = 0;
    this.y = 0;
    colorStart();
  },
  sticky() {
    const styleWidth = parseInt(getComputedStyle(canvasB).width);
    const styleHeight = parseInt(getComputedStyle(canvasB).height);
    const xRatio = canvasB.width / styleWidth;
    const yRatio = canvasB.height / styleHeight;

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var r = 0, g = 0, b = 0

    for (var i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i+1];
      b += data[i+2];
    }
    var avgR = Math.round(r / (data.length / 4));
    var avgG = Math.round(g / (data.length / 4));
    var avgB = Math.round(b / (data.length / 4));
    
    // 대비가 높은 색상을 배경색으로 설정
    if (avgR + avgG + avgB > (255 * 3 / 2)) {
      centerLineX.style.backgroundColor = "#000";
      centerLineY.style.backgroundColor = "#000";
    } else {
      centerLineX.style.backgroundColor = "#fff";
      centerLineY.style.backgroundColor = "#fff";
    }
    
    
    if (Math.abs(this.x) < this.threshold * xRatio) {
      this.x = 0;
      centerLineX.style.height = styleHeight;
      centerLineX.classList.add("visible");
    } else {
      centerLineX.classList.remove("visible");
    }

    if (Math.abs(this.y) < this.threshold * yRatio) {
      this.y = 0;
      centerLineY.style.width = styleWidth;
      centerLineY.classList.add("visible");
    } else {
      centerLineY.classList.remove("visible");
    }

    colorStart();
  },
}




function colorStart() {
  isTextDrawn = false;
  ctxB.clearRect(0, 0, canvasB.width, canvasB.height); //캔버스 초기화
  if (!isTextDrawn) {
    const inputText = document.getElementById("texts").value;
    const textWidth = ctxB.measureText(inputText).width; // 텍스트의 폭 계산
    const fontSize = document.getElementById("control").value;
    const fontFamily = fontF;
    ctxB.font = `${fontSize}px ${fontFamily}`;
    ctxB.fillStyle = nowColor;
    ctxB.textAlign = "center";
    ctxB.textBaseline;
    ctxB.fillText(inputText, textPosition.x + canvasB.width / 2, textPosition.y + canvasB.height / 2);
    isTextDrawn = true;
  }
}

function texttest() {
  isTextDrawn = false;
  textYtop = false;
  textYmid = true;
  textYbot = false;
  ctxB.clearRect(0, 0, canvasB.width, canvasB.height); //캔버스 초기화
  if (!isTextDrawn) {
    const inputText = document.getElementById("texts").value;
    const textWidth = ctxB.measureText(inputText).width; // 텍스트의 폭 계산
    const fontSize = document.getElementById("control").value;
    const fontFamily = fontF;
    ctxB.font = `${fontSize}px ${fontFamily}`;
    ctxB.fillStyle = nowColor;
    ctxB.textAlign = "center";
    ctxB.textBaseline = 'middle';
    ctxB.fillText(inputText, canvasB.width / 2, canvasB.height / 2);
    isTextDrawn = true;
  }
  colorStart();
}



imgSaveButton.addEventListener("click", function () {
  const canvas = document.getElementById("canvas");
  const canvasC = document.getElementById("canvasC");
  downloadCanvas(canvas, canvasC);
});

let defaultImageURLA = './image/white.png'; // 기본 이미지 URL
let defaultImageURLC = ''; // 기본 이미지 URL

// 파일이 선택되지 않았을 때 기본 이미지를 캔버스에 그리는 함수
function drawDefaultImageC() {
  const img = new Image();
  img.onload = function () {
    const imgAspectRatio = img.width / img.height;
    const canvasAspectRatio = canvasC.width / canvasC.height;
    let imgWidth = img.width;
    let imgHeight = img.height;

    // 이미지의 가로/세로 비율이 캔버스의 가로/세로 비율보다 크면 이미지의 세로를 캔버스의 세로로 맞춤
    if (imgAspectRatio > canvasAspectRatio) {
      imgHeight = canvasC.height;
      imgWidth = imgAspectRatio * imgHeight;
    }
    // 이미지의 가로/세로 비율이 캔버스의 가로/세로 비율보다 작으면 이미지의 가로를 캔버스의 가로로 맞춤
    else {
      imgWidth = canvasC.width;
      imgHeight = imgWidth / imgAspectRatio;
    }

    // 이미지를 캔버스 중앙에 위치시키기 위한 좌표 계산
    const offsetX = (canvasC.width - imgWidth) / 2;
    const offsetY = (canvasC.height - imgHeight) / 2;

    // 캔버스에 이미지를 그림
    ctxC.fillStyle = "#FFFFFF";
    ctxC.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
  };
  img.src = defaultImageURLC;
}

function drawDefaultImage() {
  const img = new Image();
  img.onload = function () {
    const imgAspectRatio = img.width / img.height;
    const canvasAspectRatio = canvas.width / canvas.height;
    let imgWidth = img.width;
    let imgHeight = img.height;

    // 이미지의 가로/세로 비율이 캔버스의 가로/세로 비율보다 크면 이미지의 세로를 캔버스의 세로로 맞춤
    if (imgAspectRatio > canvasAspectRatio) {
      imgHeight = canvas.height;
      imgWidth = imgAspectRatio * imgHeight;
    }
    // 이미지의 가로/세로 비율이 캔버스의 가로/세로 비율보다 작으면 이미지의 가로를 캔버스의 가로로 맞춤
    else {
      imgWidth = canvas.width;
      imgHeight = imgWidth / imgAspectRatio;
    }

    // 이미지를 캔버스 중앙에 위치시키기 위한 좌표 계산
    const offsetX = (canvas.width - imgWidth) / 2;
    const offsetY = (canvas.height - imgHeight) / 2;

    // 캔버스에 이미지를 그림
    ctx.fillStyle = "#FFFFFF";
    ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
  };
  img.src = defaultImageURLA;
}


function guideColorStart() {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var r = 0, g = 0, b = 0;

        for (var i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i+1];
          b += data[i+2];
        }
        var avgR = Math.round(r / (data.length / 4));
        var avgG = Math.round(g / (data.length / 4));
        var avgB = Math.round(b / (data.length / 4));

        // 대비가 높은 색상을 배경색으로 설정
        if (avgR + avgG + avgB > (255 * 3 / 2)) {
          guideColor = "#000";
          $("#canvasBarguide").css("border", borderC + "mm dashed " + "#000");
        } else {
          guideColor = "#fff";
          $("#canvasBarguide").css("border", borderC + "mm dashed " + "#fff");
        }
}


var imgNumber=1;

fileInput.addEventListener('change', function () {

  if(imgNumber === 1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isTextDrawn = false;
    
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const imgAspectRatio = img.width / img.height;
        const canvasAspectRatio = canvas.width / canvas.height;
        let imgWidth = img.width;
        let imgHeight = img.height;
  
        // 이미지의 가로/세로 비율이 캔버스의 가로/세로 비율보다 크면 이미지의 세로를 캔버스의 세로로 맞춤
        if (imgAspectRatio > canvasAspectRatio) {
          imgHeight = canvas.height;
          imgWidth = imgAspectRatio * imgHeight;
        }
        // 이미지의 가로/세로 비율이 캔버스의 가로/세로 비율보다 작으면 이미지의 가로를 캔버스의 가로로 맞춤
        else {
          imgWidth = canvas.width;
          imgHeight = imgWidth / imgAspectRatio;
        }
  
        // 이미지를 캔버스 중앙에 위치시키기 위한 좌표 계산
        const offsetX = (canvas.width - imgWidth) / 2;
        const offsetY = (canvas.height - imgHeight) / 2;
  
        // 캔버스에 이미지를 그림
        ctx.fillStyle = "#FFFFFF";
        ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);

        guideColorStart();
  
  
    };
      img.src = event.target.result;
    };
    // 캔버스를 다시 하얀색으로 채우기
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      reader.readAsDataURL(file);
  } else if (imgNumber === 2) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isTextDrawn = false;
  
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvasAspectRatio = canvas.width / canvas.height;
        const imgAspectRatio = img.width / img.height;
  
        let imgWidth = canvas.width;
        let imgHeight = canvas.height;
  
        if (imgAspectRatio > canvasAspectRatio) {
          // 이미지의 가로가 캔버스보다 길 경우
          imgWidth = canvas.width;
          imgHeight = imgWidth / imgAspectRatio;
        } else {
          // 이미지의 세로가 캔버스보다 길 경우
          imgHeight = canvas.height;
          imgWidth = imgHeight * imgAspectRatio;
        }
  
        const offsetX = (canvas.width - imgWidth) / 2;
        const offsetY = (canvas.height - imgHeight) / 2;
  
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);

        guideColorStart();
      };
  
      img.src = event.target.result;
    };
  
    // 캔버스를 다시 하얀색으로 채우기
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    reader.readAsDataURL(file);
  }  else if (imgNumber === 3) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isTextDrawn = false;
  
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const imgAspectRatio = img.width / img.height;
        let cropWidth = img.width;
        let cropHeight = img.height;
        let cropX = 0;
        let cropY = 0;
  
        // 이미지의 가로/세로 비율에 따라 크롭할 부분 결정
        if (imgAspectRatio > 1) {
          cropWidth = img.height;
          cropX = (img.width - cropWidth) / 2;
        } else if (imgAspectRatio < 1) {
          cropHeight = img.width;
          cropY = (img.height - cropHeight) / 2;
        }
  
        const canvasAspectRatio = canvas.width / canvas.height;
        let imgWidth = canvas.width;
        let imgHeight = canvas.height;
  
        if (imgAspectRatio > canvasAspectRatio) {
          // 가로가 긴 이미지
            imgWidth= canvas.width;
            imgHeight = imgWidth;
        } else {
          // 세로가 긴 이미지
            imgWidth= canvas.width;
            imgHeight = imgWidth;
        }
        
        // 이미지를 1:1 비율로 설정
        const minDimension = Math.min(imgWidth, imgHeight);
        imgWidth = minDimension;
        imgHeight = minDimension;
  
        const offsetX = (canvas.width - imgWidth) / 2;
        const offsetY = (canvas.height - imgHeight) / 2;
  
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, offsetX, offsetY, imgWidth, imgHeight);

        guideColorStart();
      };
  
      img.src = event.target.result;
    };
  
    // 캔버스를 다시 하얀색으로 채우기
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    reader.readAsDataURL(file);
  } else if (imgNumber === 4) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isTextDrawn = false;
  
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const imgAspectRatio = img.width / img.height;
        let cropWidth = img.width;
        let cropHeight = img.height;
        let cropX = 0;
        let cropY = 0;
  
        // 이미지의 가로/세로 비율에 따라 크롭할 부분 결정
        if (imgAspectRatio > 1) {
          cropWidth = img.height;
          cropX = (img.width - cropWidth) / 2;
        } else if (imgAspectRatio < 1) {
          cropHeight = img.width;
          cropY = (img.height - cropHeight) / 2;
        }
  
        const canvasAspectRatio = canvas.width / canvas.height;
        let imgWidth = canvas.width;
        let imgHeight = canvas.height;
  
        if (imgAspectRatio > canvasAspectRatio) {
          // 가로가 긴 이미지
            imgWidth= canvas.height;
            imgHeight = imgWidth;
        } else {
          // 세로가 긴 이미지
            imgWidth= canvas.height;
            imgHeight = imgWidth;
        }
        
        // 이미지를 1:1 비율로 설정
        const minDimension = Math.min(imgWidth, imgHeight);
        imgWidth = minDimension;
        imgHeight = minDimension;
  
        const offsetX = (canvas.width - imgWidth) / 2;
        const offsetY = (canvas.height - imgHeight) / 2;
  
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, offsetX, offsetY, imgWidth, imgHeight);

        guideColorStart();
      };
  
      img.src = event.target.result;
    };
  
    // 캔버스를 다시 하얀색으로 채우기
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    reader.readAsDataURL(file);
  } else if (imgNumber === 5) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isTextDrawn = false;
    
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const imgAspectRatio = img.width / img.height;
        const canvasAspectRatio = canvas.width / canvas.height;
        let imgWidth = img.width;
        let imgHeight = img.height;
  
        // 이미지의 가로/세로 비율이 캔버스의 가로/세로 비율보다 크면 이미지의 세로를 캔버스의 세로로 맞춤
        if (imgAspectRatio > canvasAspectRatio) {
          imgHeight = canvas.height;
          imgWidth = imgAspectRatio * imgHeight;
        }
        // 이미지의 가로/세로 비율이 캔버스의 가로/세로 비율보다 작으면 이미지의 가로를 캔버스의 가로로 맞춤
        else {
          imgWidth = canvas.width;
          imgHeight = imgWidth / imgAspectRatio;
        }
  
        // 이미지를 캔버스 중앙에 위치시키기 위한 좌표 계산
        const offsetX = (canvas.width - imgWidth) / 2;
        const offsetY = (canvas.height - imgHeight) / 2;

        // 캔버스에 이미지를 그리기 전에 투명도를 설정합니다.
        ctx.globalAlpha = 0.25;
  
        // 캔버스에 이미지를 그림
        ctx.fillStyle = "#FFFFFF";
        ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);

        // 투명도 값을 원래대로 되돌립니다.
        ctx.globalAlpha = 1.0;
        guideColorStart();
  
    };
      
      img.src = event.target.result;
    };
    // 캔버스를 다시 하얀색으로 채우기
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      reader.readAsDataURL(file);
  } else if (imgNumber === 6) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isTextDrawn = false;
  
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const imgAspectRatio = img.width / img.height;
        let cropWidth = img.width;
        let cropHeight = img.height;
        let cropX = 0;
        let cropY = 0;

  
        const canvasAspectRatio = canvas.width / canvas.height;
        
        if (imgAspectRatio > canvasAspectRatio) {
          // 가로가 긴 이미지
          cropWidth = img.height * canvasAspectRatio;
          cropX = (img.width - cropWidth) / 2;
        } else if (imgAspectRatio < canvasAspectRatio) {
          // 세로가 긴 이미지
          cropHeight = img.width / canvasAspectRatio;
          cropY = (img.height - cropHeight) / 2;
        }
        
        let imgWidth = canvas.width * 0.85;
        let imgHeight = canvas.height * 0.85;
        
        const offsetX = (canvas.width - imgWidth) / 2;
        const offsetY = (canvas.height - imgHeight) / 2;
        
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, offsetX, offsetY, imgWidth, imgHeight);

        guideColorStart();
      };
  
      img.src = event.target.result;
    };
  
    // 캔버스를 다시 하얀색으로 채우기
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    reader.readAsDataURL(file);
  } else if (imgNumber === 7) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isTextDrawn = false;
  
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const imgAspectRatio = img.width / img.height;
        let cropWidth = img.width;
        let cropHeight = img.height;
        let cropX = 0;
        let cropY = 0;

  
        const canvasAspectRatio = canvas.width / canvas.height;
        
        if (imgAspectRatio > canvasAspectRatio) {
          // 가로가 긴 이미지
          cropWidth = img.height * canvasAspectRatio;
          cropX = (img.width - cropWidth) / 2;
        } else if (imgAspectRatio < canvasAspectRatio) {
          // 세로가 긴 이미지
          cropHeight = img.width / canvasAspectRatio;
          cropY = (img.height - cropHeight) / 2;
        }
        
        let imgWidth = canvas.width * 0.40;
        let imgHeight = canvas.height * 0.40;
        
        const offsetX = (canvas.width - imgWidth) / 2;
        const offsetY = (canvas.height - imgHeight) / 2;
        
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, offsetX, offsetY, imgWidth, imgHeight);

        guideColorStart();
      };
  
      img.src = event.target.result;
    };
  
    // 캔버스를 다시 하얀색으로 채우기
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    reader.readAsDataURL(file);
  } else if (imgNumber === 8) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isTextDrawn = false;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const imageRatio = img.width / img.height;
            let cropWidth = img.width;
            let cropHeight = img.height;
            let cropX = 0;
            let cropY = 0;

            // 이미지의 가로/세로 비율에 따라 크롭할 부분 결정
            if (imageRatio > canvasRatio) {
                cropWidth = img.height * canvasRatio;
                cropX = (img.width - cropWidth) / 2;
            } else if (imageRatio < canvasRatio) {
                cropHeight = img.width / canvasRatio;
                cropY = (img.height - cropHeight) / 2;
            }

            let imgWidth = canvas.width * imageSize;
            let imgHeight = canvas.height * imageSize;

            const maxImgWidth = canvasRatio * canvas.height * imageSize;
            const maxImgHeight = canvas.width * imageSize / canvasRatio;

            // 이미지를 canvasRatio 비율로 설정
            imgWidth = imgWidth > maxImgWidth ? maxImgWidth : imgWidth;
            imgHeight = imgHeight > maxImgHeight ? maxImgHeight : imgHeight;

            const offsetX = (canvas.width - imgWidth) / 2-imgX;
            const offsetY = (canvas.height - imgHeight) / 2-imgY;

            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, offsetX, offsetY, imgWidth, imgHeight);

            guideColorStart();
        };

        img.src = event.target.result;
    };

    // 캔버스를 다시 하얀색으로 채우기
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    reader.readAsDataURL(file);
  }
  });







$(window).on('load', function() {
    $('ul.tabs li').click(function() {
      var tab_id = $(this).attr('data-tab');
      $('ul.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');
      $(this).addClass('current');
      $("#" + tab_id).addClass('current');
      $('ul.tabs li').not(this).css({
        color: '#b2b2b2',
        borderBottomColor: 'transparent'
      });
      $(this).css({
        color: '#fff',
        borderBottomColor: '#000000'
      });
    });
  
    // 첫번째 탭에 포커스를 줍니다

  });

// tab-2를 클릭할 때 실행될 함수
function resetScroll() {
  // 모든 스크롤바를 찾아서 scrollTop 값을 0으로 설정
  var scrollbars = document.querySelectorAll('.tab-content');
  for (var i = 0; i < scrollbars.length; i++) {
    scrollbars[i].scrollTop = 0;
    scrollbars[i].scrollLeft = 0;
  }
}



// tab-2를 클릭하면 resetScroll 함수 실행
document.querySelector('[data-tab="tab-1"]').addEventListener('click', resetScroll);
document.querySelector('[data-tab="tab-2"]').addEventListener('click', resetScroll);
document.querySelector('[data-tab="tab-3"]').addEventListener('click', resetScroll);
document.querySelector('[data-tab="tab-4"]').addEventListener('click', resetScroll);


  $(document).ready(function() {
    // 초기값 설정
    $(".dropdown-selected").text("포토카드 세로");
    canvas.width = 0;
    canvas.height = 0;
    $("#canvas").css("height", 0 + "mm");
    $("#canvas").css("width", 0 + "mm");
    
    setTimeout(function() {
      $('#canvasMom').addClass('move-up');
    }, 1000);
  });

  var height = $(window).height() * 0.15; // 브라우저 높의 60%로 지정
  var width;
  
  var g_height;
  var g_width;
  
  var browserWidth = $(window).width();
  var browserHeight = $(window).height();
  var borderM = Math.min(browserWidth, browserHeight) * 0.0012;
  var borderC;
  
  var radiusM = Math.min(browserWidth, browserHeight) * 0.0012;
  var radiusC;
  const textInput = $("#texts");

  textInput.val("");

  isTextDrawn = false;

  function updateCanvas(width, g_height, g_width, borderC, radiusC) {
    drawDefaultImage();
    drawDefaultImageC();
    var windowHeight = $(window).height();
    if ($("#canvas").css("display") === "none") { // canvas가 처음 보일 때만 애니메이션 실행
      $("#typing").animate({
        
        opacity: 0
      }, 500);
      $("#canvas").css("display", "block").css({
        top: (windowHeight + (-200)) + "px",
        height: height + "mm",
        width: width + "mm",
      }).animate({
        top: "0"
      }, 1000); // 0.5초 동안 애니메이션 효과
  
      $("#canvasBarguide").css({
        top: (windowHeight + (-200)) + "px",
        border: borderC + "mm dashed " + guideColor,
        borderRadius: radiusC + "mm",
        height: g_height + "mm",
        width: g_width + "mm",
      }).animate({
        top: "0"
      }, 1000); // 0.5초 동안 애니메이션 효과

      $("#canvasB").css({
        top: (windowHeight + (-200)) + "px",
        height: height + "mm",
        width: width + "mm",
      }).css("display", "block").animate({
        top: "0"
      }, 1000); // 0.5초 동안 애니메이션 효과

      $("#canvasC").css("display", "block").css({
        top: (windowHeight + (-200)) + "px",
        height: height + "mm",
        width: width + "mm",
      }).animate({
        top: "0"
      }, 1000); // 0.5초 동안 애니메이션 효과

      $("#texts").val("");
      $("#control").val("30");
      $('#colorLive').css('background', '#000000');
      const event = new Event('input');
      slider.dispatchEvent(event);
      nowColor = '#000000';
      guideColor = '#000000';
      textPosition.reset();
  
    } else { // 이미 보이는 canvas일 경우 bottom 애니메이션 생략
      /*$("#canvas").animate({
        height: height + "mm",
        width: width + "mm"
      }, 500); // 0.5초 동안 애니메이션 효과
  
      $("#canvasBarguide").animate({
        border: borderC + "mm dashed " + guideColor,
        borderRadius: radiusC + "mm",
        height: g_height + "mm",
        width: g_width + "mm"
      }, 500); // 0.5초 동안 애니메이션 효과
  
      $("#canvasB").animate({
        height: height + "mm",
        width: width + "mm"
      }, 500); // 0.5초 동안 애니메이션 효과

      $("#canvasC").animate({
        height: height + "mm",
        width: width + "mm"
      }, 500); // 0.5초 동안 애니메이션 효과*/

      $("#texts").val("");
      $("#control").val("30");
      $('#colorLive').css('background', '#000000');
      const event = new Event('input');
      slider.dispatchEvent(event);
      nowColor = '#000000';
      guideColor = '#000000';
      textPosition.reset();
      
    }
    
    $("#canvas").css("height", height + "mm");
    $("#canvas").css("width", width + "mm");
  
    $("#canvasBarguide").css("border", borderC + "mm dashed " + guideColor);
    $("#canvasBarguide").css("border-radius", radiusC + "mm");
  
    $("#canvasBarguide").css("height", g_height + "mm");
    $("#canvasBarguide").css("width", g_width + "mm");
  
    $("#canvasB").css("height", height + "mm");
    $("#canvasB").css("width", width + "mm");

    $("#canvasC").css("height", height + "mm");
    $("#canvasC").css("width", width + "mm");
  
    document.getElementById('fileInput').value = "";
  
  }
  
  $("#shop1").click(function() {
    if ($("#canvas").css("display") === "none") {
    $(".tab-link[data-tab='tab-1']").click();
    $("#temlistClose").css("left", "10px");
    }
  });

  $("#shop2").click(function() {
    if ($("#canvas").css("display") === "none") {
    $(".tab-link[data-tab='tab-2']").click();
    $("#temlistClose").css("left", "10px");
    }
  });

  $("#shop3").click(function() {
    if ($("#canvas").css("display") === "none") {
    $(".tab-link[data-tab='tab-3']").click();
    $("#temlistClose").css("left", "10px");
    }
  });

  $("#shop4").click(function() {
    if ($("#canvas").css("display") === "none") {
    $(".tab-link[data-tab='tab-4']").click();
    $("#temlistClose").css("left", "10px");
    }
  });
  
  $("#temlistClose").click(function() {
    $(".tab-link[data-tab='tab-0']").click();
    $(this).css("left", "-50px");

    var windowHeight = $(window).height();


      $("#canvas").animate({
        top: (windowHeight + (-200)) + "px",
      }, 500, function() {
        $("#typing").animate({
          opacity: 1
        }, 500);
        $("#canvas").css("display", "none");
      });

      $("#canvasB").animate({
        top: (windowHeight + (-200)) + "px",
      }, 500, function() {
        $("#canvasB").css("display", "none");
      });

      $("#canvasC").animate({
        top: (windowHeight + (-200)) + "px",
      }, 500, function() {
        $("#canvasC").css("display", "none");
      });

      $("#canvasBarguide").animate({
        top: (windowHeight + (-200)) + "px",
      }, 500, function() {
      });

      $(".tem").css('box-shadow', 'inset 0 0 0 1px #eaeaea');

  });

  
  $(".tem").css('box-shadow', 'inset 0 0 0 1px #eaeaea');


  $(".tem").click(function() {
    // 모든 tem 요소의 box-shadow를 초기화
    $(".tem").css('box-shadow', 'inset 0 0 0 1px #eaeaea');
    // 클릭한 tem 요소에 안쪽 그림자 추가
    $(this).css('box-shadow', 'inset 0 0 0 2px #000');
  });


  
  function card1setCanvas(imageNumber,setWidth,setHeight,gsetWidth,gsetHeight,setRadio,webSize,mobileSize) {
    canvas.width = setWidth*13;
    canvas.height = setHeight*13;
    canvasB.width = canvas.width;
    canvasB.height = canvas.height;
    canvasC.width = canvas.width;
    canvasC.height = canvas.height;


    if ($(window).width() <= 960) {
      // 모바일 화면일 경우
      height = $(window).height() * mobileSize; // 브라우저 높이
    } else {
      // PC 화면일 경우
      height = $(window).height() * webSize; // 브라우저 높이
    }


    width = height * setWidth / setHeight;
  
    var ratio = gsetWidth/setWidth; // g_width / width
    g_width = width * ratio;
    g_height = g_width * gsetHeight / gsetWidth;
  
    imgNumber = imageNumber;
  
    borderC = 0.7;
    const Cratio = g_width / width; // g_width와 width의 비율 계산
    radiusC = Cratio * (height + width) / setRadio;
  
    var canvasSize = Math.round((canvas.width / (setHeight * 13)) * 100);
    $("#topSize").text(canvasSize + "%");

    updateCanvas(width, g_height, g_width, borderC, radiusC);
  }

  $("#shoptemA1").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(1,58,90,54,86,50,0.10,0.10);
  });
  
  $("#shoptemA2").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(2,58,90,54,86,50,0.10,0.10);
  });
  
  $("#shoptemA3").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(3,58,90,54,86,50,0.10,0.10);
  });

  $("#shoptemA4").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    canvasRatio = 6 / 9;
    imageSize = 0.80;
    imgX = 0;
    imgY = 55;
    card1setCanvas(8,58,90,54,86,50,0.10,0.10);
  });

  $("#shoptemA5").click(function() {
    defaultImageURLC = './image/pc_design1.png';
    defaultImageURLA = './image/white.png';
    canvasRatio = 10 / 12;
    imageSize = 1;
    imgX = 0;
    imgY = -135;
    card1setCanvas(8,58,90,54,86,50,0.10,0.10);
  });

  $("#shoptemA6").click(function() {
    defaultImageURLC = './image/pc_design2.png';
    defaultImageURLA = './image/white.png';
    canvasRatio = 10 / 12;
    imageSize = 1;
    imgX = 0;
    imgY = -135;
    card1setCanvas(8,58,90,54,86,50,0.10,0.10);
  });

  $("#shoptemA7").click(function() {
    defaultImageURLC = './image/pc_design3.png';
    defaultImageURLA = './image/white.png';
    canvasRatio = 1 / 1;
    imageSize = 1;
    imgX = 0;
    imgY = 0;
    card1setCanvas(8,58,90,54,86,50,0.10,0.10);
  });

  $("#shoptemA8").click(function() {
    defaultImageURLC = './image/pc_design4.png';
    defaultImageURLA = './image/pc_bg4.png';
    card1setCanvas(1,58,90,54,86,50,0.10,0.10);
  });

  $("#shoptemA9").click(function() {
    defaultImageURLC = './image/pc_design5.png';
    defaultImageURLA = './image/pc_bg5.png';
    card1setCanvas(1,58,90,54,86,50,0.10,0.10);
  });





  $("#shoptemB1").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(1,90,58,86,54,50,0.10,0.06);
  });
  
  $("#shoptemB2").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(2,90,58,86,54,50,0.10,0.06);
  });
  
  $("#shoptemB3").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(4,90,58,86,54,50,0.10,0.06);
  });

  $("#shoptemB4").click(function() {
    defaultImageURLC = './image/pc2_design1.png';
    defaultImageURLA = './image/white.png';
    canvasRatio = 10 / 5;
    imageSize = 1;
    imgX = 0;
    imgY = -85;
    card1setCanvas(8,90,58,86,54,50,0.10,0.06);
  });

  $("#shoptemB5").click(function() {
    defaultImageURLC = './image/pc2_design2.png';
    defaultImageURLA = './image/white.png';
    canvasRatio = 10 / 5;
    imageSize = 1;
    imgX = 0;
    imgY = -85;
    card1setCanvas(8,90,58,86,54,50,0.10,0.06);
  });

  $("#shoptemB6").click(function() {
    defaultImageURLC = './image/pc2_design3.png';
    defaultImageURLA = './image/white.png';
    canvasRatio = 1 / 1;
    imageSize = 1;
    imgX = 0;
    imgY = 0;
    card1setCanvas(8,90,58,86,54,50,0.10,0.06);
  });



  $("#shoptemC1").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(1,84,84,80,80,500,0.10,0.08);
  });

  $("#shoptemC2").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(2,84,84,80,80,500,0.10,0.08);
  });

  $("#shoptemC3").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(5,84,84,80,80,500,0.10,0.08);
  });

  $("#shoptemC4").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(6,84,84,80,80,500,0.10,0.08);
  });

  $("#shoptemC5").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(7,84,84,80,80,500,0.10,0.08);
  });



  $("#shoptemD1").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(1,90,99,86,95,500,0.10,0.06);
  });

  $("#shoptemD2").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(2,90,99,86,95,500,0.10,0.06);
  });

  $("#shoptemD3").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(5,90,99,86,95,500,0.10,0.06);
  });

  $("#shoptemD4").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(6,90,99,86,95,500,0.10,0.06);
  });

  $("#shoptemD5").click(function() {
    defaultImageURLC = '';
    defaultImageURLA = './image/white.png';
    card1setCanvas(7,90,99,86,95,500,0.10,0.06);
  });




  
  $("#shoptemF3").click(function() {
    canvas.width = 94*13;
    canvas.height = 94*13;
    canvasB.width = canvas.width;
    canvasB.height = canvas.height;
    
    height = $(window).height() * 0.10; // 브라우저 높이의 60%로 지정
    width = height * 94 / 94;
    
    var ratio = 90/94; // g_width / width
    g_width = width * ratio;
    g_height = g_width * 90 / 90;

    imgNumber = 2;
    
    borderC = 0.7;
    const Cratio = g_width / width; // g_width와 width의 비율 계산
    radiusC = Cratio * (height + width) / 500;
    updateCanvas(width, g_height, g_width, borderC, radiusC);
  });




  
  const dropdownSelect2 = document.querySelector('.dropdown2-select');
  const dropdownSelected2 = document.querySelector('.dropdown2-selected');
  const dropdownList2 = document.querySelector('.dropdown2-list');
  const dropdownItems2 = document.querySelectorAll('.dropdown2-item');
  
  dropdownSelected2.addEventListener('click', function() {
    dropdownList2.classList.toggle('show');
  });
  
  dropdownItems2.forEach(item => {
    item.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      dropdownSelected2.textContent = this.textContent;
      dropdownList2.classList.remove('show');
    });
  });

  
  
  document.addEventListener('click', function(e) {
    if (!dropdownSelect2.contains(e.target)) {
      dropdownList2.classList.remove('show');
    }
  });

  $(document).ready(function() {
    // 초기값 설정
    $(".dropdown2-selected").text("본고딕 (Noto Sans)");    
    setTimeout(function() {
      $('#canvasMom').addClass('move-up');
    }, 1000);
  });

  const gongbackBg = document.querySelector('#gongback-bg');

  gongbackBg.addEventListener('animationend', () => {
    setTimeout(() => {
      gongbackBg.style.pointerEvents = 'none';
      gongbackBg.style.display = 'none';
    }, 500);
  });
  

 



  $(document).ready(function() {
    var fontList = [
      { value: '1', name: 'G마켓 산스' },
      { value: '2', name: '롯데리아 촵땡겨체' },
      { value: '3', name: 'KCC차쌤체' },
      { value: '4', name: '카페24 써라운드' },
      { value: '5', name: '잉크립퀴드체' },
      { value: '6', name: '프리텐다드' },
      { value: '7', name: 'HS봄바람체 2.1' },
      { value: '8', name: '강원교육새음체' },
      { value: '9', name: '제주돌담체' },
      { value: '10', name: '조선일보명조체' },
      { value: '11', name: '에스코어드림' },
      { value: '12', name: '태백은하수체' },
      { value: '13', name: '부크크 명조' },
      { value: '14', name: '어그로체' },
      { value: '15', name: '경기청년바탕' },
      { value: '16', name: '조선100년체' },
      { value: '17', name: '을지로체' },
      { value: '18', name: '귀염발랄체' },
      { value: '19', name: '가나초콜릿체' },
      { value: '20', name: '어비 퀸제이체' },
    ];
    
    var updateFont = function(fontF) {
      colorStart();
      $(".dropdown2-selected, .mobileBar-dropdown .dropdown2-selected").css("font-family", fontF);
    };
    
    fontList.forEach(function(item) {
      var selector = ".dropdown2-item[data-value='" + item.value + "']";
      $(selector).show().text(item.name).click(function() {
        fontF = $(this).data('font');
        updateFont(fontF);
      });
      $(".mobileBar-dropdown " + selector).show().text(item.name).click(function() {
        fontF = $(this).data('font');
        updateFont(fontF);
      });
    });
    
    $(".dropdown2-item[data-value]").not(fontList.map(function(item) { return "[data-value='" + item.value + "']" }).join(",")).hide();
    $(".dropdown2-item[data-value='1'], .mobileBar-dropdown .dropdown2-item[data-value='1']").trigger('click');
    
    $(".dropdown2-selected").text("G마켓 산스");
    $(".mobileBar-dropdown .dropdown2-selected").text("G마켓 산스");
    });


  $(document).ready(function() {
    // 초기 폰트 설정
    $("#fontSelect").val("gmarketSans");
  
    // 폰트 변경 이벤트 리스너
    $("#fontSelect").change(function() {
      var fontF;
      switch ($(this).val()) {
        case "G마켓 산스":
          fontF = "G마켓 산스";
          break;
        case "롯데리아 촵땡겨체":
          fontF = "롯데리아 촵땡겨체";
          break;
        case "KCC차쌤체":
          fontF = "KCC차쌤체";
          break;
        case "카페24 써라운드":
          fontF = "카페24 써라운드";
          break;
        case "잉크립퀴드체":
          fontF = "잉크립퀴드체";
          break;
        case "프리텐다드":
          fontF = "프리텐다드";
          break;
        case "HS봄바람체 2.1":
          fontF = "HS봄바람체 2.1";
          break;
        case "강원교육새음체":
          fontF = "강원교육새음체";
          break;
        case "제주돌담체":
          fontF = "제주돌담체";
          break;
        case "조선일보명조체":
          fontF = "조선일보명조체";
          break;
        case "에스코어드림":
          fontF = "에스코어드림";
          break;
        case "태백은하수체":
          fontF = "태백은하수체";
          break;
        case "부크크 명조":
          fontF = "부크크 명조";
          break;
        case "어그로체":
          fontF = "어그로체";
          break;
        case "경기청년바탕":
          fontF = "경기청년바탕";
          break;
        case "조선100년체":
          fontF = "조선100년체";
          break;
        case "을지로체":
          fontF = "을지로체";
          break;
        case "귀염발랄체":
          fontF = "귀염발랄체";
          break;
        case "가나초콜릿체":
          fontF = "가나초콜릿체";
          break;
        case "어비 퀸제이체":
          fontF = "어비 퀸제이체";
          break;
      }
      colorStart();
    });
  });



  $(document).ready(function() {
    $('#upload').click(function() {
      $('#fileInput').click();
    });
    const event = new Event('input');
      slider.dispatchEvent(event);
  });

  /*$(window).on('load', function() {
    // 탭 클릭 이벤트 핸들러 등록
    $('ul.tabs li').click(function() {
      var tab_id = $(this).attr('data-tab');
      $('ul.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');
      $(this).addClass('current');
      $("#" + tab_id).addClass('current');
      $('ul.tabs li').not(this).css({
        color: '#b2b2b2',
        borderBottomColor: 'transparent'
      });
      $(this).css({
        color: '#fff',
        borderBottomColor: '#000000'
      });
    });
  
    // 탭 초기화
    $('ul.tabs li:first-child').addClass('current');
    $('.tab-content:first-child').addClass('current');
  
    // 두번째 탭(tab-2)을 클릭하게끔 설정
    $('ul.tabs li:nth-child(2)').click();
  });*/



  textBt.addEventListener('click', () => {
    if (!isMenuBarOpen) {
      menuBar.style.marginTop = '0';
      isMenuBarOpen = true;
    } else {
      menuBar.style.marginTop = '-160px';
      isMenuBarOpen = false;
    }
  });

  uploadBt.addEventListener('click', () => {
    $('#fileInput').click();
  });

  saveBt.addEventListener('click', () => {
    $('#imgSave').click();
  });


  const colorButtons = document.querySelectorAll('.color-button');
  for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].addEventListener('click', function() {
      nowColor = this.style.backgroundColor;
      ctxB.fillStyle = nowColor;
      colorStart();
    });

  }


let isDragging = false; // 마우스 드래그 상태를 저장하는 변수
let startX, startY; // 이동 시작 위치를 저장하는 변수
let deltaX;
let deltaY;

canvasB.addEventListener('mousedown', function(event) {
  // 마우스 다운 이벤트 등록
  var valuereset = document.getElementById("texts").value;
  if (valuereset != "") {
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
  centerLineX.classList.remove("visible");
  centerLineY.classList.remove("visible");
  } else {
    textPosition.reset();
  }
});

canvasB.addEventListener('mousemove', function(event) {
  // 마우스 무브 이벤트 등록
  if (isDragging) {
    deltaX = event.clientX - startX;
    deltaY = event.clientY - startY;
    startX = event.clientX;
    startY = event.clientY;
    const styleWidth = parseInt(getComputedStyle(canvasB).width);
    const styleHeight = parseInt(getComputedStyle(canvasB).height);
    const xRatio = canvasB.width / styleWidth;
    const yRatio = canvasB.height / styleHeight;

    textPosition.add(deltaX * xRatio, deltaY * yRatio);
    // ctxB.translate(deltaX * canvasB.width / styleWidth, deltaY * canvasB.height / styleHeight);
    // colorStart();
    textPosition.sticky();
  }
});

canvasB.addEventListener('mouseup', function(event) {
  // 마우스 업 이벤트 등록
  isDragging = false;
  centerLineX.classList.remove("visible");
  centerLineY.classList.remove("visible");

  //textPosition.sticky();
});

canvasB.addEventListener('mouseout', function(event) {
  // 마우스 업 이벤트 등록
  isDragging = false;
  centerLineX.classList.remove("visible");
  centerLineY.classList.remove("visible");
});


canvasB.addEventListener('touchstart', function(event) {
  // 터치 다운 이벤트 등록
  var valuereset = document.getElementById("texts").value;
  if (valuereset != "") {
  isDragging = true;
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
  centerLineX.classList.remove("visible");
  centerLineY.classList.remove("visible");
  }
});

canvasB.addEventListener('touchmove', function(event) {
  // 터치 무브 이벤트 등록
  if (isDragging) {
    deltaX = event.touches[0].clientX - startX;
    deltaY = event.touches[0].clientY - startY;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    const styleWidth = parseInt(getComputedStyle(canvasB).width);
    const styleHeight = parseInt(getComputedStyle(canvasB).height);
    const xRatio = canvasB.width / styleWidth;
    const yRatio = canvasB.height / styleHeight;

    textPosition.add(deltaX * xRatio, deltaY * yRatio);
    textPosition.sticky();
  }
});

canvasB.addEventListener('touchend', function(event) {
  // 터치 업 이벤트 등록
  isDragging = false;
  centerLineX.classList.remove("visible");
  centerLineY.classList.remove("visible");
  //textPosition.sticky();
});

canvasB.addEventListener('touchcancel', function(event) {
  // 터치 취소 이벤트 등록
  isDragging = false;
  centerLineX.classList.remove("visible");
  centerLineY.classList.remove("visible");

  //textPosition.sticky();
});




function resetFirst() {
  var valuereset = document.getElementById("texts").value;
  if (valuereset === "") {
    textPosition.reset();
  } else if(this.value.charAt(0) != "") {
    textPosition.reset();
  }
}




// $("#canvasB").css({
//   top: (windowHeight + (-200)) + "px",
//   height: height + "mm",
//   width: width + "mm",
// }).css("display", "block").animate({
//   top: "0"
// }, 1000); // 0.5초 동안 애니메이션 효과const slider = document.getElementById('control');
const slider = document.getElementById('control');
slider.addEventListener('input', () => {
if (window.matchMedia("(max-width: 960px)").matches) {
  slider.style.width = "100%"
  const value = (slider.value - slider.min) / (slider.max - slider.min);
  const color = `linear-gradient(90deg, #000 0%, #000 ${value * 100}%, #f1f2f2 ${value * 100}%, #f1f2f2 100%)`;
  slider.style.background = color;
} else {
  slider.style.width = "120px";
  slider.style.background = "#000";
}
});


function handleSliderInput() {

if (window.matchMedia("(max-width: 960px)").matches) {
  slider.style.width = "100%"
  const value = (slider.value - slider.min) / (slider.max - slider.min);
  const color = `linear-gradient(90deg, #000 0%, #000 ${value * 100}%, #f1f2f2 ${value * 100}%, #f1f2f2 100%)`;
  slider.style.background = color;
} else {
  slider.style.width = "120px";
  slider.style.background = "#000";
}
}

// 초기 실행
handleSliderInput();

// 리사이즈 이벤트 리스너 등록
window.addEventListener('resize', handleSliderInput);