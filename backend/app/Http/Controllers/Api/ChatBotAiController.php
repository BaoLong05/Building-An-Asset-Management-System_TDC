<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatBotAiController extends Controller
{
   public function chat(Request $request)
    {
        $message = $request->input('message');

        $response = Http::post(
           'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' . env('GEMINI_API_KEY'),
            [
                "contents" => [
                    [
                        "parts" => [
                            [
                                "text" => $message
                            ]
                        ]
                    ]
                ]
            ]
        );

        return response()->json([
            "reply" => $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? null,
            "raw" => $response->json()
        ]);
    }
}
