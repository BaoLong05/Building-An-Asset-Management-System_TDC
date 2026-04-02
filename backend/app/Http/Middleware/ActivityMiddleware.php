<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;

class ActivityMiddleware
{

    public function handle( $request, Closure $next)
    {
        /** @var User $user*/
        $user = $request->user();
        if ($user && $user->last_activity_at) {
            if (now()->diffInMinutes($user->last_activity_at) > 15) {
                $user->tokens()->delete();
                return response()->json([
                    'success' => false,
                    'message' => 'Hết phiên đăng nhập!'
                ], 401);
            }
        }

        if ($user) {
            $user->update([
                'last_activity_at' => now()
            ]);
        }
        return $next($request);
    }
}
