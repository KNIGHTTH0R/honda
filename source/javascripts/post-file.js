function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    // var bb = new BlobBuilder();
    // bb.append(ab);
    // return bb.getBlob(mimeString);

    var blob = new Blob([ab]);
    return blob;
}

function exportToFacebook() {
    var dataURL = q("#cover-photo").toDataURL('image/jpeg'),
        blob = dataURItoBlob(dataURL),
        // form = document.getElementById("photo-form"),
        fd = new FormData();
    // form.action= "https://graph.facebook.com/"+fbInfo.albumId+"/photos";
    fd.append("source", blob);
    fd.append("access_token", fbInfo.accessToken);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://graph.facebook.com/"+fbInfo.albumId+"/photos");
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4 && xhr.status==200){
            $("#export").hide();
            $("#export-done").css("display","inline-block");
            // location.href="https://kevinshu.com/honda/draw.html";
        }
    }
    xhr.send(fd);
}