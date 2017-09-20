<?php
include_once('/disk/data/htdocs232/poco/pai/mobile/poco_pai_common.inc.php'); 
require_once('/disk/data/htdocs232/poco/pai/yue_admin/task/include/basics.fun.php');
include_once(dirname(__FILE__).'/include/output_function.php');
include_once(dirname(__FILE__).'/no_copy_online_config.inc.php');

$user_id = $_INPUT['user_id'];
$type = $_INPUT['type'];
$agent_type = $_INPUT['agent_type'];

if($agent_type == 'agent'){
	$goods_obj = POCO::singleton ( 'pai_mall_operate_agent_class' );
}else{
	$goods_obj = POCO::singleton ( 'pai_mall_operate_water_class' );
}

$good_list = $goods_obj->user_goods_list($user_id,array("show"=>1), false,  'goods_id DESC', '0,200');
$ret['good_list'] = $good_list;


$output_arr = $ret;
mobile_output($output_arr,false); 
?>