<?php
$HARD_DISK_ROOT = "/disk/data/htdocs232/poco/share/pages";
include_once("{$HARD_DISK_ROOT}/fe_include/common.inc.php");

$user_id = trim($_INPUT['user_id']);
$page = trim($_INPUT['page']);
$show_type = trim($_INPUT['show_type']);
$status_type = trim($_INPUT['status_type']);
// 调用数据
$page_count = 10;
if($page > 1)
{
    $limit_start = ($page - 1)*($page_count - 1);
}
else
{
    $limit_start = ($page - 1)*$page_count;
}

$limit_str = "{$limit_start},{$page_count}";
$ret = get_api_result('user/meeting_manager_list',array(
	'user_id' => $user_id,
	'limit' => $limit_str,
	'show_type' => $show_type,
	'status_type' => $status_type
));
//$rel_page_count = 10;
//foreach ($ret['data']['list'] as $key => $value) {
//    $ret['data']['list'][$key]['image'] = share_resize_act_img_url($ret['data']['list'][$key]['image'],'640');
//}
//var_dump($ret);
//判断是否还有更多页码
$has_next_page = (count($ret['data']['list'])>0);

//if($has_next_page)
//{
//    array_pop($ret["data"]["list"]);
//}

$output_arr['limit_str'] = $limit_str;
$output_arr['page'] = $page;
$output_arr['has_next_page'] = $has_next_page;
$output_arr['list'] = $ret["data"]["list"];

share_mobile_output($output_arr);// 直接返回json
?>