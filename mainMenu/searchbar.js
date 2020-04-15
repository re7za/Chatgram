var search_icon = document.getElementById("search_icon");
var add_contact_btn = document.getElementById('add_contact');
var users_tool_bar = document.getElementById('users_toolbar');
var search_input = document.getElementById("search_input");
var search_bar = document.getElementById('search_bar');


var searchIcon_onclick = () => {

    search_input.value = "";
    search_icon.src = "icon/search.png";

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

    search_input.addEventListener('input', auto_direction);
}
////////////// searching
function auto_direction(e) {
    if (e.target.value == ""){
        
        // display everyone
        displayFoundUsers(e.target.value);
        
        search_icon.src = "icon/search.png";

        // set direction to 'ltr' by default
        search_input.style.direction = 'ltr';
    }else {

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

// add contact btn
class Contact {
    constructor(name) {
        this.contactName = name;
        this.lastPM = '32';
    }
    updateLastPM() {
        
        this.lastPM_time = new Date();
        let date_str = `${this.lastPM_time.getFullYear()} ${this.lastPM_time.getMonth()} ${this.lastPM_time.getDate()}`;
        let time_str = `${this.lastPM_time.getHours()} ${this.lastPM_time.getMinutes()} ${this.lastPM_time.getSeconds()}`;
        this.lastPM_time_str = date_str + ' : ' + time_str;
    }
    
}
var add_contact_onclick = () => {
    

}