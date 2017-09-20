<?php
$HARD_DISK_ROOT = "/disk/data/htdocs232/poco/share/pages";
include_once("{$HARD_DISK_ROOT}/fe_include/common.inc.php");

$user_id = trim($_INPUT['user_id']);
$group_id = trim($_INPUT['group_id']);


$ret = get_api_result('service/meeting_group_info',array(
	'user_id' => $yue_login_id,
	'group_id' => $group_id
));

$output_arr = $ret;

share_mobile_output($output_arr);// 直接返回json
?>