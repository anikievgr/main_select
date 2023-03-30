<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SelectController extends Controller
{
    public function index(){
        $users = User::query()->take(10)->get();
        return view('select', compact('users'));
    }
    public function search($list){
        $list = DB::table('users')->select('name', 'id')->skip($list)->take(2)->get();
        return response()->json($list);
    }
}
