// contact form validation starts here 
function validate_contact(){
    Event.preventDefault();
    var fullname= document.forms['contactform']['fullname'].value;
    var youremail= document.forms['contactform']['youremail'].value;
    var yourmessage= document.forms['contactform']['yourmessage'].value;
    if(fullname !=="" || youremail !=="" || yourmessage !==""){
        alert("Thank you for contacting us");
    }else{
        alert("please fill the form");
    }
}

// contact validation ends here


//newsletter validation starts here
function validate_newsletter(){
    var email = document.forms["news-form"]["newsltter"].value;
    if(email !==""){
        alert("Thank u for Signing up for Newsletter");
    }
}
//newsletter validation ends here

// typing text starts here
var dis = document.getElementById("typing-text");
var letters=["u","p","c", "o", "m","i", "g", "", "", "", "S", "o", "t", "w", "r", "", "", "", "D", "e", "v", "o", ""];
var num= letters.length;
function word(i){
    dis.innerHTML += letters[i];
}
function type_text(){
    for(let i=0; i<num; i++){
        setTimeout(word, i*300,i);
    }
}
window.onload = type_text;
//typing text ends heres