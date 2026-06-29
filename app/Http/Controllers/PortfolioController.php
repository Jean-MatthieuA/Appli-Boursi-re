<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $portfolios = $request->user()->portfolios()->with('stocks')->get();
        return response()->json($portfolios);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $portfolio = $request->user()->portfolios()->create($validated);
        return response()->json($portfolio, 201);
    }

    public function show(Request $request, Portfolio $portfolio)
    {
        if ($portfolio->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Interdit'], 403);
        }

        return response()->json($portfolio->load('stocks'));
    }

    public function destroy(Request $request, Portfolio $portfolio)
    {
        if ($portfolio->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Interdit'], 403);
        }

        $portfolio->delete();
        return response()->json(['message' => 'Portfolio supprimé']);
    }
}