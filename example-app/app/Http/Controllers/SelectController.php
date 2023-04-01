<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SelectController extends Controller
{
    public function index(){
        return view('select');
    }
    public function search($list, $search, $exception){
        if ($search == 'all'){
            $list = User::select('name','id')->where('id', '!=', $exception)->skip($list)->take(20)->get();
        }else{
            $list = User::select('name','id')->where('name', 'like', '%' . $search . '%')->where('id', '!=', $exception)->skip($list)->take(20)->get();
//                DB::table('users')
//                    ->where('id', '!=',    $exception)
//                    ->where('name', 'like', '%' . $search . '%')
//                    ->offset($list)
//                    ->limit(10)
//                    ->get();
        }

        return response()->json($list);
    }
}
