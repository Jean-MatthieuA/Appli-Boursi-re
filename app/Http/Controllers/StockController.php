<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;
use App\Models\Portfolio;

class StockController extends Controller
{
    public function index(Request $request)
    {
        $portfolioId = $request->query('portfolio_id');

        $portfolio = Portfolio::where('id', $portfolioId)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        return $portfolio->stocks;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'portfolio_id' => 'required|exists:portfolios,id',
            'symbol' => 'required|string',
            'name' => 'required|string',
            'buy_price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        $portfolio = Portfolio::where('id', $validated['portfolio_id'])
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $stock = $portfolio->stocks()->create($validated);
        return response()->json($stock, 201);
    }

    public function show(Request $request, Stock $stock)
    {
        $this->authorizeStock($request, $stock);
        return $stock;
    }

    public function update(Request $request, Stock $stock)
    {
        $this->authorizeStock($request, $stock);
        $stock->update($request->all());
        return response()->json($stock);
    }

    public function destroy(Request $request, Stock $stock)
    {
        $this->authorizeStock($request, $stock);
        $stock->delete();
        return response()->json(null, 204);
    }

    private function authorizeStock(Request $request, Stock $stock)
    {
        if ($stock->portfolio->user_id !== $request->user()->id) {
            abort(403, 'Interdit');
        }
    }
}