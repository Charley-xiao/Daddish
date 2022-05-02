//window.alert("FBI WARNING:\nThe following page may cause confusion, dizziness, and even sudden death. Proceed with extreme caution!");
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}
async function easter_egg(){
    console.clear();
    for(var i=0;;i++){
        console.log("Person "+i+": RUN! WHILE YOU STILL CAN!");
        await sleep(5000);
    }
    await sleep(5000);
    console.clear();
}
easter_egg();