//display message from the user:
function getValues() {
    let userString = document.getElementById("revString").value;
    let RevString = reverseAString(userString);
    //display Reverse String
    displayData(revString);
}
//LOGIC: (old generate )
function reverseAString(userString) {
    let revString = "",
        //decrimenting for loop
        for (let i = userString.length - 1; i >= 0; i--) {
            revString += userString[index];

            return revString;

        }
}
//Display back to DOM
function displayData(revString) {
    document.getElementById("msg").innerHTML = `Your string is: ${revString}`;

    document.getElementById("alert").classList.remove('invisible');
    document.getElementById("alert").classList.remove("d-none");

}