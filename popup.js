document.addEventListener('DOMContentLoaded', function () {
    loadAWS();
    document.getElementById('uploadButton').addEventListener('click', uploadFile);
});

function loadAWS() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('aws-sdk-2.1002.0.min.js');
    script.onload = function () {
        console.log('AWS SDK loaded');
        AWS.config.update({
            accessKeyId: '',
            secretAccessKey: '',
            region: ''
        });
    };
    document.head.appendChild(script);
}

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        console.error('No file selected');
        return;
    }
    const fileName = file.name
    readFile(file, fileName);
}

function readFile(file, fileName) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const fileData = event.target.result;
        uploadToS3(fileData, fileName);
    };
    reader.readAsArrayBuffer(file);
}

async function uploadToS3(fileData, fileName) {
    const s3 = new AWS.S3();
    console.log(fileName);
    const params = {
        Bucket: '',
        Key: fileName,
        Body: fileData
    };

    try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded successfully. S3 Location:', data.Location);
    } catch (error) {
        console.error('Error uploading to S3:', error);
    }
}
