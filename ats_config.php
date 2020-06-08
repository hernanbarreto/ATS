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

	$sql= "SELECT * FROM `datos_tr` WHERE 1"; 

	$result = mysqli_query($con,$sql);

	while($row = mysqli_fetch_array($result)) {
    	echo $row['hora_serv'] . ";";
    	echo $row['comando'] . ";";
		echo $row['linea'] . ";";
		echo $row['num_tren'] . ";";
		echo $row['chapa_tren'] . ";";
		echo $row['modelo'] . ";";
		echo $row['version_fw'] . ";";
		echo $row['dia_serv'] . ";";
	} 

	mysqli_close($con);
?>
