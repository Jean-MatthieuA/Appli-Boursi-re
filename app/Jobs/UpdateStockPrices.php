<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

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
            'function' => 'GLOBAL_QUOTE',
            'symbol' => $stock->symbol,
            'apikey' => $key,
        ]);

        $price = $response->json()['Global Quote']['05. price'] ?? null;

        if ($price) {
            $stock->update(['current_price' => $price]);
        }
    }
}
}
