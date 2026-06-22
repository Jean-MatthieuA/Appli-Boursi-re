<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Stock;
use Illuminate\Support\Facades\Http;
use App\Models\StockPrice;

class UpdateStockPrices implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
public function handle(): void
{
    $key = env('ALPHA_VANTAGE_KEY');
    $stocks = Stock::all();

    foreach ($stocks as $stock) {
        $response = Http::get("https://www.alphavantage.co/query", [
            'function' => 'TIME_SERIES_DAILY',
            'symbol' => $stock->symbol,
            'apikey' => $key,
        ]);

        $timeSeries = $response->json()['Time Series (Daily)'] ?? null;

        if (!$timeSeries) continue;

        // Prix du jour le plus récent
        $latestDate = array_key_first($timeSeries);
        $latest = $timeSeries[$latestDate];

        $stock->update(['current_price' => $latest['4. close']]);

        StockPrice::updateOrCreate(
            ['stock_id' => $stock->id, 'date' => $latestDate],
            [
                'price' => $latest['4. close'],
                'open'  => $latest['1. open'],
                'high'  => $latest['2. high'],
                'low'   => $latest['3. low'],
            ]
        );
    }
}
}