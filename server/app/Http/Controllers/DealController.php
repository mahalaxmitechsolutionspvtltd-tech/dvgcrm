<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Deal;
use Illuminate\Http\Request;

class DealController extends Controller
{

    function getDeals()
    {
        $deals = Deal::get();
        return ApiResponse::success(true, $deals, "Deals fetched....", 200);
    }

    function addDeals(Request $request)
    {
        try {

            $rules = [
                "company_name" => 'required|min:2',
                "contact_name" => 'required|min:2',
                "contact_number" => 'required|min:10',
                "email" => 'required|email:rfc,dns',
                "deal_amount" => 'required',
                "quotation_type" => 'required',
                "pan_number" => 'required |regex:/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/',
            ];

            $validation = validator($request->all(), $rules);

            if ($validation->fails()) {
                return response()->json($validation->errors(), 405);
            }


            $resp = Deal::create($request->all());

            if (!$resp) {
                return ApiResponse::error(message: $resp, status: 450);
            } else {
                return ApiResponse::success(success: true, data: $resp, message: "Deal added in db", status: 200);
            }

        } catch (\Throwable $th) {
            return ApiResponse::error("somting went wrong", 500, $th);
        }
    }
}
