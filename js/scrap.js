//読み込む画像を指定など
var inputimg = document.querySelector('#file');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = canvas.height = 0;

//画像読み込み
inputimg.addEventListener('change', function() {
  var file = this.files[0];
  var image = new Image();
  var reader = new FileReader();
  if (file.type.match(/image.*/)) {
    reader.onloadend = function() {
      //画像を読み込んだあとの処理
      image.onload = function() {
        var w = image.width;
        var h = image.height;
        var x = 0;  //左上の頂点x座標
        var y = 0;  //左上の頂点y座標
        canvas.width = w;
        canvas.height = h;
        //ラジオボタン判定
        for(var i=0; i<document.form.radio.length;i++){
          if(document.form.radio[i].checked){
            if (document.form.radio[i].value == "ios") {//iOS icon
              var c = 0.234375;//iOS係数
              var r　= w*c;  //角丸の半径
              ctx.beginPath();
              drawsq();
            } else if(document.form.radio[i].value == "ron"){//Rounded corners
              var r　= document.getElementById('radius').value;  //角丸の半径
              if (r == "") {
                alert('Please enter the radius of the rounded corners.')
              } else {
                ctx.beginPath();
                drawsq();
              }
            } else if(document.form.radio[i].value == "cir"){//circle
              ctx.beginPath();
              if (h > w) {
                ctx.arc(w/2, h/2, w/2, 0*Math.PI/180, 360*Math.PI/180)
              } else {
                ctx.arc(w/2, h/2, h/2, 0*Math.PI/180, 360*Math.PI/180)
              }
            }
          }
        }
        ctx.clip();
        ctx.drawImage(this, 0, 0, w, h);
        function drawsq() {
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.moveTo(x,y + r);
          ctx.arc(x+r,y+h-r,r,Math.PI,Math.PI*0.5,true);
          ctx.arc(x+w-r,y+h-r,r,Math.PI*0.5,0,1);
          ctx.arc(x+w-r,y+r,r,0,Math.PI*1.5,1);
          ctx.arc(x+r,y+r,r,Math.PI*1.5,Math.PI,1);
          ctx.closePath();
        }
        var dl = document.getElementById('download');
        dl.classList.remove('hidden');
      }
      image.src = reader.result;
    }
    reader.readAsDataURL(file);
  }
}, false);

$('#button').on('click', function(){
  $('#file').click();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

$('#download').on('click', function(){
  var link = document.getElementById('link');
  link.href = canvas.toDataURL('image/png');
  link.download = 'image.png';
  link.click();
});

$('#clear').on('click', function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  $('#download').addClass('hidden');
});
