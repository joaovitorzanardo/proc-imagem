const filter = {
    getSelectedDimension: function(){
        var selectDimension = document.getElementsByTagName("select")[0];
        var selectInstance = M.FormSelect.getInstance(selectDimension);

        console.log(selectInstance.input.value.split('x')[0].trim());

        return selectInstance.input.value.split('x')[0].trim();
    },
    createImage: function(width, height) {
        let image_temp = new Image();
        image_temp.width = width;
        image_temp.height = height;

        return getImageData(image_temp);
    },
    negative: function(image) {

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        let imageData = getImageData(image);
      
        let finalImageData = filter.createImage(image.width, image.height);

        for (let i = 0; i < imageData.data.length;i++) {
            finalImageData.data[i] = 255 - imageData.data[i];
        }

        let array = separateMatrixIntoLines(finalImageData.data, image.width);
        array = separateChunkIntoPixels(array);
        const img2 = JSON.parse(JSON.stringify(array));

        for (let i = 0; i < img2.length; i++) {
            if (isPar(img2[i].length)) {
                z = img2[i].length - 1
                for (let j= 0; j < img2[i].length; j++) {
                    let aux = img2[i][j]; 
                    img2[i][j] = img2[i][z];
                    img2[i][z] = aux;
                    z--;
                    if (j == z) break;
                }
            } else {
                z = img2[i].length - 1
                for (let j = 0; j != z; j++, z--) {
                    let aux = img2[i][j]; 
                    img2[i][j] = img2[i][z];
                    img2[i][z] = aux;
                }
            }
        }

        let result = flattenV2(img2)

        const imageResult = matrixToImage(result, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    flipR: function(image) {

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        let imageData = getImageData(image);
        
        let array = separateMatrixIntoLines(imageData.data, image.width);
        array = separateChunkIntoPixels(array);
        const img2 = JSON.parse(JSON.stringify(array));

        for (let i = 0; i < img2.length; i++) {
            if (isPar(img2[i].length)) {
                z = img2[i].length - 1
                for (let j= 0; j < img2[i].length; j++) {
                    let aux = img2[i][j]; 
                    img2[i][j] = img2[i][z];
                    img2[i][z] = aux;
                    z--;
                    if (j == z) break;
                }
            } else {
                z = img2[i].length - 1
                for (let j = 0; j != z; j++, z--) {
                    let aux = img2[i][j]; 
                    img2[i][j] = img2[i][z];
                    img2[i][z] = aux;
                }
            }
        }

        let result = flattenV2(img2)

        const imageResult = matrixToImage(result, image.width, image.height);

        showResult(imageResult, "display-image-result");
    }, 
    flipD: function(image) {

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const imageData = getImageData(image);
        let array = separateMatrixIntoLines(imageData.data, image.width);
        array = separateChunkIntoPixels(array);
        const img2 = JSON.parse(JSON.stringify(array));

        z = img2.length - 1
        if (isPar(img2.length)) {
            for (let i = 0; i < img2.length; i++) {
                let aux = img2[i]; 
                img2[i] = img2[z];
                img2[z] = aux;
                z--;
                if (i == z) break;
            }
        } else {
            for (let i = 0; i != z; i++, z--) {
                let aux = img2[i];
                img2[i] = img2[z];
                img2[z] = aux;
            }
        }

        let result = flattenV2(img2)

        const imageResult = matrixToImage(result, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    limiar: function(image) {
        
    },
    averageFilter: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = averageFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    minValue: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = minimumFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    maxValue: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = maximumFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    median: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = medianFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    order: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = maximumFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    smoothing: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = smoothingFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    },
    gaussian: function(image) {
        console.log(image);

        if(image === undefined){
            console.log('Image is undefined.');
            return;
        }

        const dimension = this.getSelectedDimension();
        const imageData = getImageData(image);
        const matrixResult = gaussianFilter.apply(imageData.data, image.width, dimension);
        const imageResult = matrixToImage(matrixResult, image.width, image.height);

        showResult(imageResult, "display-image-result");
    }
}

function flipRFunc(array) {
    for (let i = 0; i < array.length; i++) {
        if (isPar(array[i].length)) {
            z = array[i].length - 1
            for (let j= 0; j < array[i].length; j++) {
                let aux = array[i][j]; 
                array[i][j] = array[i][z];
                array[i][z] = aux;
                z--;
                if (j == z) break;
            }
        } else {
            z = array[i].length - 1
            for (let j = 0; j != z; j++, z--) {
                let aux = array[i][j]; 
                array[i][j] = array[i][z];
                array[i][z] = aux;
        }
        }
    }
    return array;
}
  
function isPar(arraySize) {
    return arraySize % 2 == 0;
}