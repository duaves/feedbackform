<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedbackRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'theme' => 'required',
            'message' => 'required',
            
            'category_id' => 'required',
            'file'=>'nullable'
            
        ];
    }

    public function attributes()
    {
        return [
            'category_id' => 'category'
        ];
    }
}