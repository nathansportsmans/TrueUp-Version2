//This will standardize the case of each name. 
function standardName(str) {
    if ((typeof str) == 'string') {
        str = str.replaceAll(" ","");
        str = str.toLowerCase();
        str = str.split();
        str = str[0].charAt(0).toUpperCase() + str[0].slice(1);
        return str;
    }
    else if ((typeof str == 'object')) {
        str = str.toString();
        str = str.toLowerCase();
        str = str.split();
        str = str[0].charAt(0).toUpperCase() + str[0].slice(1);
        return str;
    }
}

//This Function lists an array in HTML
function listString(arr) {
    if (arr.length != 0) {
        let title = document.getElementById('titleOfList');
        title.innerHTML = `<h3>Employees that shouldn't have an active Account:</h3>`;
        function createLI(listItem) {
            let li = document.createElement(`LI`);    
            li.innerHTML = listItem;
            return li;
        }
        let theList = document.getElementById('list');
        for (let i = 0; i < arr.length; i++) {
            theList.appendChild(createLI(arr[i]));
        }
        let explanation = document.getElementById('explanation');
        explanation.innerHTML = `These people may not have first names. This is because they are not listed in the Account Active Employee List with First Names. <br>
                                All of these accounts ought to be de-activated since they are no longer employed here. <br>
                                (Their name could also just not be spelled correctly in the Account List. If this is the case please fix the spelling.)`;
    }
    else {
        let div = getElementByID('titleOfList');
        div.innerHTML = `<h1>Current Account List is Accurate!</h1>`;
    }
}

//replaceAt() method
String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
}

//Removing double appostrophes
function removeAppos(str) {
    for (let i = 0; i < str.length; i++) {
        if ((str.charAt(i) == `"` && str.charAt(i+1) == `"`) && (str.charAt(i+2) != `:` && str.charAt(i+2) != `,` && str.charAt(i+2) != `}`)) {
            str = str.replaceAt(i, "");    
        }
    }
    return str;
}



//comparing function
function compare(json1, json2) {
    //make sure strings are in correct format
    json1 = json1.replaceAll(`\r`, "");
    json1 = json1.replaceAll(`\n`, "");
    json1 = json1.replaceAll(`,"":""`, "");
    json1 = json1.replaceAll(`,"AA":""`, "");
    json1 = removeAppos(json1);

    json2 = json2.replaceAll(`\r`, "");
    json2 = json2.replaceAll(`\n`, "");
    json2 = json2.replaceAll(`,"":""`, "");
    json2 = json2.replaceAll(`,"AA":""`, "");
    json2 = removeAppos(json2);
    
    let array1 = new String(json1);
    let array2 = new String(json2);

    let obj1 = JSON.parse(array1);
    let obj2 = JSON.parse(array2);

    //standardize the case on the last names (redundant)
    // for (let c = 0; c < obj2.length; c++) {
    //     obj2[c].LastName = standardName(obj2[c].LastName);
    // }

    let badPeople = [];
    //let nonEmployee = [];
    for (let i = 0; i < obj2.length; i++) {
        //Look at first and Last name in oracle list (obj2)
        let tmpFirst = standardName(obj2[i].FIRST_NAME);
        let tmpLast = standardName(obj2[i].LAST_NAME);
        let alreadyDone = false;
        
        for (let x = 0; x < badPeople.length; x++){
            if (!alreadyDone) {
                if (tmpFirst != badPeople[x].FirstName && tmpLast != badPeople [x]) {
                    alreadyDone = false;
                }
                else {
                    alreadyDone = true;
                }
            }
        }

        if(tmpFirst == "") {
            if (!alreadyDone) {
                // Find that Last Name in the employee List
                let isEmployed = false;
                for (let a = 0; a < obj1.length; a++) {
                    if (!isEmployed) {
                        if (standardName(obj1[a].LastName) == tmpLast) {
                            isEmployed = true;
                        }
                    }
                }
                if (!isEmployed) {
                    badPeople.push(tmpFirst + " " + tmpLast);
                }
                // //Find that First and Last name in the Employee list (obj1)
                // //See if this entry's job is on the allowed job list above
                // let entryNums = null;
                // let isGood = false;
                // for (let u = 0; u < obj1.length; u++) {
                //     if ((obj1[u].FirstName == tmpFirst) && (obj1[u].LastName == tmpLast)) {
                //         entryNums = u;
                //     }
                //     let okayJob = false;
                //     for (let y = 0; y < allowedJobs.Oracle[0].Title.length; y++) {
                //         //if yes: don't add anything to the bad people array
                //         if (entryNums != null) {
                //             if (obj1[entryNums].Job == allowedJobs.Oracle[0].Title[y] && !okayJob) {
                //                 okayJob = true;
                //                 isGood = true;
                //             }
                //         }
                //     }



                //     if (!okayJob && entryNums != null) {
                //         badPeople.push(obj1[entryNums].FirstName + " " + obj1[entryNums].LastName);
                //         isGood = true;
                //     }
                // }
                // if (!isGood) {
                //     badPeople.push(tmpFirst + " " + tmpLast);
                // }
            }
        }
        else {
            if (!alreadyDone) {
                // Find that Last Name in the employee List
                let isEmployed = false;
                for (let b = 0; b < obj1.length; b++) {
                    if (!isEmployed) {
                        if (standardName(obj1[b].LastName) == tmpLast && standardName(obj1[b].FirstName)) {
                            isEmployed = true;
                        }
                    }
                }
                if (!isEmployed) {
                    badPeople.push(tmpFirst + " " + tmpLast);
                }
            }
        }        
    }
    return badPeople; 
}

let string1 = "";
let string2 = "";
myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const json1 = document.getElementById("JSONFile1");
    const json2 = document.getElementById("JSONFile2");
    const input1 = json1.files[0];
    const input2 = json2.files[0];
    const reader1 = new FileReader();
    const reader2 = new FileReader();
    reader1.onload = function (e) {
        string1 = e.target.result;
        // obj1 = JSON.stringify(obj1);
        //console.log(obj1);
        
    };
    reader1.readAsText(input1);
    
    reader2.onload = function (e) {
        string2 = e.target.result;
        //console.log(obj2);
    };
    reader2.readAsText(input2);
    let list = compare(string1, string2);
    listString(list);
});