<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = ['symbol', 'name', 'buy_price', 'quantity','current_price','stock_prices'];
  
    
public function prices()
{
    return $this->hasMany(StockPrice::class);
}
public function portfolio()
{
    return $this->belongsTo(Portfolio::class);
}


    
}

