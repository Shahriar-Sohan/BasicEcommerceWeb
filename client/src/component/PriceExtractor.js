

function ExtractPrice(arrOfObj, arrOfId){
    let total=0
    for(let i=0;i<arrOfId.length;i++){
        for(let j=0;j<arrOfObj.length;j++){
            if(arrOfId[i]===arrOfObj[j].id){
                total += arrOfObj[j].price
            }
        }
        
    }
    return total
}


export default ExtractPrice