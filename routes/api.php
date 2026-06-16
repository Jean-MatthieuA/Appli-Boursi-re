<?php

use App\Http\Controllers\StockController;
use Illuminate\Support\Facades\Route;

Route::apiResource('stocks', StockController::class);


Route::get('quote/{symbol}', function ($symbol) {
    $key = env('ALPHA_VANTAGE_KEY');
    $url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={$symbol}&apikey={$key}";
    $response = file_get_contents($url);
    return response($response)->header('Content-Type', 'application/json');
});