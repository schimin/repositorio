function timestampToDate(data) {

		var date = new Date(data);

		return date.getFullYear() + "-" + date.getMonth() +	"-" + date.getDate() + 
		  " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		
	}
