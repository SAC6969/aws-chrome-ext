async function uploadToS3(fileData) {
    AWS.config.update({
        accessKeyId: '',
        secretAccessKey: '',
        region: ''
    });

    const s3 = new AWS.S3();

    const params = {
        Bucket: '',
        Key: '',
        Body: fileData
    };

    try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded successfully. S3 Location:', data.Location);
    } catch (error) {
        console.error('Error uploading to S3:', error);
    }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'uploadFileToS3') {
        const fileData = message.fileData;
        console.log("fileData");
        uploadToS3(fileData);
    }
});
