class ImageCalculator {
    
    static addition(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let sumArray = [];

        let maxValue = image_one.data[0] + image_two.data[0];
        let minValue = maxValue;

        for (let i = 0; i < image_one.data.length;i++) {
            sumArray[i] = image_one.data[i] + image_two.data[i];
            
            if (sumArray[i] > maxValue) {
                maxValue = sumArray[i];
            }

            if (sumArray[i] < minValue) {
                minValue = sumArray[i];
            }

        }

        finalImageData = normalizeValues(sumArray, finalImageData, maxValue, minValue);
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static additionByConstantValue(img_one, constantValue) {
        let image_one = getImageData(img_one);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);

        for (let i = 0; i < image_one.data.length;i++) {
            let addedValue = image_one.data[i] + constantValue;
            finalImageData.data[i] = truncateValues(addedValue);
        }
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }
    
    static subtraction(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let subtArray = [];

        let maxValue = image_one.data[0] - image_two.data[0];
        let minValue = maxValue;

        for (let i = 0; i < image_one.data.length;i++) {
            subtArray[i] = image_one.data[i] - image_two.data[i];
            
            if (subtArray[i] > maxValue) {
                maxValue = subtArray[i];
            }

            if (subtArray[i] < minValue) {
                minValue = subtArray[i];
            }

        }

        finalImageData = normalizeValues(subtArray, finalImageData, maxValue, minValue);
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static subtractionByConstantValue(img_one, constantValue) {
        let image_one = getImageData(img_one);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);

        for (let i = 0; i < image_one.data.length;i++) {
            let subtValue = image_one.data[i] - constantValue;
            finalImageData.data[i] = resolveUnderflow(subtValue);
        }
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static multiplication(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let multArray = [];

        let maxValue = image_one.data[0] * image_two.data[0];
        let minValue = maxValue;

        for (let i = 0; i < image_one.data.length;i++) {
            multArray[i] = image_one.data[i] * image_two.data[i];
            
            if (multArray[i] > maxValue) {
                maxValue = multArray[i];
            }

            if (multArray[i] < minValue) {
                minValue = multArray[i];
            }

        }

        finalImageData = normalizeValues(multArray, finalImageData, maxValue, minValue);
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static multiplicationByConstantValue(img_one, constantValue) {
        let image_one = getImageData(img_one);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let increaseBy = parseFloat((constantValue / 100).toFixed(2))

        for (let i = 0; i < image_one.data.length; i++) {
            let multPixel = Math.round(image_one.data[i] + Math.round(image_one.data[i] * increaseBy));
            finalImageData.data[i] = truncateValues(multPixel);
        }
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }
    
    static division(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);

        for (let i = 0; i < image_one.data.length;i++) {
            let divededValue = 0;
            if (image_two.data[i] != 0) {
                divededValue = Math.round(image_one.data[i] / image_two.data[i]);
            } else {
                divededValue = image_one.data[i];
            }
            finalImageData[i] = divededValue;
        }
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static divisionByConstantValue(img_one, constantValue) {
        let image_one = getImageData(img_one);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);

        for (let i = 0; i < image_one.data.length; i++) {
            finalImageData.data[i] = Math.round(image_one.data[i] / constantValue);
        }
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static concatenar(img1, img2, imgWidth) {
        let img_one = getImageData(img1);
        let img_two = getImageData(img2);

        const [lineSeparated1, lineSeparated2] = [
            separateMatrixIntoLines(img_one.data, imgWidth), 
            separateMatrixIntoLines(img_two.data, imgWidth)
        ];
        const concat = lineSeparated1.map((line, idx) => [...line, ...lineSeparated2[idx]]);

        let concatResult = flatten(concat);

        return matrixToImage(concatResult, img1.width * 2, img1.height);
    }

    static average(img_one, img_two) {
        calculator.addition(img_one, img_two);
    }

    static blending(img_one, img_two, k) {
        k = k / 100;
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);

        for (let i = 0; i < image_one.data.length;i++) {
            finalImageData.data[i] = k * image_one.data[i] + (1 - k) * image_two.data[i]; 
        }
        
        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }       

    static not(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let pixelMultiplied = (image_one.data[pixelsLenght]) + (image_two.data[pixelsLenght]);
            finalImageData.data[pixelsLenght] = 255 - resolveOverflow(pixelMultiplied);
        }

        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }
    
    static or(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let pixelMultiplied = (image_one.data[pixelsLenght]) | (image_two.data[pixelsLenght]);
            finalImageData.data[pixelsLenght] = pixelMultiplied;
        }

        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static and(img_one, img_two) {
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_one.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let pixelMultiplied = (image_one.data[pixelsLenght]) & (image_two.data[pixelsLenght]);
            finalImageData.data[pixelsLenght] = pixelMultiplied;
        }

        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static xor(img_one, img_two){
        let image_one = getImageData(img_one);
        let image_two = getImageData(img_two);

        let finalImageData = ImageCalculator.createImage(img_one.width, img_two.height);
        let pixelsLenght = image_one.data.length;

        while(pixelsLenght--){
            let pixelMultiplied = (image_one.data[pixelsLenght]) ^ (image_two.data[pixelsLenght] * 0.3);
            finalImageData.data[pixelsLenght] = resolveOverflow(pixelMultiplied);
        }

        let finalImage = imageDataToImage(finalImageData);

        return finalImage;
    }

    static createImage(width, height) {
        let image_temp = new Image();
        image_temp.width = width;
        image_temp.height = height;

        return getImageData(image_temp);
    }
}
