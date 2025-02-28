
function Quantity(arr, id){
    let count = 0
    for(let i=0;i<arr.length;i++){
        if(arr[i]===id)count++
    }
    return count
}

export default Quantity


