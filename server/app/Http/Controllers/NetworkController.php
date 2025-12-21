<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Network;
use Illuminate\Http\Request;

class NetworkController extends Controller
{
    function getNetworks()
    {
        try {
            $networks = Network::all();
            return ApiResponse::success(true, $networks, "Networks fetched successfully", 200);
        } catch (\Throwable $th) {
            return ApiResponse::error($th);
        }
    }

    function addNetwork(Request $request)
    {
        try {

            $resp = Network::create($request->all());
            if ($resp) {
                return ApiResponse::success(true, $resp, "Network added successfully..", 200);
            }

        } catch (\Throwable $th) {
            return ApiResponse::error($th);
        }
    }
}
