<?php
$HARD_DISK_ROOT = "/disk/data/htdocs232/poco/share/pages";
include_once("{$HARD_DISK_ROOT}/fe_include/common.inc.php");

$user_id = trim($_INPUT['user_id']);
$album_user_id = trim($_INPUT['album_user_id']);
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
$ret = get_api_result('albums/albums_list',array(
	'user_id' => $user_id,
	'target_id' => $album_user_id,
	'show_private' => '1',
	'limit' => '0,200'
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