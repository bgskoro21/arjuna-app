<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->get('sort', 'id');
        $direction = $request->get('direction', 'asc');

        $users = User::query()
            ->when($request->search, function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
            })
            ->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString(); // agar pagination tetap membawa filters

        return Inertia::render('users/index', [
            "users" => $users,
            "filters" => $request->only(['search', 'sort', 'direction'])
        ]);
    }
}
