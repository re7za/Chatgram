var search_icon = document.getElementById("search_icon");
var user_trash_btn = document.getElementById('users_trash');
var user_trash_icon = document.getElementById('user_trash_icon');
var user_trash_btn_delete_text = document.getElementById('user_trash_btn_delete_text');
var users_tool_bar = document.getElementById('users_toolbar');
var search_input = document.getElementById("search_input");
var search_bar = document.getElementById('search_bar');

var is_user_trash_btn_active = false;

var searchIcon_onclick = () => {

    search_input.value = "";
    search_icon.src = "icon/search.png";

    ////////////// animation
    showTheTrash();

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

    if (is_user_trash_btn_active == true){

        users_trash_onclick();
        return;
    }
    ////////////// searching
    search_input.addEventListener('input', updateValue);
    function updateValue(e) {
        if (e.target.value == ""){

            showTheTrash();
            // display everyone
            displayFoundUsers(e.target.value);

            // set direction to 'ltr' by default
            search_input.style.direction = 'ltr';
        }else {

            hideTheTrash();

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
}

function hideTheTrash() {

    user_trash_btn.style.display = 'none';
    //user_trash_btn.style.justifyContent = 'stretch';
    users_tool_bar.style.gridTemplateColumns = '1fr';
    search_bar.style.marginRight = '0px';

    // changin the search icon
    search_icon.src = 'icon/cancel.png';
}
function showTheTrash() {

    user_trash_btn.style.display = 'grid';
    //user_trash_btn.style.justifyContent = 'center';
    users_tool_bar.style.gridTemplateColumns = '1fr 44px';
    search_bar.style.marginRight= '7px';

    // changin the search icon
    search_icon.src = 'icon/search.png';
    deActiveTheUsersTrash();
}

///// show and hide the trash btn
var users_trash_onclick = () => {

    // close the users trash btn
    if (is_chatroom_trash_btn_active === true){

        is_chatroom_trash_btn_active = false;
        deActiveTheMessageTrash();
    }

    if (is_user_trash_btn_active === false){

        is_user_trash_btn_active = true;
        activeTheUsersTrash();
    }else {

        is_user_trash_btn_active = false;
        deActiveTheUsersTrash();
    }
}
var activeTheUsersTrash = () => {

    user_trash_icon.style.display = 'none';
    users_tool_bar.style.gridTemplateColumns = '1fr 40%';
    users_tool_bar.style.transition = '80ms' 
    user_trash_btn_delete_text.style.display = 'inline';
    user_trash_btn_delete_text.innerHTML = 'delete';
    user_trash_btn.style.justifyContent = 'stretch';

    search_bar.style.gridTemplateColumns = '1fr';
    search_icon.style.display = 'none';
    search_input.value = 'cancel';
    search_input.style.direction = 'rtl';
    search_input.style.paddingRight = '20px'
    
}
var deActiveTheUsersTrash = () => {

    user_trash_icon.style.display = 'inline-block';
    users_tool_bar.style.gridTemplateColumns = '1fr 45px';
    user_trash_btn_delete_text.style.display = 'none';
    user_trash_btn_delete_text.innerHTML = '';
    user_trash_btn.style.justifyContent = 'center';

    search_bar.style.gridTemplateColumns = '35px 1fr';
    search_icon.style.display = 'inline-block';
    search_input.value = '';
    search_input.style.direction = 'ltr';
    search_input.style.paddingRight = '13px'
}