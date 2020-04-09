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


var is_chatroom_trash_btn_active = false;

var messageInput_onfocus = () => {

    // is trash_btn is active?
    if (is_chatroom_trash_btn_active == true){
        
        chatroom_trash_onclick();
    }

    message_input.addEventListener('input', updateValue);
    function updateValue(e) {

        // value checking
        if (e.target.value == ""){
            // hide the send_icon
            send_icon.style.display = 'none';
            chatroom_trash_btn.style.display = 'grid';
            message_input.style.marginRight = "0px";
            message_input.style.marginLeft = "10px";
            message_form.style.transition = '0ms';
            message_form.style.gridTemplateColumns = "53px 1fr";

            // set direction to 'ltr' by default
            message_input.style.direction = 'ltr';
        }else {
            // show the send_icon
            chatroom_trash_btn.style.display = 'none';
            message_form.style.transition = '0ms';
            message_input.style.marginRight = '10px';
            message_input.style.marginLeft = '0px';
            message_form.style.gridTemplateColumns = '1fr 52px';
            send_icon.style.display = 'inline';

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

// false with 'en'
function isRTL(s){           
    var ltrChars    = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
        rtlChars    = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');

    return rtlDirCheck.test(s);
};

////////////////// chatroom_trash
var chatroom_trash_onclick = () => {

    // close the users trash btn
    if (is_user_trash_btn_active === true){

        is_user_trash_btn_active = false;
        deActiveTheUsersTrash();
    }
    
    if (is_chatroom_trash_btn_active === false){

        is_chatroom_trash_btn_active = true;
        activeTheMessageTrash();
    }else {

        is_chatroom_trash_btn_active = false;
        deActiveTheMessageTrash();
    }
}
///// show and hide the trash btn
var activeTheMessageTrash = () => {

    chatroom_trash_icon.style.display = 'none';
    message_form.style.transitionDuration = '200ms';
    message_form.style.gridTemplateColumns = '30% 1fr';
    
    // create the texts
    chatroom_trash_btn.style.justifyContent = 'right';
    chatroom_trash_btn_delete_text.style.display = 'inline';
    chatroom_trash_btn_delete_text.innerHTML = 'delete';
    message_input.value = 'cancel';
}
var deActiveTheMessageTrash = () => {

    chatroom_trash_icon.style.display = 'inline';
    message_form.style.gridTemplateColumns = '52px 1fr';

    // clean the texts
    chatroom_trash_btn.style.justifyContent = 'center';
    chatroom_trash_btn_delete_text.style.display = 'none';
    chatroom_trash_btn_delete_text.innerHTML = '';
    message_input.value = '';
}