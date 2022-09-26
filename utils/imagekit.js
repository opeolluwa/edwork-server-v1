Seeconst ImageKit = require("imagekit");
const fs = require('fs');

const imagekit = new ImageKit({
    privateKey: "p=",
    urlEndpoint: "", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
    publicKey: "p=", // op
});

const authenticationParameters = imagekit.getAuthenticationParameters();
console.log(authenticationParameters);
