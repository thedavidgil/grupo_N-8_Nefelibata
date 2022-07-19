window.addEventListener('load', function() {

    let avatar = document.getElementById('avatar');
    let chosenImage = document.getElementById('chosen-image');
    let imageName = document.getElementById('image-name');

    avatar.onchange = () => {
        let reader = new FileReader();
        reader.readAsDataURL(avatar.files[0]);
        console.log(avatar.files[0]);
        reader.onload = () => {
            chosenImage.setAttribute("src", reader.result);
        }
        imageName.textContent = avatar.files[0].name;
    }
});

window.addEventListener('load', function() {

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
});