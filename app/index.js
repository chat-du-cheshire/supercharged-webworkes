const input = document.getElementById('input');
const preview = document.getElementById('preview');
const previewCtr = preview.getContext('2d');
const worker = new Worker('worker.js');

worker.addEventListener('message', data => {
    const imageData = data.data;
    previewCtr.putImageData(imageData, 0, 0);
});

function applyFilter(image) {
    const imageData = previewCtr.getImageData(0, 0, preview.width, preview.height);
    worker.postMessage(imageData, [imageData.data.buffer]);
}

input.addEventListener('change', (e) => {
    const file = e.target.files[0];

    createImageBitmap(file).then((bitmap) => {
        preview.width = bitmap.width;
        preview.height = bitmap.height;
        previewCtr.drawImage(bitmap, 0, 0);
        applyFilter(bitmap)
    })
});

