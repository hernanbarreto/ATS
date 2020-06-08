<?php
    $dbserver = "hmiatsd.byethost31.com";
    $dbuser = "hmiatsdb_ats";
    $password = "m3c464r0n";
	$dbname = "hmiatsdb_ats_prueba";
	
	//$q = intval($_GET['q']);
	$con = mysqli_connect($dbserver,$dbuser,$password,$dbname);
	if (!$con) {
       die('Could not connect: ' . mysqli_error($con));
	}

	mysqli_select_db($con,$dbname);

	if (intval($_GET['lastId'] == 0)){
		$rs = mysqli_query($con,"SELECT MAX(id) AS id FROM `datos_bats`");
		$row = mysqli_fetch_array($rs); 
		$id = $row[0]; //obtengo el ultimo dato cargado

		$sql= "SELECT `id`, `dia_serv`, `hora_serv`, `cadena` FROM `datos_bats` WHERE `id` = " . $id;
	}
	else{
		$sql= "SELECT `id`, `dia_serv`, `hora_serv`, `cadena` FROM `datos_bats` WHERE `id` > " . intval($_GET['lastId']); 
	}	

	$result = mysqli_query($con,$sql);

	while($row = mysqli_fetch_array($result)) {
    	echo $row['id'] . ";";
    	echo $row['dia_serv'] . ";";
		echo $row['hora_serv'] . ";";
		echo bin2hex(substr($row['cadena'], 0)) . ";";
	} 

	mysqli_close($con);
?>
