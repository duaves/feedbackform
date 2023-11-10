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
            'user_id' => $this->user_id,
            'user'=>[
                'id'=>$this->user->id ?? '',
                'name'=>$this->user->name ?? '',
                'email'=>$this->user->email ?? '',
            ],
            'category_id' => $this->category_id,
            'category'=>[
                'id'=>$this->category->id ?? '',
                'category'=>$this->category->category ?? '',
            ],
            'theme'=>$this->theme,
            'message'=>$this->message,
            'answer'=>$this->answer,
            'file'=>$this->file,
            'status_id' => $this->status_id,
            'status'=>[
                'id'=>$this->status->id ?? '',
                'viewed'=>$this->status->viewed ?? '',
                'answered'=>$this->status->answered ?? '',
            ],
            'created_at'=>$this->created_at->toDateTimeString(),
        ]; 
    }
}
