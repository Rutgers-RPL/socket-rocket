export function csvGenerator(data) {
    let csvRows = [];

    let headers = Object.keys(data)

    csvRows.push(headers.join(','));

    let values = Object.values(data);
    
    let valData = [];
    values.forEach((arr) => {
        valData.push(arr[arr.length-1]);
    })
    let vals  = valData.join(',')

    csvRows.push(vals)

    return csvRows.join('\n') + '\n'
    

}