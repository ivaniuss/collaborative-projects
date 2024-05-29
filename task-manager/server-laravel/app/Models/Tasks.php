<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'state_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function state()
    {
        return $this->hasOne(State::class);
    }
}
