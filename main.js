
addframe = document.querySelector('.add-frame')
vaultframe = document.querySelector('.vault-frame')
newpass= document.querySelector('#new-pass')
loginframe = document.querySelector('.login-frame')
signupframe = document.querySelector('.signup-frame')
// console.log(frame)

function openadd(){
    addframe.style.visibility="visible"
}
function loginclose(){
    parent.loginframe.style.display="none"
}
function signupclose(){
    parent.signupframe.style.display='none'
}
function openlogin(){
    signupclose()
    loginframe.style.display="flex"
}
function opensignup(){
    loginclose()
    signupframe.style.display='flex'
}
function openvault(){
    
    vaultframe.style.visibility='visible'
    vaultframe.contentWindow.location.reload(true);

}

function closeframe() {

    parent.addframe.style.visibility="hidden"
    
}
function closevaultframe() {

    parent.vaultframe.style.visibility="hidden"
}
function submit(){

    
    username =document.getElementsByName("username")[0].value
    password = document.getElementsByName("password")[0].value
    email = document.getElementsByName("email")[0].value
    url = document.getElementsByName("url")[0].value
    if (url===""){
        window.alert("Enter the URL! ")
    }
    console.log(username,password,email,url)

    const details = {
        "username": username,
        "password" : password,
        "email" : email,
        "url" : url
    }

    return details
}
function generate(sliderlength) {
    var length = sliderlength,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    console.log(retVal)
    newpass.innerHTML=retVal
    return retVal;
}

function sliderchange(){
    slider = document.querySelector('.slider').value
    console.log(slider)
    sliderlabel = document.querySelector('#slider-label')
    sliderlabel.innerHTML=slider
    // sliderlabel.style.left+="15px";
    return slider
}