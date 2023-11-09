<?php

namespace Database\Seeders;

use App\Models\User;
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
            'name'       => 'manager',
            'email'      => 'manager@gmail.com',
            'password'   => bcrypt('qwerty123!'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            
        ]);

        User::factory(10)->create();

        
    }
}

