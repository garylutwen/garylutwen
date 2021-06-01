const mysql = require('mysql');

const osu = {
	connectionLimit : 10,
	host            : 'classmysql.engr.oregonstate.edu',
	user            : 'cs290_lutweng',
	password        : '7438',
	database        : 'cs290_lutweng'	
};

let pool = mysql.createPool(osu);

module.exports.pool = pool;