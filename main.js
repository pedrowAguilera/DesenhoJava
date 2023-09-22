// Pego o ID canvas no HTML
let canvas = document.getElementById("canvas")
// Pegamos o contexto do desenho, esse é o metodo que retorna o tipo da animação, usar o parametro "2d" significa que o objeto que será redenrizado será bidimensional
let contexto = canvas.getContext("2d");
// Variavel que vai indentificar se estamos desenhando
let desenhando = false;
let cor = '#000000'
let colorPicker = document.querySelector('#colorPicker');

canvas.addEventListener("mousedown", function(event){
    //Vamos usar o metodo addEventListener para ouvir nosso mouse, ele irá identiicar quando clicarmos
    desenhando = true;
    contexto.beginPath()
    //a variavel contexto junto com o metodo beginPath() indica que algo novo será criado
    contexto.moveTo(event.clientX - canvas. offsetLeft, event.clientY - canvas.offsetTop);
    // nesse metodo, vamos dizer como o contexto irá funcionar, o clientX vai fornecer as cordenadas horizontais do mouse e o offsetLeft irá converter esse valor em pixel(px), a mesma coisa acontece com o clientY na vertical.
})

canvas.addEventListener("mousemove", function(event){
    if(desenhando) {
        contexto.strokeStyle = cor;
        //esse if vai identificar se estamos clicando enquanto movemos o mouse
        contexto.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        //o lineTo vai juntar as cordenadas e identificar a linha que estamos traçando enquanto clicamos e movemos o mouse
        contexto.stroke();
        //traça a linha 
    }
})

canvas.addEventListener("mouseup", function(event){
    //essa função identifica quando não estamos mais clicando no mouse
    desenhando = false;
})

colorPicker.addEventListener('change', () => {
    cor = colorPicker.value;
});

// a partir daqui não saiu da minha cuca
let fillButton = document.querySelector('#fillButton');
let imageData;

fillButton.addEventListener('click', () => {
    fillButton.style.cursor = 'crosshair';
});

function preencherArea(x, y) {
    
    contexto.save();
    
    
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    let tempContext = tempCanvas.getContext('2d');
    
    
    tempContext.drawImage(canvas, 0, 0);
    
    
    let pixel = tempContext.getImageData(x, y, 1, 1).data;
    
    
    function coresIguais(c1, c2) {
        return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && c1[3] === c2[3];
    }
    
    
    function preencher(x, y) {
        if (x < 0 || x >= tempCanvas.width || y < 0 || y >= tempCanvas.height) {
            return;
        }

        let pixelAtual = tempContext.getImageData(x, y, 1, 1).data;
        if (!coresIguais(pixelAtual, pixel) || coresIguais(pixelAtual, contexto.strokeStyle)) {
            return;
        }

        tempContext.fillStyle = cor;
        tempContext.fillRect(x, y, 1, 1);


        preencher(x + 1, y);
        preencher(x - 1, y);
        preencher(x, y + 1);
        preencher(x, y - 1);
    }

    preencher(x, y);


    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.drawImage(tempCanvas, 0, 0);


    contexto.restore();
}