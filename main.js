$(document).ready(function() {


	var ctx = document.getElementById("myChart");


	function getRandomColor() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}


	$.ajax({
	   url: `http://www.NflArrest.com/api/v1/team`,
	   success: (res)=>{
	   	let data = res.reduce((obj,item)=>{
	   		obj.teams.push(item.Team_name);
	   		obj.arrests.push(item.arrest_count);
	   		obj.colors.push(getRandomColor());
	   		return obj;
	   	},{
	   		teams:[],
	   		arrests:[],
	   		colors:[],
	   	})
	   	makeChart(data);

	   }
	});


	function makeChart(data)
	{
		const myPieChart = new Chart(ctx,{
		    type: 'pie',
		    data: { 
			    labels: data.teams,
			    datasets: [
		        {
		        	data: data.arrests,
		            backgroundColor: data.colors
		        }]
	    	},
		    options: {
	        	responsive: false
	    	}
		});
	}


});


