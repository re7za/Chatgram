
var chat_room = document.getElementById('chat_room');
var message_form = document.getElementById("message_form");
var message_input = document.getElementById("message_input");
var send_icon = document.getElementById('send_icon');

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

            let text = e.target.value;
            if (text[text.length - 1] == '\n'){
                sendIcon_onclick();
            }           

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

// i'm sending message
var sendIcon_onclick = () => {

    text = message_input.value;
    if (text != ''){

        // time
        let this_moment = new Date();
    
        // print it in chatroom
        addMessageToChatroom('me', text, this_moment);

        // save it in contact.messages array
        for (let i = 0; i < contacts.length; i++){
            if (i == current_contact_index){

                contacts[i].message_pushBack('me', text, this_moment);
                break;
            }
        }
        refresh_contacts_list();
        message_input.value = '';
        deActiveTheSendIcon();
    }
}
var addMessageToChatroom = (sender, text, time) => {

    // create the message div
    let message = `<div class="message ${sender}">`;
    message += `<div class="message_text">${text}</div>`;
    message += `<div class="message_time">${get_time_str(time)}</div>`;
    message += `</div>`;

    // add it to chatroom by DOM
    text_area.innerHTML += message;

    // set the default position of scroll bar to bottom of text_area div
    text_area.scrollTop = text_area.scrollHeight;
}


/////////////////// back to contact list
var back_to_list_btn_onclick = () => {

    if (window.innerWidth <= 860) {

        message_input.value = '';
        
        chat_room.style.display = 'none';
        user_block.style.display = 'flex';
        back_to_list_btn.style.display = 'none';
        //container.style.gridTemplateColumns = '1fr';
    }
}
