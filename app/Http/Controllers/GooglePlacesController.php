<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


//controller for fetch data from google map places api
class GooglePlacesController extends Controller
{
    private $apikey = 'AIzaSyCfWog1YDUkKF-Jiy6w-38WWbbFJxmRWxc'; //google api tokent key
    public function search($query,$pagetoken=null){
        $params=[
            'query' => $query,
            'type'=>'restaurant',
            'region'=>'th',
            'language'=>'th',
            'key' => $this->apikey,
        ];
        if ($pagetoken!==null){
            $params['pagetoken']=$pagetoken;
        }
        $response = Http::get('https://maps.googleapis.com/maps/api/place/textsearch/json',$params);
        $results= $response->json()['results'];
        $nextPagetoken = $response->json()['next_page_token']??null;
        return [
            'results'=>$results,
            'nextPagetoken'=>$nextPagetoken,
        ];
    }
}
