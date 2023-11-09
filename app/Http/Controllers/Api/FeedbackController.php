<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFeedbackAnswerRequest;
use App\Http\Requests\StoreFeedbackRequest;
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

        $feedbacks = Feedback::with('category')->when($request->filled('category_id'),function($query)use($request){
            $query->where('category_id', $request->category_id);
        })
        ->orderBy($orderColumn, $orderDirection)
        ->paginate(10);

        return FeedbackResource::collection($feedbacks);
        

        
    }

    

    /**
     *  
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFeedbackRequest $request)
    {
        

        $feedback = Feedback::create($request->validated());

        if ($request->hasFile('file')) {
            $filename = $request->file('file')->getClientOriginalName();
            info($filename);
        }

        return new FeedbackResource($feedback);
    }

    

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Feedback  $feedback
     * @return \Illuminate\Http\Response
     */
    public function show(Feedback $feedback)
    {

        
        return new FeedbackResource($feedback);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Feedback  $feedback
     * @return \Illuminate\Http\Response
     */
    public function destroy(Feedback $feedback)
    {
        $feedback->delete();

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     * @param  \App\Models\Feedback  $feedback
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(StoreFeedbackAnswerRequest $request, Feedback $feedback)
    {
        

        $feedback->update($request->validated());

        return new FeedbackResource($feedback);


    }
}
