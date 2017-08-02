'use strict';

var comments = [],
    defaultComment = {
        name: 'No Name',
        text: 'No Text',
        time: 0,
        ip: 0
    };

var data = { 'defaultComments':[
    {
        'name':'John Stone',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...',
        'time': '31/07/2017',
        'ip': '172.10.56.3',
        'img': 'images/johnstoneavatar.png',
        'online': true
    },
    {
        'name':'Anna Anderson',
        'text': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'time': '01/08/2017',
        'ip': '172.10.56.3',
        'img': 'images/annaavatar.png',
        'online': false
    }
]};

function pullDefaultComments(data) {
    for (var i in data.defaultComments){
        var commentUserRepost = $('<div>', {'class': 'info2__comment-user'}),
            commentUserHeader = $('<div>', {'class': 'info2__comment-user-header'}).appendTo(commentUserRepost),
            commentUserHeaderInfo = $('<div>', {'class': 'info2__comment-user-header-info'}).appendTo(commentUserHeader),
            commentUserAvatar = $('<div>', {
                'class': 'info2__comment-user-avatar'
            }).appendTo(commentUserHeaderInfo),
            commentUserAvatarImg = $('<img>',{'src': data.defaultComments[i].img}).appendTo(commentUserAvatar),
            commentUserIP = $('<p>', { 'class': 'info2__comment-user-ip',
                html: '<span>IP:</span>' + data.defaultComments[i].ip
            }).appendTo(commentUserHeader),
            commentUserName = $('<div>', {'class': 'info2__comment-user-name'}).appendTo(commentUserHeaderInfo),
            commentUserNameP = $('<p>', {html: data.defaultComments[i].name}).appendTo(commentUserName),
            commentUserNameTime = $('<time>', {html: moment(data.defaultComments[i].time,'DD/MM/YYYY').fromNow()}).appendTo(commentUserName),
            commentUserBody = $('<div>', {'class': 'info2__comment-user-body'}).appendTo(commentUserRepost),
            commentUserBodyStatus = $('<div>').appendTo(commentUserBody),
            commentUserBodyP = $('<p>', {
                'class':'info2__comment-user-message',
                html: data.defaultComments[i].text
            }).appendTo(commentUserBody);

        if (data.defaultComments[i].online) {
             $(commentUserBodyStatus).addClass('info2__comment-user-status info2__comment-user-status--online');
        } else {
            $(commentUserBodyStatus).addClass('info2__comment-user-status info2__comment-user-status');
        }

        $(".info2__comment-body").append(commentUserRepost);
    }
}

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

function createNewComment(commentText, commentName, commentTime) {
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

$(document).ready(function () {

    pullDefaultComments(data);

    $("form[name='Comment']").submit(function (e) {
        e.preventDefault();
        var userName = $('#formName').val(),
            userComment = $('#formText').val(),
            commentTime = moment();

        createNewComment(userComment,userName,commentTime);

    });
});