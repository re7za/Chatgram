class Contact {
    constructor(name) {
        this.name = name;
        this.Last_PM_time;
        this.messages = [];
    }
    update_last_PM() {
        this.last_PM_time = new Date();
    }
    get Last_PM_time() {
        return this.last_PM_time;
    }
    get Name() {
        return this.name;
    }
    make_tag() {
        this.tag = `<div class="user" onclick="contact_onclick('${this.name}')"><div class="user_name">${this.name}</div><div class="user_last_message">${get_time_str(this.last_PM_time)}</div></div>`;
    }
    get Tag() {
        return this.tag;
    }
    put_contact_to_user_list(){
        let list = user_list.innerHTML;
        user_list.innerHTML = (this.tag).concat(list);
    }
    get Messages(){
        return this.messages;
    }
    message_pushBack(sender, text, time){
        let message = {
            'sender' : sender,
            'text' : text,
            'time' : time
        };
        
        this.messages.push(message);
        this.last_PM_time = time;
    }
    load_messages(){
        
        for (let i = 0; i < this.messages.length; i++){

            addMessageToChatroom(this.messages[i].sender, this.messages[i].text, this.messages[i].time);
        }
    }

}
// fix time format
var fix_0_in_time = (p) => {
    if (p < 10){
        return '0' + p;
    }else {
        return p;
    }
}
var get_time_str = (time) => {

    let year = fix_0_in_time(time.getFullYear());
    let month = fix_0_in_time(time.getMonth());
    let date = fix_0_in_time(time.getDate());
    let hour = fix_0_in_time(time.getHours());
    let min = fix_0_in_time(time.getMinutes());
    let date_str = `${year}/${month}/${date}`;
    let time_str = `${hour}:${min}`;
    return date_str + ' > ' + time_str;
}

var search_icon = document.getElementById("search_icon");
var users_toolbar = document.getElementById('users_toolbar');
var user_list = document.getElementById('user_list');
var search_input = document.getElementById("search_input");
var search_bar = document.getElementById('search_bar');
var add_contact_btn = document.getElementById('add_contact');
var add_contact_panel = document.getElementById('add_contact_panel');
var chatroom_header_text = document.getElementById('chatroom_header_text');

var searchIcon_onclick = () => {

    search_input.value = "";
    search_icon.src = "icon/search.png";
    // show the add_contact btn
    add_contact_btn.style.display = 'grid';
    search_bar.style.marginRight = '7px';
    users_toolbar.style.gridTemplateColumns = '1fr 45px';

    // set direction to 'ltr' by default
    search_input.style.direction = 'ltr';

    // display all users
    displayAllUsers();
    function displayAllUsers() {
        var users = document.getElementsByClassName("user");
        for (var i = 0; i < users.length; i++){

            users[i].style.display = "grid";
        }        
    }
}
var searchInput_onfocus = () => {

    search_input.addEventListener('input', searchInput_auto_direction);
    ////////////// searching
    function searchInput_auto_direction(e) {
        if (e.target.value == ""){
            
            // show the add_contact btn
            add_contact_btn.style.display = 'grid';
            search_bar.style.marginRight = '7px';
            users_toolbar.style.gridTemplateColumns = '1fr 45px';
            // display everyone
            displayFoundUsers(e.target.value);
            
            search_icon.src = "icon/search.png";

            // set direction to 'ltr' by default
            search_input.style.direction = 'ltr';
        }else {

            // hide the add_contact btn
            add_contact_btn.style.display = 'none';
            search_bar.style.marginRight = '0px';
            users_toolbar.style.gridTemplateColumns = '1fr';

            search_icon.src = "icon/cancel.png";
            // 'rtl' or 'ltr'.. checking the first letter
            val = e.target.value;
            if (isRTL(val[0])){
                // fa
                search_input.style.direction = 'rtl';
            }else {
                // en
                search_input.style.direction = 'ltr';
            }
            // finding the searched user
            displayFoundUsers(e.target.value);
        }
    }
    function displayFoundUsers(searched){

        var users = document.getElementsByClassName("user");
        for (var i = 0; i < users.length; i++){

            var user_name = users[i].querySelector('.user_name');
            users[i].style.display = "grid";
            if (!(user_name.textContent.includes(searched))){
                
                users[i].style.display = "none";
            }
        }
    }
}

////////////////////////////// add contact
var contacts = [];
var current_contact_index;

var add_contact_name_input = document.getElementById('add_contact_name_input');

var add_contact_onclick = () => {
    
    users_toolbar.style.display = 'none';
    add_contact_panel.style.display = 'grid';
    search_input.value = '';
}
var addContactInput_name_onfocus = () => {
    
    // auto direction
    add_contact_name_input.addEventListener('input', add_contact_name_auto_direction);
    function add_contact_name_auto_direction(e) {

        if (e.target.value == ""){
            
            // set direction to 'ltr' by default
            add_contact_name_input.style.direction = 'ltr';
        }else {

            val = e.target.value;
            if (isRTL(val[0])){
                // fa
                add_contact_name_input.style.direction = 'rtl';
            }else {
                // en
                add_contact_name_input.style.direction = 'ltr';
            }
        }
    }

}

var add_contact_btn_onclick = () => {
    
    ///// adding
    let contact_name = add_contact_name_input.value;
    if (contact_name != '') {
        // create a new contact
        let new_contact = new Contact(contact_name);
        new_contact.update_last_PM();
        contacts.push(new_contact);

        contacts[contacts.length - 1].make_tag();
        contacts[contacts.length - 1].put_contact_to_user_list();
    }else {
        return;
    }

    ///// adding was completed
    add_contact_name_input.value = '';
    add_contact_name_input.style.direction = 'ltr';
    add_contact_panel.style.display = 'none';
    users_toolbar.style.display = 'grid';
}
var refresh_contacts_list = () => {
    
    sort_contacts_by_last_PM();

    user_list.innerHTML = '';
    
    for (contact of contacts){
        contact.make_tag();
        contact.put_contact_to_user_list();
    }
}
var sort_contacts_by_last_PM = () => {
    
    for (let i = 0; i < contacts.length; i++){
        for (let j = i; j < contacts.length; j++){
            let time_c_i = contacts[i].Last_PM_time.getTime();
            let time_c_j = contacts[j].Last_PM_time.getTime();
            if (time_c_i > time_c_j){
                [contacts[i], contacts[j]] = [contacts[j], contacts[i]];
            }
        }
    }
}
var contact_onclick = (contact_name) => {
    
    for (let i = 0; i < contacts.length; i++){
        if (contacts[i].Name == contact_name){  
            
            chatroom_header_text.innerHTML = contact_name;
            text_area.innerHTML = '';
            current_contact_index = i;
            contacts[i].load_messages();

            break;
        }
    }
}


