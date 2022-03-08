<?php

require 'AltoRouter.php';

$router = new AltoRouter();
$router->setBasePath('/data');

$router->map('GET','/',  function() {
    echo 'Welcome to archaeology.link, the RGZM LOD hub of the RGZM and its partners.';
} , 'root');
$router->map('GET','/[*:section]/[*:id]',  function($section,$id) {
    $uuid = $id;
    //$url = "https://digits.mainzed.org/rgzmwissit/pubby/".$section."/".$uuid;
    $url = "https://archaeolink.github.io/".$section."/item.htm?resource=".$uuid;
    header("HTTP/1.1 301 Moved Permanently"); header("Location: ".$url); exit;
} , 'forward');
$match = $router->match();

if( $match && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] );
} else {
    header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}
