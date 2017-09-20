<?php
include_once('/disk/data/htdocs232/poco/pai/mobile/poco_pai_common.inc.php'); 
require_once('/disk/data/htdocs232/poco/pai/yue_admin/task/include/basics.fun.php');
include_once(dirname(__FILE__).'/include/output_function.php');
include_once(dirname(__FILE__).'/no_copy_online_config.inc.php');

$user_id = 100029;//$_INPUT['yue_login_id']; 

	//获取阿里云token
	$aliyun_obj = POCO::singleton('pai_aliyun_service_class');

	$param['project_name'] = 'chat';//写死
	$param['identify'] = $user_id;//填用户ID
	$param['file_ext'] = 'jpg';
	$param['file_base_name_count'] = '1';//图片数
	$ret['ali_token']=$aliyun_obj->get_access_token($param);


$output_arr = $ret;
mobile_output($output_arr,false); 
?>