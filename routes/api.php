<?php

use App\Http\Controllers\StockController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
Route::apiResource('stocks', StockController::class);


Route::get('quote/{symbol}', function ($symbol) {
    $key = env('ALPHA_VANTAGE_KEY');
    $url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={$symbol}&apikey={$key}";
    $response = file_get_contents($url);
    return response($response)->header('Content-Type', 'application/json');
});
Route::post('refresh-prices', function () {
    $job = new App\Jobs\UpdateStockPrices;
    $job->handle();
    return response()->json(['message' => 'Prix mis à jour']);
});

Route::get('stocks/{stock}/prices', function (App\Models\Stock $stock) {
    return $stock->prices()->orderBy('date')->get();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});