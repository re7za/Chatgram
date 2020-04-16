var message_form = document.getElementById("message_form");
var message_input = document.getElementById("message_input");
var send_icon = document.getElementById('send_icon');
var chatroom_trash_icon = document.getElementById('chatroom_trash_icon');
var chatroom_trash_btn = document.getElementById('chatroom_trash');
var chatroom_trash_btn_delete_text = document.getElementById('chatroom_trash_btn_delete_text');

//////////// text area variables
var text_area = document.getElementById('text_area');
// set the default position of scroll bar to bottom of text_area div
text_area.scrollTop = text_area.scrollHeight;

var messageInput_onfocus = () => {

    message_input.addEventListener('input', updateValue);
    function updateValue(e) {

        // value checking
        if (e.target.value == ""){
            // hide the send_icon
            deActiveTheSendIcon();
        }else {

            // show the send_icon
            activeTheSendIcon();

            // 'rtl' or 'ltr'.. checking the first letter
            val = e.target.value;
            if (isRTL(val[0])){
                // fa
                message_input.style.direction = 'rtl';
            }else {
                // en
                message_input.style.direction = 'ltr';
            }
        }
    }
}
var deActiveTheSendIcon = () => {

    send_icon.style.display = 'none';
    message_input.style.marginRight = '0px';
    message_form.style.gridTemplateColumns = '1fr';

    // set direction to 'ltr' by default
    message_input.style.direction = 'ltr';
}
var activeTheSendIcon = () => {

    message_input.style.marginRight = '10px';
    message_form.style.gridTemplateColumns = '1fr 52px';
    send_icon.style.display = 'inline';
}
// false with 'en'
function isRTL(s){           
    var ltrChars    = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
        rtlChars    = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');

    return rtlDirCheck.test(s);
}

///////////// sending and receiving messages

var addMessageToChatroom = (text, sender) => {
    // create the message div
    let message = `<div class="message ${sender}">`;
    message += `<div class="message_text">${text}</div>`;
    message += `<div class="message_time">12:35</div>`;
    message += `</div>`;

    // add it to chatroom by DOM
    text_area.innerHTML += message;

    // set the default position of scroll bar to bottom of text_area div
    text_area.scrollTop = text_area.scrollHeight;
    
}

// i'm sending message
var sendIcon_onclick = () => {

    text = message_input.value;
    if (text != ''){
        addMessageToChatroom(text, 'me');
    }
    message_input.value = '';
    deActiveTheSendIcon();
}