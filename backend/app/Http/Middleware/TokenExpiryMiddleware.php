<?php

namespace App\Http\Middleware;

use Closure;

class TokenExpiryMiddleware
{
    public function handle($request, Closure $next)
    {
        $token = $request->user()?->currentAccessToken();
        if ($token && $token->expires_at && now()->gt($token->expires_at)) {
            $token->delete();
            return response()->json([
                'success' => false,
                'message' => 'Token hết hạn!'
            ], 401);
        }
        return $next($request);
    }
}
