<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;

class ConnexionController extends Controller
{
    public function index()
    {
        Log::info("Click on button");
        return redirect('/');
    }
}
