'use strict';

$(document).ready(function () {

    var comments = [],
        defaultComment = {
            name: 'No Name',
            text: 'No Text',
            time: 0,
            ip: 0
        };

    function toLocalStorage(comments) {
        var commentsJSON = JSON.stringify(comments);
        localStorage.setItem('userComments',commentsJSON);
    }

    function fromLocalStorage(comments) {
        var temp = JSON.parse(localStorage.getItem('userComments'));
        for (var i=0; i<temp.length; i++){
            var newComment = Object.create(defaultComment);
            newComment.name = temp[i]['name'];
            newComment.text = temp[i]['text'];
            newComment.time = temp[i]['time'];
            comments.push(newComment);
            //createTask(temp[i]['content'],tasks.length - 1,temp[i]['isDone']);
        }
    }

    function createComment(commentText, commentName, commentTime) {
        var commentUserRepost = $('<div>', {'class': 'info2__comment-user--repost'}),
            commentUserHeader = $('<div>', {'class': 'info2__comment-user-header'}).appendTo(commentUserRepost),
            commentUserHeaderInfo = $('<div>', {'class': 'info2__comment-user-header-info'}).appendTo(commentUserHeader),
            commentUserAvatar = $('<div>', {
                'class': 'info2__comment-user-avatar',
                html: '<img src = "images/main-user.jpg" alt="Avatar">'
            }).appendTo(commentUserHeaderInfo),
            commentUserIP = $('<p>', { 'class': 'info2__comment-user-ip',
                html: '<span>IP:</span> 192.168.2.120'
            }).appendTo(commentUserHeader),
            commentUserName = $('<div>', {'class': 'info2__comment-user-name'}).appendTo(commentUserHeaderInfo),
            commentUserNameP = $('<p>', {html: commentName}).appendTo(commentUserName),
            commentUserNameTime = $('<time>', {html: commentTime.fromNow()}).appendTo(commentUserName),
            commentUserBody = $('<div>', {'class': 'info2__comment-user-body'}).appendTo(commentUserRepost),
            commentUserBodyStatus = $('<div>', {'class': 'info2__comment-user-status info2__comment-user-status--online'}).appendTo(commentUserBody),
            commentUserBodyP = $('<p>', {
                'class':'info2__comment-user-message',
                html: commentText
            }).appendTo(commentUserBody);


        $(".info2__comment-body").append(commentUserRepost);
    }

    $("form[name='Comment']").submit(function (e) {
        e.preventDefault();
        var userName = $('#formName').val(),
            userComment = $('#formText').val(),
            commentTime = moment();

        createComment(userComment,userName,commentTime);

    });
});