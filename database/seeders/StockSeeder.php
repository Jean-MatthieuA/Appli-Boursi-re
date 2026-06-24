<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Stock;
use App\Models\StockPrice;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
{
    $stocks = [
        ['symbol' => 'AAPL', 'name' => 'Apple Inc.', 'buy_price' => 150.00, 'quantity' => 10],
        ['symbol' => 'NVDA', 'name' => 'Nvidia Corporation', 'buy_price' => 220.00, 'quantity' => 5],
        ['symbol' => 'TSLA', 'name' => 'Tesla Inc.', 'buy_price' => 180.00, 'quantity' => 8],
        ['symbol' => 'MSFT', 'name' => 'Microsoft Corporation', 'buy_price' => 310.00, 'quantity' => 3],
        ['symbol' => 'AMZN', 'name' => 'Amazon.com Inc.', 'buy_price' => 140.00, 'quantity' => 6],
    ];

    foreach ($stocks as $stock) {
        $s = Stock::create(array_merge($stock, ['current_price' => null]));

        $price = $stock['buy_price'];
        for ($i = 30; $i >= 0; $i--) {
            $change = $price * (rand(-3, 3) / 100);
            $open = $price;
            $close = round($price + $change, 2);
            $high = round(max($open, $close) + rand(0, 2), 2);
            $low = round(min($open, $close) - rand(0, 2), 2);

            StockPrice::create([
                'stock_id' => $s->id,
                'price' => $close,
                'open' => $open,
                'high' => $high,
                'low' => $low,
                'date' => now()->subDays($i)->toDateString(),
            ]);

            $price = $close;
        }

        // Met à jour current_price avec le dernier prix
        $s->update(['current_price' => $price]);
    }
}
}
