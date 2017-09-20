<?php
$HARD_DISK_ROOT = "/disk/data/htdocs232/poco/share/pages";
include_once("{$HARD_DISK_ROOT}/fe_include/common.inc.php");
include_once(dirname(__FILE__).'/include/output_function.php');
include_once(dirname(__FILE__).'/no_copy_online_config.inc.php');
$user_id = $_INPUT['user_id'];
$user_type = $_INPUT['user_type'];
$agent_type = $_INPUT['agent_type'];

$services_obj = POCO::singleton('share_yun_service_class');
if($agent_type == 'agent'){
	$obj = POCO::singleton('share_operate_agent_class');
}
else{
	$obj = POCO::singleton('share_operate_agent_class');
}
if($user_type == 'seller'){
	//获取代理列表,与传入身份一致
	$ret = $obj->get_valid_seller_list($user_id,$b_select_count = false,$limit = '0,1000');
	foreach ($ret as $key => $value) {
	  $id = $ret[$key]['seller_user_id'];
	  $auth = $services_obj->get_chat_access_token(array("project_name" => "share", "identify" => $id));
	  $ret[$key]['auth'] = $auth;
	  $user_obj = POCO::singleton('share_user_icon_class');
	  $ret[$key]['icon'] = $user_obj->get_user_icon($id);
	  //var_dump(iconv('GBK','UTF-8',get_seller_nickname_by_user_id($id)));
	  $user_name_obj = POCO::singleton('share_user_class');
	  $ret[$key]['name'] = $user_name_obj->get_share_user_nickname($id);//get_seller_nickname_by_user_id($id);
	  //var_dump($ret[$key]['name']);
	}
}
else{
	$ret = $obj->get_valid_seller_list($user_id,$b_select_count = false,$limit = '0,1000');
	foreach ($ret as $key => $value) {
	  $id = $ret[$key]['seller_user_id'];
	  $auth = $services_obj->get_chat_access_token(array("project_name" => "share", "identify" => $id));
	  $ret[$key]['auth'] = $auth;
	  $user_obj = POCO::singleton('share_user_icon_class');
	  $ret[$key]['icon'] = $user_obj->get_user_icon($id);
	  $user_name_obj = POCO::singleton('share_user_class');
	  $ret[$key]['name'] = $user_name_obj->get_share_user_nickname($id);


	  //$ret[$key]['icon'] = get_user_icon($id);
	  //var_dump(iconv('GBK','UTF-8',get_seller_nickname_by_user_id($id)));
	  //$ret[$key]['name'] = get_user_nickname_by_user_id($id);
	  //var_dump($ret[$key]['name']);
	}
}




 
$output_arr = $ret;
share_mobile_output($output_arr,false); 
?>