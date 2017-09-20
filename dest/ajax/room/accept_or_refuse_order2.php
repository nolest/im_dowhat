<?php
//include_once '../config.php';
include_once('/disk/data/htdocs232/poco/pai/poco_app_common.inc.php');
include_once '../api_rest.php';

$user_id = $_INPUT['user_id'];
$order_sn = $_INPUT['order_sn'];
$operate = $_INPUT['operate'];

$ret = get_api_result('merchant/trade_operate.php',array(
	'user_id' => $user_id,
	'order_sn' => $order_sn,
	'operate' => $operate
	));

$output_arr = $ret;

mobile_output($output_arr,false); 

?>