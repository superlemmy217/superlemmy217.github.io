<?php 
	if($_GET['data'] != ''){
		$filestream = fopen('data.json', 'w');
		fwrite($filestream, $_GET['data']);
		fclose($filestream);
	}
?>