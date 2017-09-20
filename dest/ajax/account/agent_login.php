<?php
$HARD_DISK_ROOT = "/disk/data/htdocs232/poco/share/pages";
include_once("{$HARD_DISK_ROOT}/fe_include/common.inc.php");
$login_id = intval($_INPUT['login_id']);
$pw = trim($_INPUT['pw']);
$agent_type = ($_INPUT['agent_type']);

if($agent_type == 'agent'){
	$obj = POCO::singleton('share_operate_agent_class');
}else{
	$obj = POCO::singleton('share_operate_agent_class');
	}

$ret=$obj->user_login($login_id,$pw);

$output_arr = $ret;

share_mobile_output($output_arr,false);

?>