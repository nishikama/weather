<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

$params = explode('&', urldecode($_SERVER['QUERY_STRING']));
$request = preg_replace('/^.+=(.+)$/', '$1', array_shift($params)) . (!empty($params) ? '?' . implode('&', $params) : '');

$strJson = file_get_contents($request);
echo $strJson;
exit();
