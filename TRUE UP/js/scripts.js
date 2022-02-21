let firstRunDone = false;

let allowedJobs = {
    "Oracle": [
        {
            "Title": [
                "A/P Associate",
                "Accounts Payable Lead",
                "A/P Assist Manager",
                "Admin Assistant S",
                "ATF Compliance Auditor",
                "Compliance Systems Mgr",
                "Controller",
                "Retail Systems Manager",
                "Manager FP&A",
                "Store Manager",
                "Office Manager S",
                "PIM Admin",
                "Tax Manager",
                "Category Mgr Fishing",
                "Category Mgr Footwear",
                "IT Compliance Program Mgr",
                "Demand Planning Mgr",
                "Sr Oracle Dvplr",
                "Sr Demand Planning Mgr",
                "Category Mgr Camp/Gift",
                "Help Desk Technician",
                "Tier 1 IT Support Spec",
                "IT Support Manager",
                "Chief HR Officer",
                "HR Manager",
                "HR Clerk H",
                "HR Generalist",
                "Merchant",
                "ECommerce Merchant",
                "Payroll Lead",
                "Payroll Manager",
                "Payroll Specialist",
                "PIM Administrator",
                "PIM Supervisor",
                "Pricing/Promotion Analyst",
                "Problem Resolution Asso",
                "Replenishment Analyst",
                "Senior Accountant ",
                "Sr Corp Investigator",
                "Sr. Solution Architect",
                "Staff Accountant H",
                "Tax & Treasury Analyst",
                "Used Gun Manager ",
                "Vendor Mgmt Analyst"
            ]
            
        }
    ]
}

function firstRun() {
    document.write(`
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="trueUp.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html">JSON Converter</a>
                    </li>
                </ul>
                <h1 class="text-center">Hasselhoff's .csv to JSON Converter</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
            <form id="myForm">
                <input type="file" id="csvFile" accept=".csv" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">    
                <input class="btn btn-lg btn-primary" id="submit" type="submit" value="Submit" />    
            </div>
            </form>
            <div class="col-md-4">    
                <a href="trueUp.html" class="btn btn-lg btn-primary" id="submit" type="submit" value="True Up">True Up</a>    
            </div> 
        </div>
    </div>
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/scripts.js"></script>
    `);
    function csvToArray(str, delimiter = ",") {
    
        //Make sure there are no spaces in the header names
        let headerStr = str.split(" ").join("");
        
        // slice from start of text to the first \n index
        // use split to create an array from string by delimiter
        let headersTMP = headerStr.slice(0, str.indexOf("\n"));
        const headers = headersTMP.substring(0, headersTMP.length - 3).split(delimiter);

        // slice from \n index + 1 to the end of the text
        // use split to create an array of each csv value row
        let rows = str.slice(str.indexOf("\n") + 1).split("\n");

        // Map the rows
        // split values from each row into an array
        // use headers.reduce to create an object
        // object properties derived from headers:values
        // the object passed as an element of the array
        const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
        });

        // return the array
        return arr;
    }

    myForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const input = csvFile.files[0];
        const reader = new FileReader();
  
        reader.onload = function (e) {
          const text = e.target.result;
          const data = csvToArray(text);
          //document.write(JSON.stringify(data));
          let json = JSON.stringify(data);
          console.log(json);
          
          //download the file to downloads folder
          let link = document.createElement('a');
          link.download = 'json.txt';
          let blob = new Blob([json], {type: "application/json"});
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        };
        reader.readAsText(input);
        
    });
    firstRunDone = true;
}

// function secondRun() {
//     document.write(`
//     <div class="container-fluid">
//         <div class="row">
//             <div class="col-md-12">
//                 <h1 class="text-center">
//                     True Up Program
//                 </h1>
//             </div>
//         </div>
//         <form id = 'myForm'>
//             <div class="row">
//                 <div class="col-md-12">
//                     <!--<div class="dropdown">
                        
//                         <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
//                             Please Choose...
//                         </button>
//                         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                             <option value = "Oracle" selected>Oracle True-Up</option>
//                             <option value = "iPayables">Trail-Guide True-Up</option>
//                         </div>
//                     </div>-->
//                 </div>
//             </div>
//             <div class="row">
//                 <div class="col-md-6">
//                     <h4>Employee Form</h4>
//                     <input type="file" id="JSONFile1" accept=".txt" />
//                 </div>
//                 <div class="col-md-6">
//                     <h4>Account Form</h4>
//                     <input type="file" id="JSONFile2" accept=".txt" />
//                 </div>
//             </div>
//             <div class="row">
//                 <div class="col-md-12">
//                     <input id='submit' type="submit" class="btn btn-lg btn-primary"></input>
//                     <!--<div class="progress">
//                             <div class="progress-bar w-75 progress-bar-striped">
//                             </div>
//                         </div>-->
//             </div>
//         </div>
//         </form> 
//         <div class="row">
//             <div class="col-md-6">
//                 <div id = 'titleOfList'></div>
//                 <div id = 'reactive'>    
//                     <div id = 'list'></div>
//                 </div>
//                 <table class="table"></table>
//                 <!--<table class="table">
//                     <thead>
//                         <tr>
//                             <th>
//                                 #
//                             </th>
//                             <th>
//                                 Product
//                             </th>
//                             <th>
//                                 Payment Taken
//                             </th>
//                             <th>
//                                 Status
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>
//                                 1
//                             </td>
//                             <td>
//                                 TB - Monthly
//                             </td>
//                             <td>
//                                 01/04/2012
//                             </td>
//                             <td>
//                                 Default
//                             </td>
//                         </tr>
//                         <tr class="table-active">
//                             <td>
//                                 1
//                             </td>
//                             <td>
//                                 TB - Monthly
//                             </td>
//                             <td>
//                                 01/04/2012
//                             </td>
//                             <td>
//                                 Approved
//                             </td>
//                         </tr>
//                         <tr class="table-success">
//                             <td>
//                                 2
//                             </td>
//                             <td>
//                                 TB - Monthly
//                             </td>
//                             <td>
//                                 02/04/2012
//                             </td>
//                             <td>
//                                 Declined
//                             </td>
//                         </tr>
//                         <tr class="table-warning">
//                             <td>
//                                 3
//                             </td>
//                             <td>
//                                 TB - Monthly
//                             </td>
//                             <td>
//                                 03/04/2012
//                             </td>
//                             <td>
//                                 Pending
//                             </td>
//                         </tr>
//                         <tr class="table-danger">
//                             <td>
//                                 4
//                             </td>
//                             <td>
//                                 TB - Monthly
//                             </td>
//                             <td>
//                                 04/04/2012
//                             </td>
//                             <td>
//                                 Call in to confirm
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>-->
//             </div>
//             <div class="col-md-6" id='parentExplanation'>
//                 <p id = 'explanation' class='text-danger'></p>
//             </div>
//         </div>
//     </div>
//     <script src="js/jquery.min.js"></script>
//     <script src="js/bootstrap.min.js"></script>
//     <script src="js/scripts.js"></script>
//     `);
    


//     //This will standardize the case of each name. 
//     function standardName(str) {
//         if ((typeof str) == 'string') {
//             str = str.toLowerCase();
//             str = str.split();
//             str = str[0].charAt(0).toUpperCase() + str[0].slice(1);
//             return str;
//         }
//         else if ((typeof str == 'object')) {
//             str = str.toString();
//             str = str.toLowerCase();
//             str = str.split();
//             str = str[0].charAt(0).toUpperCase() + str[0].slice(1);
//             return str;
//         }

//     }

//     //This Function lists an array in HTML
//     function listString(arr) {
//         if (arr.length != 0) {
//             let title = document.getElementById('titleOfList');
//             title.innerHTML = `<h3>Employees that shouldn't have an active Account:</h3>`;
//             function createLI(listItem) {
//                 let li = document.createElement(`LI`);    
//                 li.innerHTML = listItem;
//                 return li;
//             }
//             let theList = document.getElementById('list');
//             for (let i = 0; i < arr.length; i++) {
//                 theList.appendChild(createLI(arr[i]));
//             }
//             let explanation = document.getElementById('explanation');
//             explanation.innerHTML = `These people may not have first names. This is because they are not listed in the Account Active Employee List with First Names. <br>
//                                     All of these accounts ought to be de-activated since they are no longer employed here. <br>
//                                     (Their name could also just not be spelled correctly in the Account List. If this is the case please fix the spelling.)`;
//         }
//         else {
//             let div = getElementByID('titleOfList');
//             div.innerHTML = `<h1>Current Account List is Accurate!</h1>`;
//         }
//     }

//     //replaceAt() method
//     String.prototype.replaceAt = function(index, replacement) {
//         if (index >= this.length) {
//             return this.valueOf();
//         }

//         return this.substring(0, index) + replacement + this.substring(index + 1);
//     }

//     //Removing double appostrophes
//     function removeAppos(str) {
//         for (let i = 0; i < str.length; i++) {
//             if ((str.charAt(i) == `"` && str.charAt(i+1) == `"`) && (str.charAt(i+2) != `:` && str.charAt(i+2) != `,` && str.charAt(i+2) != `}`)) {
//                 str = str.replaceAt(i, "");    
//             }
//         }
//         return str;
//     }



//     //comparing function
//     function compare(json1, json2) {
//         //make sure strings are in correct format
//         json1 = json1.replaceAll(`\r`, "");
//         json1 = json1.replaceAll(`\n`, "");
//         json1 = json1.replaceAll(`,"":""`, "");
//         json1 = json1.replaceAll(`,"AA":""`, "");
//         json1 = removeAppos(json1);

//         json2 = json2.replaceAll(`\r`, "");
//         json2 = json2.replaceAll(`\n`, "");
//         json2 = json2.replaceAll(`,"":""`, "");
//         json2 = json2.replaceAll(`,"AA":""`, "");
//         json2 = removeAppos(json2);
        
//         let array1 = new String(json1);
//         let array2 = new String(json2);

//         let obj1 = JSON.parse(array1);
//         let obj2 = JSON.parse(array2);

//         //standardize the case on the last names
//         for (let c = 0; c < obj2.length; c++) {
//             obj2[c].LastName = standardName(obj2[c].LastName);
//         }

//         let badPeople = [];
//         let nonEmployee = [];
//         for (let i = 0; i < obj2.length; i++) {
//             //Look at first and Last name in oracle list (obj2)
//             let tmpFirst = obj2[i].FirstName;
//             let tmpLast = obj2[i].LastName;
//             let alreadyDone = false;
            
//             for (let x = 0; x < badPeople.length; x++){
//                 if (!alreadyDone) {
//                     if (tmpFirst != badPeople[x].FirstName && tmpLast != badPeople [x]) {
//                         alreadyDone = false;
//                     }
//                     else {
//                         alreadyDone = true;
//                     }
//                 }
//             }

//             if(tmpFirst == "") {
//                 if (!alreadyDone) {
//                     // Find that Last Name in the employee List
//                     let isEmployed = false;
//                     for (let a = 0; a < obj1.length; a++) {
//                         if (!isEmployed) {
//                             if (obj1[a].LastName == tmpLast) {
//                                 isEmployed = true;
//                             }
//                         }
//                     }
//                     if (!isEmployed) {
//                         badPeople.push(tmpFirst + " " + tmpLast);
//                     }
//                     // //Find that First and Last name in the Employee list (obj1)
//                     // //See if this entry's job is on the allowed job list above
//                     // let entryNums = null;
//                     // let isGood = false;
//                     // for (let u = 0; u < obj1.length; u++) {
//                     //     if ((obj1[u].FirstName == tmpFirst) && (obj1[u].LastName == tmpLast)) {
//                     //         entryNums = u;
//                     //     }
//                     //     let okayJob = false;
//                     //     for (let y = 0; y < allowedJobs.Oracle[0].Title.length; y++) {
//                     //         //if yes: don't add anything to the bad people array
//                     //         if (entryNums != null) {
//                     //             if (obj1[entryNums].Job == allowedJobs.Oracle[0].Title[y] && !okayJob) {
//                     //                 okayJob = true;
//                     //                 isGood = true;
//                     //             }
//                     //         }
//                     //     }



//                     //     if (!okayJob && entryNums != null) {
//                     //         badPeople.push(obj1[entryNums].FirstName + " " + obj1[entryNums].LastName);
//                     //         isGood = true;
//                     //     }
//                     // }
//                     // if (!isGood) {
//                     //     badPeople.push(tmpFirst + " " + tmpLast);
//                     // }
//                 }
//             }
//             else {
//                 if (!alreadyDone) {
//                     // Find that Last Name in the employee List
//                     let isEmployed = false;
//                     for (let b = 0; b < obj1.length; b++) {
//                         if (!isEmployed) {
//                             if (obj1[b].LastName == tmpLast && obj1[b].FirstName) {
//                                 isEmployed = true;
//                             }
//                         }
//                     }
//                     if (!isEmployed) {
//                         badPeople.push(tmpFirst + " " + tmpLast);
//                     }
//                 }
//             }        
//         }
//         return badPeople; 
//     }

//     let string1 = "";
//     let string2 = "";
//     myForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//         const json1 = document.getElementById("JSONFile1");
//         const json2 = document.getElementById("JSONFile2");
//         const input1 = json1.files[0];
//         const input2 = json2.files[0];
//         const reader1 = new FileReader();
//         const reader2 = new FileReader();
//         reader1.onload = function (e) {
//             string1 = e.target.result;
//             // obj1 = JSON.stringify(obj1);
//             //console.log(obj1);
            
//         };
//         reader1.readAsText(input1);
        
//         reader2.onload = function (e) {
//             string2 = e.target.result;
//             //console.log(obj2);
//         };
//         reader2.readAsText(input2);
//         let list = compare(string1, string2);
//         listString(list);
//     });
// }

// if (!firstRunDone) {
//     firstRun();
// }
// else if (firstRunDone) {
//     secondRun();
// }
firstRun();



