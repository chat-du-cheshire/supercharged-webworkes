addEventListener('message', (data) => {
    const imageData = data.data;
    const w = imageData.width;
    const h = imageData.height;
    const payload = imageData.data;

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            let index = (x + (y * w)) * 4;
            payload[index + 3] = 127;
        }
    }

    postMessage(imageData, [imageData.data.buffer]);
});
