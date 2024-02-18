const calculateTotalPages = (dataCount, limit) =>{
    if(dataCount <= limit) return 1;

    if(dataCount % limit > 0)
    {
        return Math.floor(dataCount / limit) + 1;
    }

    return dataCount / limit;
}

export {
    calculateTotalPages
}