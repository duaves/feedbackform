<?php

namespace Database\Seeders;


use Carbon\Carbon;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name'       => 'Manager',
            'email'      => 'manager@gmail.com',
            'is_admin'   => 1,
            'password'   => bcrypt('qwerty123!'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            
        ]);

        \App\Models\User::factory(10)->create();
    }
}

