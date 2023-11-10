<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => rand(1, 11),
            'category_id' => rand(1, 5),
            'theme' => $this->faker->text(10),
            'message' => $this->faker->text(100),
            
            'status_id' => rand(1, 5),
            
        ];
    }
}
