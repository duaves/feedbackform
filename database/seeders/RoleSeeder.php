<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {





        $manager = Role::create(['name' => 'manager']);
        $manager->permissions()->attach(
            Permission::where('name', '!=', 'feedback_form')->pluck('id')
        );

        $user = Role::factory()->create(['name' => 'user']);
        $user->permissions()->attach(
            Permission::where('name', '!=', 'feedback_answer')->pluck('id')
        );

        DB::table('role_user')->insert([
            'user_id'       => '1',
            'role_id'       => '1',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')

        ]);

        $users = User::all();

        foreach ($users as $user) {
            if ($user->id !== 1) {
            DB::table('role_user')->insert([
                'user_id' => $user->id,
                'role_id' => '2',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
        }
        }
    }
}
