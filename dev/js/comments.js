'use strict';

let comments = [], //создаем массив для новых комментариев
    comment = {
        name: 'No Name',
        text: 'No Text',
        time: 0,
        ip: 0,
        online: false
    };

let data = { 'defaultComments':[ //JSON обьект для дефолтных комментариев
    {
        'name':'John Stone',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...',
        'time': '07/31/2017',
        'ip': '172.10.56.3',
        'img': 'images/johnstoneavatar.png',
        'online': true
    },
    {
        'name':'Anna Anderson',
        'text': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'time': '08/01/2017',
        'ip': '172.10.56.3',
        'img': 'images/annaavatar.png',
        'online': false
    }
]};

let pullDefaultComments = (data) => {
    for (let i in data.defaultComments){
        let commentUserRepost = $('<div>', {'class': 'info2__comment-user', 'data-time':moment(data.defaultComments[i].time).format('DD/MM/YYYY')}),
            commentUserHeader = $('<div>', {'class': 'info2__comment-user-header'}).appendTo(commentUserRepost),
            commentUserHeaderInfo = $('<div>', {'class': 'info2__comment-user-header-info'}).appendTo(commentUserHeader),
            commentUserAvatar = $('<div>', {
                'class': 'info2__comment-user-avatar'
            }).appendTo(commentUserHeaderInfo),
            commentUserAvatarImg = $('<img>',{'src': data.defaultComments[i].img}).appendTo(commentUserAvatar),
            commentUserIP = $('<p>', { 'class': 'info2__comment-user-ip',
                html: '<span>IP:</span>' + data.defaultComments[i].ip
            }).appendTo(commentUserHeader),
            commentUserReporst = $('<button>',{'class': 'info2__comment-user-repost'}).appendTo(commentUserHeader),
            commentUserName = $('<div>', {'class': 'info2__comment-user-name'}).appendTo(commentUserHeaderInfo),
            commentUserNameP = $('<p>', {html: data.defaultComments[i].name}).appendTo(commentUserName),
            commentUserNameTime = $('<time>', {html: moment(data.defaultComments[i].time,'MM/DD/YYYY').fromNow()}).appendTo(commentUserName),
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
};

let createNewComment = (commentText, commentName, commentTime) => {
    let commentUserRepost = $('<div>', {'class': 'info2__comment-user--repost', 'data-time':moment(commentTime).format('DD/MM/YYYY')}),
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
};

let toLocalStorage = (comments) => { //преобразуем наш массив в JSON и отправляем в Local Storage
    let commentsJSON = JSON.stringify(comments);
    localStorage.setItem('userComments',commentsJSON);
};

let fromLocalStorage = (comments) => { //берем данные из UserComments в Local Storage
    let temp = JSON.parse(localStorage.getItem('userComments'));
    if (temp !== null){
        for (let i=0; i<temp.length; i++){
            let newComment = Object.create(comment);
            newComment.name = temp[i]['name'];
            newComment.text = temp[i]['text'];
            newComment.time = temp[i]['time'];
            comments.push(newComment);
            createNewComment(newComment.text,newComment.name,moment(newComment.time));
        }
    }
};

let replyTo = () => { //обработчик на reply to кнопку возле старого коммента
    $('.info2__comment-user-repost').on('click',function () {
        let name = $(this).parent().find('.info2__comment-user-name p').text();
        $('#formText').text('@'+ name +': ');
    });
};

let commentFormClear = () => { //обработчик по очистке полей формы после ввода
    $('#formName').val('');
    $('#formText').val('');
};

let hideOldComments = () => { //обработчик скрытия старых комментов (больше 1 дня)
    let allComments = $('.info2__comment-user,.info2__comment-user--repost');

    for (let i=0; i<allComments.length; i++){
        let daysDiff = moment().diff(moment(allComments[i].dataset.time, 'DD/MM/YYYY'), 'days');
        if(daysDiff > 0){
           $(allComments[i]).hide();
        }
    }
};

$(document).ready(function () { // main

    pullDefaultComments(data);
    fromLocalStorage(comments);

    $('#check').change(function() {
        if (this.checked) {
           hideOldComments();
        } else {
            $('.info2__comment-body').empty();
            pullDefaultComments(data);
            fromLocalStorage(comments);
            replyTo();
        }
    });

    replyTo();

    $("form[name='Comment']").submit(function (e) {
        e.preventDefault();

        let newComment = Object.create(comment);

        newComment.name = $('#formName').val();
        newComment.text = $('#formText').val();
        newComment.time = moment();
        newComment.online = true;

        comments.push(newComment);

        createNewComment(newComment.text,newComment.name,newComment.time);

        toLocalStorage(comments);

        commentFormClear();

    });
});