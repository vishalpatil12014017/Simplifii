
const checkTimeDifferance=(createdAt)=>{
    var diffMs = (Math.floor(Date.now())-createdAt); // 
    return Math.round(((diffMs % 86400000) % 3600000) / 60000);
}


module.exports = {checkTimeDifferance};