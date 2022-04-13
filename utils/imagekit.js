const ImageKit = require("imagekit");
const fs = require('fs');

const imagekit = new ImageKit({
    privateKey: "private_XfAev+SIN0dmZSo0M2I37YziqCY=",
    urlEndpoint: "https://ik.imagekit.io/nethbooks", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
    publicKey: "public_b3JXmhrMjodPOOdBhSA7ZVmvMp8=", // op
});

const authenticationParameters = imagekit.getAuthenticationParameters();
console.log(authenticationParameters);