var state_of_music=1;
var state_of_theme=0;
var signal=-1;
var goal=10;
var cur=0;
var daddishlist=["je","te","se","ce","če","maščin","leporokč","sjadvimaščin","thinkč","kup","man","kapital","konharmonёšost","malcik","darokč"];
var englishlist=["I","you","he","this","that","machine","to get","car","drink","group","man","capital","republic","boy","to give"];
var sze=englishlist.length-1;
var cor=0;
var getwa=[];
var record="";
function playsoundac(){
    var aud= new Audio("http://downsc.chinaz.net/Files/DownLoad/sound1/202009/13386.mp3");
    aud.play();
}
function playsoundwa(){
    var aud= new Audio("http://img.51miz.com/preview/sound/00/27/08/51miz-S270861-E115EEF5.mp3");
    aud.play();
}
function change(){
    var sleep=function(time){
    var startTime=new Date().getTime()+parseInt(time,10);
    while(new Date().getTime()<startTime){}
    };
    sleep(10);
    document.getElementById("box").style.display="none";
    document.getElementById("page-aft").style.display="";
    document.getElementById("clk").style.display="none";
}
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function checkCookie() {
  var user=getCookie("username");
  if (user != "") {
    record=user;
    alert("Successfully Loaded");
  } else {
     user = prompt("Name:","");
     if (user != "" && user != null) {
       setCookie("username", user, 1000);
     }
  }
}
function NewCheck(){
    var user=getCookie("username");
    if(user!="")return 1;
    else return 0;
}
function loadprocess(){
    checkCookie();
}
function ShowMemorize(){
    document.getElementById("page-aft").style.display="none";
    document.getElementById("MemorizeWords").style.display="";
}
function ShowReview(){
    document.getElementById("page-aft").style.display="none";
    document.getElementById("Review").style.display="";
}
function addupwords(newword){
    var user=getCookie("username");
    user=user+","+newword;
    setCookie("username", user, 1000);
}
function setnumber(num){
    goal=num;
    document.getElementById("MemorizeWords").style.display="none";
    document.getElementById("mainmem").style.display="";
    start1();
}
function getrand(upsize){
    return parseInt(Math.random() * upsize + 1);
}
function start1(){
    var i=1;
    cur+=1;
    if(cur>goal){
        signal=-1;
        return 0;
    }
    document.getElementById("showprocess").innerHTML=cur+"/"+goal;
    var randseed=getrand(sze);
    randseed-=1;
    var typ=getrand(2);
    if(typ==1){
        document.getElementById("question").innerHTML=daddishlist[randseed];
        document.getElementById("ans1").innerHTML=englishlist[getrand(sze)-1];
        document.getElementById("ans2").innerHTML=englishlist[getrand(sze)-1];
        document.getElementById("ans3").innerHTML=englishlist[getrand(sze)-1];
        document.getElementById("ans4").innerHTML=englishlist[getrand(sze)-1];
        document.getElementById("ans"+getrand(4)).innerHTML=englishlist[randseed];
    }
    else if(typ==2){
        document.getElementById("question").innerHTML=englishlist[randseed];
        document.getElementById("ans1").innerHTML=daddishlist[getrand(sze)-1];
        document.getElementById("ans2").innerHTML=daddishlist[getrand(sze)-1];
        document.getElementById("ans3").innerHTML=daddishlist[getrand(sze)-1];
        document.getElementById("ans4").innerHTML=daddishlist[getrand(sze)-1];
        document.getElementById("ans"+getrand(4)).innerHTML=daddishlist[randseed];
    }
    signal=randseed;
    return randseed;
}
function ShowCorrect(){
    // document.getElementById("mainmem").style.display="none";
    // document.getElementById("correctpart").style.display="";
    if(state_of_music==1) playsoundac();
    window.alert("Good Job!");
    cor+=1;
    
    // var sleep=function(time){
//       var startTime=new Date().getTime()+parseInt(time,10);
//           while(new Date().getTime()<startTime){}
    // };
    // sleep(2000);
    // document.getElementById("mainmem").style.display="";
    // document.getElementById("correctpart").style.display="none";
    start1();
}
function ShowFinal(){
    document.getElementById("mainmem").style.display="none";
    document.getElementById("Final").style.display="";
    document.getElementById("finalshow").innerHTML="You answered "+cor+"/"+goal+" correctly!"
}
function ShowWrong(){
    if(state_of_music==1) playsoundwa();
    window.alert("Oops!\n"+englishlist[signal]+" : "+daddishlist[signal]);
    getwa.push(englishlist[signal]+" : "+daddishlist[signal]);
    var user=getCookie("username");
    user=user+","+signal;
    setCookie("username", user, 1000);
    
    start1();
}
function checkanswer(statement){
    //var signal=start1();
    if(signal==-1){
        ShowFinal();
        return;
    }
    if(englishlist[signal]==document.getElementById("ans"+statement).innerHTML||daddishlist[signal]==document.getElementById("ans"+statement).innerHTML) ShowCorrect();
    else{
        ShowWrong();
    }
    return;
}
function showwas(){
    document.getElementById("was").style.display="";
    var tmpfor=0;
    var mylen=getwa.length;
    for(;tmpfor<mylen;tmpfor++){
        document.getElementById("was").innerHTML+="<center style=\"color: #4361ee;font-size: 15px;\">"+getwa[tmpfor]+"</center><br/>";
    }
    if(mylen==0) document.getElementById("was").innerHTML="<br/><center style=\"color: #4361ee;font-size: 15px;\">Congratulations! You don't have wrong answers!</center>";
}
function refresh_page(){
    location.reload();
}
function inputset(){
    var nnn=window.prompt("Input a number 1~99:");
    while(nnn<=0||nnn>=100){
        nnn=window.prompt("Invalid input! Please retry:");
    }
    setnumber(nnn);
}
function ShowVerb(){
    document.getElementById("page-aft").style.display="none";
    document.getElementById("verb").style.display="";
}
var lstofwas=[];
function splitcookieintovars(){
    var tcookie=getCookie("username");
    var i=0;
    var tmparr="";
    for(;i<=tcookie.length;i++){
        if(i==0) continue;
        if(tcookie[i]==','&&tcookie[i-1]>='0'&&tcookie[i-1]<='9'){
            lstofwas.push(tmparr);
            tmparr="";
        }
        else if(tcookie[i]>='0'&&tcookie[i]<='9'){
            tmparr=tmparr+tcookie[i];
        }
    }
    lstofwas.push(tmparr);
    tmparr="";
    i=0;
    var j=0;
    for(i=0;i<lstofwas.length;i++)
        for(j=i+1;j<lstofwas.length;j++)
            if(lstofwas[i]==lstofwas[j])
                lstofwas.splice(j,1);
}
var currentrev=0;
function toobad(){
    window.alert(englishlist[lstofwas[currentrev]]+" : "+daddishlist[lstofwas[currentrev]]);
    currentrev++;
    start2();
}
function welldone(){
    currentrev++;
    start2();
}
function startanotherrev(){
    document.getElementById("mainrev").style.display="none";
    document.getElementById("another").style.display="";    
}
function start2(){
    document.getElementById("Review").style.display="none";
    document.getElementById("mainrev").style.display="";
    splitcookieintovars();
    if(lstofwas.length<1){
        window.alert("You don't have mistakes!");
        refresh_page();
        return;
    }
    if(currentrev>=lstofwas.length){
        startanotherrev();
        return;
    }
    document.getElementById("revq").innerHTML=daddishlist[lstofwas[currentrev]];
}
var huhu=0;
function show_review_final(){
    document.getElementById("another").style.display="none";
    document.getElementById("review_final").style.display="";
}
function bianli(fst){
    for(var i=1;i<=4;i++){
        if(englishlist[lstofwas[fst]]==document.getElementById("hahaha"+i).innerHTML) return 0;
    }
    return 1;
}
function review_check(fst,scd,obj,flg){
    if(englishlist[lstofwas[fst]]==englishlist[scd]||(flg==1&&bianli(fst)==1)){
        obj.style.color="green";
        obj.disabled="disabled";
        huhu+=1;
        if(huhu==lstofwas.length-1) show_review_final();
    }
    else{
        obj.style.color="red";
        window.alert("Oops! Try Again!");
    }
}
var where_in_lstofwas=0;
function start_output_statement(){
    if(lstofwas.length<where_in_lstofwas) show_review_final();
    document.getElementById("contained_question").innerHTML=daddishlist[lstofwas[where_in_lstofwas]];
    if(daddishlist[lstofwas[where_in_lstofwas]]==undefined) show_review_final();
    document.getElementById("contained_ans1").innerHTML=englishlist[getrand(sze)-1];
    document.getElementById("contained_ans2").innerHTML=englishlist[getrand(sze)-1];
    document.getElementById("contained_ans3").innerHTML=englishlist[getrand(sze)-1];
    document.getElementById("contained_ans4").innerHTML=englishlist[getrand(sze)-1];
    document.getElementById("contained_ans"+getrand(4)).innerHTML=englishlist[lstofwas[where_in_lstofwas]];
}
function containedcheckanswer(pointer){
    if(document.getElementById("contained_ans"+pointer).innerHTML==englishlist[lstofwas[where_in_lstofwas]]){
        window.alert("Good Job!");
        where_in_lstofwas+=1;
        start_output_statement();
    }
    else{
        window.alert("Try Again!");
        start_output_statement();
    }
}
function makeanother(){
    document.getElementById("button_in_another").style.display="none";
    document.getElementById("contained").style.display="";
    start_output_statement();
}
function initprocess(){
    setCookie("username","",1000);
    checkCookie();
}
function gotomainsite(){
    top.location="https://daddish.vercel.app";
}
function settingsshow(){
    document.getElementById("clk").style.display="none";
    document.getElementById("settings").style.display="";
}
function muzyku(obj){
    state_of_music=state_of_music^1;
    if(state_of_music==1) obj.innerHTML="Sound: On";
    else obj.innerHTML="Sound: Off";
}
function gotoclk(){
    document.getElementById("clk").style.display="";
    document.getElementById("settings").style.display="none";
}
function changetheme(){
    state_of_theme=state_of_theme^1;
    if(state_of_theme==0){document.getElementById("body").style.background="white";document.getElementById("box").style.background="white";document.getElementsByClassName("chars")[0].style.color="#000";document.getElementsByClassName("chars")[1].style.color="#000";document.getElementsByClassName("chars")[2].style.color="#000";document.getElementsByClassName("chars")[3].style.color="#000";document.getElementsByClassName("chars")[4].style.color="#000";document.getElementsByClassName("chars")[5].style.color="#000";document.getElementsByClassName("chars")[6].style.color="#000";}
    else{document.getElementById("body").style.background="#000";document.getElementById("box").style.background="#000";document.getElementsByClassName("chars")[0].style.color="white";document.getElementsByClassName("chars")[1].style.color="white";document.getElementsByClassName("chars")[2].style.color="white";document.getElementsByClassName("chars")[3].style.color="white";document.getElementsByClassName("chars")[4].style.color="white";document.getElementsByClassName("chars")[5].style.color="white";document.getElementsByClassName("chars")[6].style.color="white";}
}