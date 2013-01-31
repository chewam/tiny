function DropCtrl($scope, $http) {
    // console.log('DropCtrl', $http);

    var uploadImage = function(img, type, callback) {
        console.log('uploadImage');

        var data = {
            img: img,
            type: type
        };

        $http.post('/upload', data)
            .success(function(data, status, headers, config) {
                console.log('success', data.hash);
                // $scope.data = data;
            }).error(function(data, status, headers, config) {
                console.log('error', arguments);
                // $scope.status = status;
            });
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

        console.log('handleReaderLoad'/*, img*/, type);
        if (type) uploadImage(img, type);
    };

    var handleFiles = function(files) {
        var file = files[0],
            reader = new FileReader();

        console.log('handleFiles', arguments);
        reader.onload = handleReaderLoad;
        reader.readAsDataURL(file);
    };

    var onDrop = function(e) {
        stopEvent(e);

        var files = e.dataTransfer.files,
            count = files.length;
     
        console.log('handleFiles', arguments, files);
        if (count) handleFiles(files);
    };

    var stopEvent = function(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log('stopEvent');
    };

    window.onload = function() {
        var dropzone = document.getElementById('dropzone');

        console.log('load', dropzone);
        dropzone.addEventListener('dragenter', stopEvent, false);
        dropzone.addEventListener('dragexit', stopEvent, false);
        dropzone.addEventListener('dragover', stopEvent, false);
        dropzone.addEventListener('drop', onDrop, false);
    };

};
