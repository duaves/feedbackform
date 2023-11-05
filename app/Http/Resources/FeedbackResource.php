<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FeedbackResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'user'=>[
                'id'=>$this->user->id,
                'name'=>$this->user->name,
                'email'=>$this->user->email,
            ],
            'category'=>[
                'id'=>$this->category->id,
                'category'=>$this->category->category
            ],
            'theme'=>$this->theme,
            'message'=>substr($this->message, 0, 25) . '...',
            'answer'=>substr($this->answer, 0, 25) . '...',
            'file'=>$this->file,
            'status'=>[
                'id'=>$this->status->id,
                'viewed'=>$this->status->viewed,
                'answered'=>$this->status->answered,
            ],
            'created_at'=>$this->created_at->toDateTimeString(),
        ]; 
    }
}
