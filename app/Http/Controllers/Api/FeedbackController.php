<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FeedbackResource;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orderColumn = $request->input('order_column', 'id');
        $orderDirection = $request->input('order_direction', 'desc');
        if(!in_array($orderColumn, ['id','theme'])){
            $orderColumn = 'id';
        }
        if(!in_array($orderDirection, ['asc','desc'])){
            $orderDirection = 'desc';
        }

        $feedback = Feedback::with('category')->when($request->filled('category_id'),function($query)use($request){
            $query->where('category_id', $request->category_id);
        })
        ->orderBy($orderColumn, $orderDirection)
        ->paginate(10);

        return FeedbackResource::collection($feedback);
        

        
    }

  

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Feedback  $feedback
     * @return \Illuminate\Http\Response
     */
    public function show(Feedback $feedback)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Feedback  $feedback
     * @return \Illuminate\Http\Response
     */
    public function destroy(Feedback $feedback)
    {
        //
    }
}
