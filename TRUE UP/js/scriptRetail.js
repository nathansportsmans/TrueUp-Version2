//Exports list as a csv that the user can open up in excel
function obj1ToCSV(obj) {
    let names = "";

    //Take care of headers
    names = names.concat("UserName,Name\n");

    //Take care of rows
    for (let i = 0; i < obj["Employees"].Name.length; i++) {
        names = names.concat(obj["Employees"].UserName[i] + "," + obj["Employees"].Name[i] + `\n`);
    }
    return names;
}
function obj2ToCSV(obj) {
    let names = "";

    //Take care of headers
    names = names.concat("UserName,Name,UltiPro ID (That they should have)\n");

    //Take care of rows
    for (let i = 0; i < obj["notHaveUltipro"].Name.length; i++) {
        names = names.concat(obj["notHaveUltipro"].UserName[i] + "," + obj["notHaveUltipro"].Name[i] + obj["notHaveUltipro"].CorrectID[i]`\n`);
    }
    return names;
}


//Lists the people who shouldn't have accounts in a table. 
function createTable(userArr, nameArr) {
    function createTableCell(str) {
        let cell = document.createElement('td');
        cell.innerHTML = str;
        return cell;
    }
    let title = document.getElementById('titleOfTable');
    title.innerHTML = `<h3>Employees that shouldn't have an active Account:</h3>`;
    let table = document.getElementById('table1');
    let leftTitle = createTableCell("Username");
    let rightTitle = createTableCell("Name");
    let tHead = document.createElement('THEAD');
    let firstRow = document.createElement('TR');
    tHead.appendChild(firstRow);
    firstRow.appendChild(leftTitle);
    firstRow.appendChild(rightTitle);
    firstRow.style.fontWeight = 'bold';
    firstRow.style.fontSize = "xx-large";
    table.appendChild(firstRow);
    let tBody = document.createElement('TBODY');
    for (let i = 0; i < userArr.length; i++) {
        let row = document.createElement('TR');
        row.appendChild(createTableCell(nameArr[i]));
        row.appendChild(createTableCell(userArr[i]));
        tBody.appendChild(row);
    }    
    table.appendChild(tBody);
}

//lists the people who do not have ultipro ID's in a table
function createTable2(userArr, nameArr, IDArr) {
    function createTableCell(str) {
        let cell = document.createElement('td');
        cell.innerHTML = str;
        return cell;
    }
    let title = document.getElementById('titleOfUltiTable');
    title.innerHTML = `<h3>Employees that don't have an ultipro ID:</h3>`;
    let table = document.getElementById('table2');
    let leftTitle = createTableCell("Username");
    let midTitle = createTableCell("Name");
    let rightTitle = createTableCell("ID to Add");
    let tHead = document.createElement('THEAD');
    let firstRow = document.createElement('TR');
    tHead.appendChild(firstRow);
    firstRow.appendChild(leftTitle);
    firstRow.appendChild(midTitle);
    firstRow.appendChild(rightTitle);
    firstRow.style.fontWeight = 'bold';
    firstRow.style.fontSize = "xx-large";
    table.appendChild(firstRow);
    let tBody = document.createElement('TBODY');
    for (let i = 0; i < userArr.length; i++) {
        let row = document.createElement('TR');
        row.appendChild(createTableCell(nameArr[i]));
        row.appendChild(createTableCell(userArr[i]));
        row.appendChild(createTableCell(IDArr[i]));
        tBody.appendChild(row);
    }    
    table.appendChild(tBody);
}



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


    //console.log(obj2);

    //standardize the case on the last names (redundant)
    // for (let c = 0; c < obj2.length; c++) {
    //     obj2[c].LastName = standardName(obj2[c].LastName);
    // }

    let badPeople = {"Employees":{"Name":[],"UserName":[]},"notHaveUltipro":{"Name":[],"UserName":[],"CorrectID":[]}}; 
    //let nonEmployee = [];
    for (let i = 0; i < obj2.length; i++) {
        //Look at first and Last name in oracle list (obj2)
        let tmpFirst = standardName(obj2[i].FIRST_NAME);
        let tmpLast = standardName(obj2[i].LAST_NAME);
        let tmpUser = obj2[i].USER_NAME;
        let alreadyDone = false;

        //Find those who don't have UltiProID's
        if (obj2[i].UltiProID == "\r") {
            
            // for (let d = 0; d < obj1.length; d++) {

            // }
        }
        for (let x = 0; x < badPeople["Employees"].length; x++){
            if (!alreadyDone) {
                if (tmpFirst != badPeople["Employees"][x].FirstName && tmpLast != badPeople["Employees"][x]) {
                    alreadyDone = false;
                }
                else {
                    alreadyDone = true;
                }
            }
        }
        if (tmpFirst == "") {
            if (!alreadyDone) {
                // Find that Last Name in the employee List
                let isEmployed = false;
                for (let a = 0; a < obj1.length; a++) {
                    if (!isEmployed) {
                        if (standardName(obj1[a].LastName) == tmpLast) {
                            isEmployed = true;
                            if (obj2[i].UltiProID == "\r" && obj1[a].LastName != "") {
                                badPeople["notHaveUltipro"].Name.push(tmpFirst + " " + tmpLast);
                                badPeople["notHaveUltipro"].UserName.push(tmpUser);
                                badPeople["notHaveUltipro"].CorrectID.push(obj1[a].EmployeeNumber);
                            }
                            // else if(obj2[i].UltiProID == "\r" && obj1[a].LastName == "") {
                            //     badPeople["notHaveUltipro"].Name.push(tmpFirst + " " + tmpLast);
                            //     badPeople["notHaveUltipro"].UserName.push(tmpUser);
                            // }
                        } 
                    }
                }
                if (!isEmployed) {
                    badPeople["Employees"].Name.push(tmpFirst + " " + tmpLast);
                    badPeople["Employees"].UserName.push(tmpUser);
                }
            }
        }
         
        else if (tmpFirst != "") {
            if (!alreadyDone) {
                // Find that Last Name in the employee List
                let isEmployed = false;
                for (let b = 0; b < obj1.length; b++) {
                    if (!isEmployed) {
                        if (standardName(obj1[b].LastName) == tmpLast && standardName(obj1[b].FirstName) == tmpFirst) {
                            isEmployed = true;
                            if (obj2[i].UltiProID == "\r" && obj1[b].LastName != "" && obj1[b].FirstName != "") {
                                badPeople["notHaveUltipro"].Name.push(tmpFirst + " " + tmpLast);
                                badPeople["notHaveUltipro"].UserName.push(tmpUser);
                                badPeople["notHaveUltipro"].CorrectID.push(obj1[b].EmployeeNumber);
                            }
                            // else if(obj2[i].UltiProID == "\r" && obj1[b].LastName == "" && obj1[b].FirstName == "") {
                            //     badPeople["notHaveUltipro"].Name.push(tmpFirst + " " + tmpLast);
                            //     badPeople["notHaveUltipro"].UserName.push(tmpUser);
                            // }
                        }
                    }
                }
                if (!isEmployed) {
                    badPeople["Employees"].Name.push(tmpFirst + " " + tmpLast);
                    badPeople["Employees"].UserName.push(tmpUser);
                }
            }
        }          
    }
    return badPeople; 
}


let string1 = "";
let string2 = "";
let employeeObject = {};
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
    employeeObject = compare(string1, string2);
//     listString(employeeObject["Employees"]);
//     listString2(employeeObject["notHaveUltipro"]);
    createTable(employeeObject["Employees"].Name,  employeeObject["Employees"].UserName);
    createTable2(employeeObject["notHaveUltipro"].Name, employeeObject["notHaveUltipro"].UserName, employeeObject["notHaveUltipro"].CorrectID);
});
document.getElementById('button').addEventListener("click", function(obj) {
    let names = obj1ToCSV(employeeObject)
    let link = document.createElement('a');
    link.download = 'badAccounts_Retail.csv';
    let blob = new Blob([[names]], {type: "application/json"});
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);

    let names2 = obj2ToCSV(employeeObject)
    let link2 = document.createElement('a');
    link2.download = 'UltiproID_Retail.csv';
    let blob2 = new Blob([[names2]], {type: "application/json"});
    link.href = URL.createObjectURL(blob2);
    link.click();
    URL.revokeObjectURL(link.href);
});


