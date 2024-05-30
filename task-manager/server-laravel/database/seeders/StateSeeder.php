<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\State;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('state')->insert([
            ['name' => 'PENDING'],
            ['name' => 'DONE'],
        ]);
    }
}
