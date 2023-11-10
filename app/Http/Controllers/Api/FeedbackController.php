<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFeedbackAnswerRequest;
use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Resources\FeedbackResource;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userId = Auth::id();


        if ($userId == 1) {

            $feedbacks = Feedback::with('category')
                ->when($request->filled('category_id'), function ($query) use ($request) {
                    $query->where('category_id', $request->category_id);
                })
                ->orderBy($request->input('order_column', 'id'), $request->input('order_direction', 'desc'))
                ->paginate(10);
        } else {

            $feedbacks = Feedback::with('category')
                ->where('user_id', $userId)
                ->when($request->filled('category_id'), function ($query) use ($request) {
                    $query->where('category_id', $request->category_id);
                })
                ->orderBy($request->input('order_column', 'id'), $request->input('order_direction', 'desc'))
                ->paginate(10);
        }

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

        $userId = Auth::id();


        $lastFeedback = Feedback::where('user_id', $userId)->latest()->first();


        if ($lastFeedback && now()->diffInHours($lastFeedback->created_at) < 24) {

            return response()->json(['error' => 'Вы можете создать feedback только 1 раз в сутки.'], 422);
        }


        $feedbackData = $request->validated();
        $feedbackData['user_id'] = $userId;

        

        if ($request->hasFile('file')) {
        
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $file->storeAs('feedbacks', $fileName); 
        $feedbackData['file'] = $fileName; 
    }

        $feedback = Feedback::create($feedbackData);

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
