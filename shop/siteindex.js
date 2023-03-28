const canvas = document.getElementById('canvas');
const canvasB = document.getElementById('canvasB');
const imgSaveButton = document.getElementById("imgSave");
canvas.width = 0;
canvas.height = 0;
const ctx = canvas.getContext('2d');
const ctxB = canvasB.getContext('2d');
const fileInput = document.getElementById('fileInput');
let isTextDrawn = false; // 전역 변수, 초기값은 false
var cLive = document.getElementById("colorLive");
let fontF = "GmarketSansMedium";


var nowColor = "#000000";

let textYtop = false;
let textYmid = true;
let textYbot = false;
ctxB.textBaseline = 'middle';

var boxElement = document.getElementById("colorMom");
boxElement.style.display = "none";

var beforeColor; //이전에 선택된 컬러 저장 할 변수

//HTML 로딩이 끝난 후
window.onload = function(){
  init();
}

function init(){
  //2차원 배열 파레트 데이터
  var pallet = [["#FF0000", "#FF5E00", "#FFBB00", "#FFE400", "#ABF200", "#1DDB16", "#00D8FF", "#0054FF", "#0100FF", "#5F00FF", "#FF00DD", "#FF007F", "#000000", "#FFFFFF"],
                ["#FFD8D8", "#FAE0D4", "#FAECC5", "#FAF4C0", "#E4F7BA", "#CEFBC9", "#D4F4FA", "#D9E5FF", "#DAD9FF", "#E8D9FF", "#FFD9FA", "#FFD9EC", "#F6F6F6", "#EAEAEA"],
                ["#FFA7A7", "#FFC19E", "#FFE08C", "#FAED7D", "#CEF279", "#B7F0B1", "#B2EBF4", "#B2CCFF", "#B5B2FF", "#D1B2FF", "#FFB2F5", "#FFB2D9", "#D5D5D5", "#BDBDBD"],
                ["#F15F5F", "#F29661", "#F2CB61", "#E5D85C", "#BCE55C", "#86E57F", "#5CD1E5", "#6799FF", "#6B66FF", "#A566FF", "#F361DC", "#F361A6", "#A6A6A6", "#8C8C8C"],
                ["#CC3D3D", "#CC723D", "#CCA63D", "#C4B73B", "#9FC93C", "#47C83E", "#3DB7CC", "#4374D9", "#4641D9", "#8041D9", "#D941C5", "#D9418C", "#747474", "#5D5D5D"],
                ["#980000", "#993800", "#997000", "#998A00", "#6B9900", "#2F9D27", "#008299", "#003399", "#050099", "#3F0099", "#990085", "#99004C", "#4C4C4C", "#353535"],
                ["#670000", "#662500", "#664B00", "#665C00", "#476600", "#22741C", "#005766", "#002266", "#030066", "#2A0066", "#660058", "#660033", "#212121", "#191919"]];
  var tag = "";
  for(i=0; i<pallet.length; i++){
    for(j=0; j<pallet[i].length; j++){
      tag += "<div id="+pallet[i][j]+" class='colorBox' onclick='colorSet(this)'></div>";
    }
  }
  //파레트 파싱
  document.getElementById("palletBox").innerHTML = tag;

  //색상 입히기
  var colorBox = document.getElementsByClassName("colorBox");
  for(i=0; i<colorBox.length; i++){
    colorBox[i].style.background = colorBox[i].id;
  }

}



// onclick event
function colorSet(target){
  var cLive = document.getElementById("colorLive");
  cLive.style.background = target.id;
  nowColor = target.id;
  colorStart();

  if(beforeColor != undefined && beforeColor != null){
    document.getElementById(beforeColor).className = document.getElementById(beforeColor).className.replace(" active", "");
  }
  document.getElementById(target.id).className += " active";
  beforeColor = target.id;

  // box 요소 숨기기
  var boxElement = document.getElementById("colorMom");
  if (boxElement !== null) {
    boxElement.style.display = "none";
  }
}

const colorOn = document.getElementById("colorOn");
colorOn.addEventListener("click", function() {
  var boxElement = document.getElementById("colorMom");
  if (boxElement !== null) {
    boxElement.style.display = "block";
  }
})




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
    if(textYtop === true) {
      ctxB.fillText(inputText, canvasB.width / 2, 100);
    } else if(textYmid === true) {
      ctxB.fillText(inputText, canvasB.width / 2, canvasB.height / 2);
    } else if(textYbot === true) {
      ctxB.fillText(inputText, canvasB.width / 2, canvasB.height - 100);
    }


  // canvas를 newCanvas에 합치기
  newCtx.drawImage(canvas, 0, 0);

  // canvasB를 newCanvas에 합치기
  newCtx.drawImage(canvasB, 0, 0);

  // newCanvas를 이미지로 변환
  const image = newCanvas.toDataURL('image/png');

  // 링크를 생성하고 이미지를 다운로드 받도록 함
  const link = document.createElement('a');
  link.download = filename;
  link.href = image;
  link.click();
}


function printName()  {
  isTextDrawn = false;
  texttest();
}




const buttonA = document.getElementById("textTop");
buttonA.addEventListener("click", function() {
  isTextDrawn = false;
  textYtop = true;
  textYmid = false;
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
    ctxB.textBaseline = 'top';
    ctxB.fillText(inputText, canvasB.width / 2, 100);
    isTextDrawn = true;
  }
});

const buttonB = document.getElementById("textMid");
buttonB.addEventListener("click", function() {
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
});

const buttonC = document.getElementById("textBot");
buttonC.addEventListener("click", function() {
  isTextDrawn = false;
  textYtop = false;
  textYmid = false;
  textYbot = true;
  ctxB.clearRect(0, 0, canvasB.width, canvasB.height); //캔버스 초기화
  if (!isTextDrawn) {
    const inputText = document.getElementById("texts").value;
    const textWidth = ctxB.measureText(inputText).width; // 텍스트의 폭 계산
    const fontSize = document.getElementById("control").value;
    const fontFamily = fontF;
    ctxB.font = `${fontSize}px ${fontFamily}`;
    ctxB.fillStyle = nowColor;
    ctxB.textAlign = "center";
    ctxB.textBaseline = 'bottom';
    ctxB.fillText(inputText, canvasB.width / 2, canvasB.height - 100);
    isTextDrawn = true;
  }
});

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
});

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
    if(textYtop === true) {
      ctxB.fillText(inputText, canvasB.width / 2, 100);
    } else if(textYmid === true) {
      ctxB.fillText(inputText, canvasB.width / 2, canvasB.height / 2);
    } else if(textYbot === true) {
      ctxB.fillText(inputText, canvasB.width / 2, canvasB.height - 100);
    }
    isTextDrawn = true;
  }
};

function texttest() {
  ctxB.clearRect(0, 0, canvasB.width, canvasB.height); //캔버스 초기화
  if (!isTextDrawn) {
    const inputText = document.getElementById("texts").value;
    const textWidth = ctxB.measureText(inputText).width; // 텍스트의 폭 계산
    const fontSize = document.getElementById("control").value;
    const fontFamily = fontF;
    ctxB.font = `${fontSize}px ${fontFamily}`;
    ctxB.fillStyle = nowColor;
    ctxB.textAlign = "center"; // 중앙 정렬 설정
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
}



imgSaveButton.addEventListener("click", function () {
  const canvas = document.getElementById("canvas");
  downloadCanvas(canvas, "myimage.png");
});

fileInput.addEventListener('change', function () {
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
      ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);


  };
    
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
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
        color: '#000000',
        borderBottomColor: '#000000'
      });
    });
  
    // 첫번째 탭에 포커스를 줍니다
    $('ul.tabs li:first-child').click();
    $(function() {
      $("#shop1").click();
      $(window).resize();
    });
  });

// tab-2를 클릭할 때 실행될 함수
function resetScroll() {
  // 모든 스크롤바를 찾아서 scrollTop 값을 0으로 설정
  var scrollbars = document.querySelectorAll('.tab-content');
  for (var i = 0; i < scrollbars.length; i++) {
    scrollbars[i].scrollTop = 0;
  }
}

// tab-2를 클릭하면 resetScroll 함수 실행
document.querySelector('[data-tab="tab-1"]').addEventListener('click', resetScroll);
document.querySelector('[data-tab="tab-2"]').addEventListener('click', resetScroll);


  const dropdownSelect = document.querySelector('.dropdown-select');
  const dropdownSelected = document.querySelector('.dropdown-selected');
  const dropdownList = document.querySelector('.dropdown-list');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  
  dropdownSelected.addEventListener('click', function() {
    dropdownList.classList.toggle('show');
  });
  
  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      dropdownSelected.textContent = this.textContent;
      dropdownList.classList.remove('show');
    });
  });
  
  document.addEventListener('click', function(e) {
    if (!dropdownSelect.contains(e.target)) {
      dropdownList.classList.remove('show');
    }
  });

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

  


  $(window).resize(function() {
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

    if ($(".dropdown-selected").text() === "포토카드 세로") {
      width = height * 58 / 90;
      g_height = height * 0.96;
      g_width = width* 0.94;
      borderC = 0.7;
      radiusC = 6*radiusM;
    } else if ($(".dropdown-selected").text() === "포토카드 가로") {
      height = $(window).height() * 0.1;
      width = height * 90 / 58;
      g_height = height * 0.94;
      g_width = width* 0.965;
      borderC = 0.7;
      radiusC = 6*radiusM;
    } else if ($(".dropdown-selected").text() === "떡메모지 80*80") {
      width = height * 84 / 84;
      g_height = height * 0.96;
      g_width = width* 0.96;
      borderC = 0.7;
      radiusC = 0;
    } else if ($(".dropdown-selected").text() === "떡메모지 86*95") {
      width = height * 90 / 99;
      g_height = height * 0.96;
      g_width = width* 0.955;
      borderC = 0.7;
      radiusC = 0;
    } else if ($(".dropdown-selected").text() === "떡메모지 90*90") {
      width = height * 94 / 94;
      g_height = height * 0.96;
      g_width = width* 0.96;
      borderC = 0.7;
      radiusC = 0;
    } else if ($(".dropdown-selected").text() === "떡메모지 100*100") {
      width = height * 104 / 104;
      g_height = height * 0.96;
      g_width = width* 0.96;
      borderC = 0.7;
      radiusC = 0;
    } else if ($(".dropdown-selected").text() === "떡메모지 100*140") {
      width = height * 104 / 144;
      g_height = height * 0.96;
      g_width = width* 0.945;
      borderC = 0.7;
      radiusC = 0;
    } else if ($(".dropdown-selected").text() === "마그넷") {
      height = $(window).height() * 0.07;
      width = height * 44 / 44;
      g_height = height * 0.7;
      g_width = width* 0.7;
      borderC = 0.7;
      radiusC = 100;
    } else if ($(".dropdown-selected").text() === "틴케이스 세로") {
      width = height * 58 / 82;
      g_height = height * 0.96;
      g_width = width* 0.95;
      borderC = 0.7;
      radiusC = 6*radiusM;
    } else if ($(".dropdown-selected").text() === "틴케이스 가로") {
      height = $(window).height() * 0.1;
        width = height * 82 / 58;
        g_height = height * 0.94;
        g_width = width* 0.96;
        borderC = 0.7;
        radiusC = 6*radiusM;
    } else if ($(".dropdown-selected").text() === "명함 90*50") {
      height = $(window).height() * 0.1;
        width = height * 90 / 50;
        g_height = height * 0.95;
        g_width = width* 0.975;
        borderC = 0.7;
        radiusC = 0;
    } else if ($(".dropdown-selected").text() === "명함 50*90") {
      width = height * 50 / 90;
      g_height = height * 0.97;
      g_width = width* 0.95;
      borderC = 0.7;
      radiusC = 0;
    } else if ($(".dropdown-selected").text() === "명함 86*52") {
      height = $(window).height() * 0.1;
        width = height * 86 / 52;
        g_height = height * 0.95;
        g_width = width* 0.975;
        borderC = 0.7;
        radiusC = 0;
    } else if ($(".dropdown-selected").text() === "명함 52*86") {
      width = height * 52 / 86;
      g_height = height * 0.97;
      g_width = width* 0.95;
      borderC = 0.7;
      radiusC = 0;
    } else if ($(".dropdown-selected").text() === "스마트톡") {
      height = $(window).height() * 0.07;
      width = height * 38 / 38;
      g_height = height * 0.9;
      g_width = width* 0.9;
      borderC = 0.7;
      radiusC = 100;
    }


    $("#canvas").animate({
      height: height + "mm",
      width: width + "mm"
    }, 500); // 0.5초 동안 애니메이션 효과
  
    $("#canvasBarguide").animate({
      border: borderC + "mm dashed #000000",
      borderRadius: radiusC + "mm",
      height: g_height + "mm",
      width: g_width + "mm"
    }, 500); // 0.5초 동안 애니메이션 효과

    $("#canvasB").animate({
      height: height + "mm",
      width: width + "mm"
    }, 500); // 0.5초 동안 애니메이션 효과
    

    $("#canvas").css("height", height + "mm");
    $("#canvas").css("width", width + "mm");

    $("#canvasBarguide").css("border", borderC + "mm dashed #000000");
    $("#canvasBarguide").css("border-radius", radiusC + "mm");

    $("#canvasBarguide").css("height", g_height + "mm");
    $("#canvasBarguide").css("width", g_width + "mm");

    $("#canvasB").css("height", height + "mm");
    $("#canvasB").css("width", width + "mm");

    document.getElementById('fileInput').value = "";

    context.clearRect(0, 0, canvas.width, canvas.height);

});




  $(document).ready(function() {
    $("#shop1").click(function() {
      $(".dropdown-selected").text("포토카드 세로");
      $(".dropdown-item[data-value='1']").show().text("포토카드 세로").click(function() {
        canvas.width = 58*13;
        canvas.height = 90*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value='2']").show().text("포토카드 가로").click(function() {
        canvas.width = 90*13;
        canvas.height = 58*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value!='1'][data-value!='2']").hide();
      $(".dropdown-item[data-value='1']").trigger('click');
    });
  
    $("#shop2").click(function() {
      $(".dropdown-selected").text("떡메모지 80*80");
      $(".dropdown-item[data-value='3']").show().text("떡메모지 80*80").click(function() {
        canvas.width = 84*13;
        canvas.height = 84*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value='4']").show().text("떡메모지 86*95").click(function() {
        canvas.width = 90*13;
        canvas.height = 99*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value='5']").show().text("떡메모지 90*90").click(function() {
        canvas.width = 94*13;
        canvas.height = 94*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value='6']").show().text("떡메모지 100*100").click(function() {
        canvas.width = 104*13;
        canvas.height = 104*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value='7']").show().text("떡메모지 100*140").click(function() {
        canvas.width = 104*13;
        canvas.height = 144*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value!='3'][data-value!='4'][data-value!='5'][data-value!='6'][data-value!='7']").hide();
      $(".dropdown-item[data-value='3']").trigger('click');
    });

    $("#shop3").click(function() {
      $(".dropdown-selected").text("마그넷");
      $(".dropdown-item[data-value='8']").show().text("마그넷").click(function() {
        canvas.width = 44*13;
        canvas.height = 44*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value!='8']").hide();
      $(".dropdown-item[data-value='8']").trigger('click');
    });

    $("#shop4").click(function() {
      $(".dropdown-selected").text("틴케이스 세로");
      $(".dropdown-item[data-value='9']").show().text("틴케이스 세로").click(function() {
        canvas.width = 58*13;
        canvas.height = 82*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value='10']").show().text("틴케이스 가로").click(function() {
        canvas.width = 82*13;
        canvas.height = 58*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value!='9'][data-value!='10']").hide();
      $(".dropdown-item[data-value='9']").trigger('click');
    });

    $("#shop5").click(function() {
      $(".dropdown-selected").text("명함 90*50");
      $(".dropdown-item[data-value='11']").show().text("명함 90*50").click(function() {
        canvas.width = 90*13;
        canvas.height = 50*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value='12']").show().text("명함 50*90").click(function() {
        canvas.width = 50*13;
        canvas.height = 90*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value='13']").show().text("명함 86*52").click(function() {
        canvas.width = 86*13;
        canvas.height = 52*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value='14']").show().text("명함 52*86").click(function() {
        canvas.width = 52*13;
        canvas.height = 86*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value!='11'][data-value!='12'][data-value!='13'][data-value!='14']").hide();
      $(".dropdown-item[data-value='11']").trigger('click');
    });

    $("#shop6").click(function() {
      $(".dropdown-selected").text("스마트톡");
      $(".dropdown-item[data-value='15']").show().text("스마트톡").click(function() {
        canvas.width = 38*13;
        canvas.height = 38*13;
        canvasB.width = canvas.width;
        canvasB.height = canvas.height;
        $(window).resize();
      });
      $(".dropdown-item[data-value!='15']").hide();
      $(".dropdown-item[data-value='15']").trigger('click');
    });


    $(".dropdown2-selected").text("Gmarket Sans");
      $(".dropdown2-item[data-value='1']").show().text("G마켓 산스").click(function() {
        fontF = $(this).data('font');
        colorStart();
      });
      $(".dropdown2-item[data-value='2']").show().text("롯데리아 촵땡겨체").click(function() {
        fontF = $(this).data('font');
        colorStart();
      });
      $(".dropdown2-item[data-value!='1'][data-value!='2']").hide();
      $(".dropdown2-item[data-value='1']").trigger('click');

  });

  $(document).ready(function() {
    $('#upload').click(function() {
      $('#fileInput').click();
    });
  });
