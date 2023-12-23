const fs = require("fs");
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}
console.log(fileToGenerativePart("screen1.png", "sda"))