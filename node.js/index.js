function getTotalMarks(s1,s2,s3){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log("getTotalMarks()called");
            if(s1>100 ||s2>100 || s3>100)
            reject("Invalid Marks");
        else
            resolve(s1+s2+s3);
        },500)
    });
}

function getGradeByAvg(Total){
    console.log("getGradeByAvg()called");
    const avg=Total/3;
    if (Avg>60){
        return"A";
    } else {
        return "F"
    }
}

async function main(){
    try{
        const Total=await getTotalMarks(120,90,90);
        const Avg=getGradeByAvg(Total);
        console.log(avg);
    }catch(e){
        console.log("error:",e);
    }
}
main();

async function main(){
    getTotalMarks(190,90,90),then(function(total){
        const avg=getGradeByAvg(total);
        console.log(avg);
    }).catch(function(error){
        console.log(error);
    });
}
main();