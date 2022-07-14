let counter = 1;
setInterval(function(){
    document.getElementById('radio' + counter).checked = true; counter++;
    if(counter > 4){
        counter = 1;
    }
}, 5000);

let image = document.getElementById('image');
let chosenImage = document.getElementById('chosen-image');
let imageName = document.getElementById('image-name');

image.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(image.files[0]);
    console.log(image.files[0]);
    reader.onload = () => {
        chosenImage.setAttribute('src',reader.result);
    }
    imageName.textContent = image.files[0].name;
}