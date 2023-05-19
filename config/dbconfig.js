const options = {
	DB: {
		HOST: "db4free.net",
		USER: "free_data_hosted",
		PASSWORD: "8mhg2ehxfUxBZu@",
		DB: "free_database",
		dialect: "mysql",
		pool: {
		  max: 5,
		  min: 0,
		  acquire: 30000,
		  idle: 10000,
		},
	  },
};
module.exports = options;
