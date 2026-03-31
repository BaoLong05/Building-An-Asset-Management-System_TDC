<?php

namespace App\Http\Middleware;

use Closure;

class RoleMiddleware
{
    public function handle($request, Closure $next, ...$roles)
    {
        $userRole = $request->user()->role('name');
        if (!in_array($userRole, $roles)) {
            return response()->json([
                'success' => false,
                'message' => 'Không có quyền!'
            ], 403);
        }
        return $next($request);
    }
}
