<?php
$HARD_DISK_ROOT = "/disk/data/htdocs232/poco/share/pages";
include_once("{$HARD_DISK_ROOT}/fe_include/common.inc.php");

$user_id = trim($_INPUT['user_id']);
$location_id = trim($_INPUT['location_id']);
$resource_id = trim($_INPUT['resource_id']);
$receive_id = trim($_INPUT['receive_id']);
$receive_type = trim($_INPUT['receive_type']);
$to_group = trim($_INPUT['to_group']);
$resource_type = trim($_INPUT['resource_type']);
$price = trim($_INPUT['price']);
$resource_url = trim($_INPUT['resource_url']);
$resource_thumb = trim($_INPUT['resource_thumb']);
$image = trim($_INPUT['image']);
$resource_key = trim($_INPUT['resource_key']);
$preview_start = trim($_INPUT['preview_start']);
$preview_end = trim($_INPUT['preview_end']);
$resource_level = trim($_INPUT['resource_level']);
$resource_duration = trim($_INPUT['resource_duration']);
$custom_id = trim($_INPUT['custom_id']);

$page = trim($_INPUT['page']);
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
$ret = get_api_result('service/resource_send_multiple',array(
	'user_id' => $user_id,
	//'location_id' => '',
	'receive_id' => $receive_id,
	'receive_type' => $receive_type,
	//'to_group' => $to_group,
	'resource_type' => $resource_type,
	'price' => $price,
	//'resource_url' => $resource_url,
	//'resource_thumb' => $resource_thumb,
	//'image' => $image,
	//'resource_key' => $resource_key,
	//'preview_start' => $preview_start,
	//'preview_end' => $preview_end,
	//'resource_level' => $resource_level,
	//'resource_duration' => $resource_duration,
	'resource_id' => $resource_id
));
//$rel_page_count = 10;
//foreach ($ret['data']['list'] as $key => $value) {
//    $ret['data']['list'][$key]['image'] = share_resize_act_img_url($ret['data']['list'][$key]['image'],'640');
//}

//判断是否还有更多页码
//$has_next_page = (count($ret['data']['list'])>0);

//if($has_next_page)
//{
//    array_pop($ret["data"]["list"]);
//}

//$output_arr['limit_str'] = $limit_str;
//$output_arr['page'] = $page;
//$output_arr['has_next_page'] = $has_next_page;
$output_arr = $ret;

share_mobile_output($output_arr);// 直接返回json
?>