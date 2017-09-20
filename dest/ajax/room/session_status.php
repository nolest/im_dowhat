<?php
include_once('/disk/data/htdocs232/poco/pai/mobile/poco_pai_common.inc.php');
include_once '../api_rest.php';

$arr = $_INPUT['arr'];
$agent_id = $_INPUT['agent_id'];
$service_id = $_INPUT['service_id'];
$operate = $_INPUT['operate'];
$agent_type = $_INPUT['agent_type'];
$client_type = $_INPUT['client_type'];

if($agent_type == 'agent'){
	$obj = POCO::singleton('pai_mall_operate_agent_class');
}else{
	$obj = POCO::singleton('pai_mall_operate_water_class');
}

if($client_type == 'seller'){
	$seller_id = $agent_id;
	$buyer_id = $service_id;
}
else{
	$seller_id = $service_id;
	$buyer_id = $agent_id;
}

switch($operate)
	{
		case 'start':$ret = $obj->session_start_time($buyer_id,$seller_id);break;
		case 'talk':$ret = $obj->session_respond_time($buyer_id,$seller_id);
		if($ret['result'] == -1){
			$ret = $obj->session_start_time($buyer_id,$seller_id);
		};break;
		case 'end':$ret = $obj->session_end_time($buyer_id,$seller_id);break;
		case 'check':$ret = $obj->check_is_session_end($buyer_id,$seller_id);break;
	}


$output_arr = $ret;

mobile_output($output_arr,false);

?>