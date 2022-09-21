function redirect(type){
    switch (type){   
        case "login":
            document.getElementById['redirection'].innerHTML = "login";
            case "new_user":
            document.getElementById['redirection'].innerHTML = "register";
    }
}