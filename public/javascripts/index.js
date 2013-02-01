function DropCtrl($scope, $http) {

    var onUploadSuccess = function(data) {
        var url = window.location.origin +
            window.location.pathname +
            'images/' + data.img,
            md = '!['+data.img+']('+url+')';

        $scope.md = md;
        $scope.url = url;
    };

    var onUploadError = function() {
        console.error('ERROR', arguments);
    };

    var uploadImage = function(img, type, callback) {
        var data = {img: img, type: type};

        $http.post('/upload', data)
            .success(onUploadSuccess).error(onUploadError);
    };

    var getImgType = function(img) {
        var type = 'data:image/',
            types = ['jpeg', 'jpg', 'gif', 'png'];

        for (var i = 0, l = types.length; i < l; i++) {
            if (img.indexOf(type + types[i]) === 0) {
                return types[i];
            }
        }

        return false;
    };

    var handleReaderLoad = function(e) {
        var img = e.target.result,
            type = getImgType(img);

        if (type) uploadImage(img, type);
    };

    var handleFiles = function(files) {
        var file = files[0],
            reader = new FileReader();

        reader.onload = handleReaderLoad;
        reader.readAsDataURL(file);
    };

    var onDrop = function(e) {
        stopEvent(e);

        var files = e.dataTransfer.files,
            count = files.length;
     
        if (count) handleFiles(files);
    };

    var stopEvent = function(e) {
        e.stopPropagation();
        e.preventDefault();
    };

    window.onload = function() {
        var dropzone = document.getElementById('dropzone');

        dropzone.addEventListener('dragenter', stopEvent, false);
        dropzone.addEventListener('dragexit', stopEvent, false);
        dropzone.addEventListener('dragover', stopEvent, false);
        dropzone.addEventListener('drop', onDrop, false);
    };

};
