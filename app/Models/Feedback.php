<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'category_id', 'theme', 'message', 'answer', 'file', 'status_id', 'created_at'];

   protected $table = 'feedbacks';

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }



    
}
