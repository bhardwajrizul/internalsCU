function main(){
    console.log("\n\n\n");
    let noOfSubjects = document.getElementById("accordion").childElementCount / 2;
    let subElementArr = [];
    for (let i = 0; i < noOfSubjects; i++) {
        subElementArr[i] = getSubElement(i);
    }
    for (let j = 0; j < noOfSubjects; j++) {
        let details = getSubDetails(subElementArr[j]);
        console.log(details.name + " : " + details.internalObtd.toFixed(2) + "/" + details.internalTotal);
    }

    console.log("---------------------------------------------------------------------------------------\n\
DETAILED VIEW GIVEN BELOW,\nCLICK TO EXPAND\nTHEN CLICK ON INTRESTED SUBJECT\
    \n----------------------------------------------------------------------------------------------------");

    let obj = {};
    for (let k = 0; k < noOfSubjects; k++) {
        obj[getSubDetails(subElementArr[k]).name] = getSubDetails(subElementArr[k]);
    }
    console.log(obj);
}



function getSubElement(index) {
    return {
        name : document.getElementById("ui-accordion-accordion-header-"+index).innerText,
        content : document.querySelector("#ui-accordion-accordion-panel-"+index+" "+"table"+" "+"tbody")
    };
}

function getSubDetails(subObj) {
   let worksheet = getPracticalWorksheetInfo(subObj.content);
   let practicalMST = getPracticalMST(subObj.content); 
   let assignment = getAssignment(subObj.content); 
   let ST = getST(subObj.content);
   let quiz = getQuiz(subObj.content);
   let mst = getMST(subObj.content);
   let attnd = getAttendance(subObj.content);

   let internalObtd = worksheet.obtained + practicalMST.obtained + assignment.obtained + ST.obtained + quiz.obtained + mst.obtained + attnd.obtained; 
   let internalTotal = worksheet.total + practicalMST.total + + assignment.total + ST.total + quiz.total + mst.total + attnd.total; 
   return {
       name : subObj.name,
       worksheet : worksheet,
       "practical MST": practicalMST,
       assignment : assignment,
       "surprise test" : ST,
       quiz: quiz,
       mst : mst,
       attendance: attnd,
       internalObtd: internalObtd,
       internalTotal: internalTotal
   }; 
    
}

function getAttendance(subElement) {
    let marksObtd = 0;
    let maxMarks = 0;
    let finalWeightage = 2;
    for (let i = 0; i < subElement.children.length; i++) {
        if (subElement.children[i].children[0].innerText.toLowerCase().match(/attendance/)) {
            maxMarks += parseFloat(subElement.children[i].children[1].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
            marksObtd += parseFloat(subElement.children[i].children[2].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
        }
    }

    return {
        total : finalWeightage,
        obtained : (marksObtd / maxMarks) * finalWeightage
    };
}

function getMST(subElement) {
    let marksObtd = 0;
    let maxMarks = 0;
    let finalWeightage = 20;
    for (let i = 0; i < subElement.children.length; i++) {
        if (subElement.children[i].children[0].innerText.toLowerCase().match("mst-")) {
            maxMarks += parseFloat(subElement.children[i].children[1].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
            marksObtd += parseFloat(subElement.children[i].children[2].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
        }
    }
    return {
        total : finalWeightage,
        obtained : (marksObtd / maxMarks) * finalWeightage
    };
}

function getQuiz(subElement) {
    let marksObtd = 0;
    let maxMarks = 0;
    let finalWeightage = 4;
    for (let i = 0; i < subElement.children.length; i++) {
        if (subElement.children[i].children[0].innerText.toLowerCase().match(/quiz/)) {
            maxMarks += parseFloat(subElement.children[i].children[1].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
            marksObtd += parseFloat(subElement.children[i].children[2].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
        }
    }
    return {
        total : finalWeightage,
        obtained : (marksObtd / maxMarks) * finalWeightage
    };
}

function getST(subElement) {
    let marksObtd = 0;
    let maxMarks = 0;
    let finalWeightage = 4;
    for (let i = 0; i < subElement.children.length; i++) {
        if (subElement.children[i].children[0].innerText.toLowerCase().match(/surprise test/)) {
            maxMarks += parseFloat(subElement.children[i].children[1].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
            marksObtd += parseFloat(subElement.children[i].children[2].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
        }
    }
    return {
        total : finalWeightage,
        obtained : (marksObtd / maxMarks) * finalWeightage
    };
}

function getAssignment(subElement) {
    let marksObtd = 0;
    let maxMarks = 0;
    let finalWeightage = 10;
    for (let i = 0; i < subElement.children.length; i++) {
        if (subElement.children[i].children[0].innerText.toLowerCase().match(/assignment/)) {
            maxMarks += parseFloat(subElement.children[i].children[1].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
            marksObtd += parseFloat(subElement.children[i].children[2].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
        }
    }
    return {
        total : finalWeightage,
        obtained : (marksObtd / maxMarks) * finalWeightage
    };
}

function getPracticalMST(subElement) {
    let marksObtd = 0;
    let maxMarks = 0;
    let finalWeightage = 15;
    for (let i = 0; i < subElement.children.length; i++) {
        if (subElement.children[i].children[0].innerText.toLowerCase().match(/practical mst/)) {
            maxMarks += parseFloat(subElement.children[i].children[1].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
            marksObtd += parseFloat(subElement.children[i].children[2].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
        }
    }
    return {
        total : finalWeightage,
        obtained : (marksObtd / maxMarks) * finalWeightage
    };
}

function getPracticalWorksheetInfo(subElement) {
    let maxMarks = 0;
    let marksObtd = 0;
    let finalWeightage = 45;
    for (let i = 0; i < subElement.children.length; i++) {
        if (subElement.children[i].children[0].innerText.toLowerCase().match(/practical worksheet/)) {
            maxMarks += parseFloat(subElement.children[i].children[1].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
            marksObtd += parseFloat(subElement.children[i].children[2].innerText.match(/[+-]?\d+(\.\d+)?/g).join(""));
        }
    }
    return {
        total : finalWeightage,
        obtained : (marksObtd / maxMarks) * finalWeightage
    };
}

main();