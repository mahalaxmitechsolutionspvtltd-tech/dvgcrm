<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Helpers\ApiResponse;
use App\Models\Deal;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadsController extends Controller
{
    function addLead(Request $request)
    {

        try {


            $rules = [
                "company_name" => 'required|min:2',
                "primary_person_name" => 'required|min:2',
                "primary_person_contact" => 'required|min:10',
                "primary_person_email" => 'required|email:rfc,dns',
                "pan_number" => 'required |regex:/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/',
            ];

            $validation = validator($request->all(), $rules);

            if ($validation->fails()) {
                // return response()->json($validation->errors());
                return ApiResponse::error("Fill the files..", 400, $validation->errors());
            }

            // return response()->json($request->all());

            $resp = Lead::create($request->all());

            if (!$resp) {
                return ApiResponse::error(message: $resp, status: 450);
            } else {
                return ApiResponse::success(success: true, data: $resp, message: "lead added in db", status: 200);
            }

        } catch (\Throwable $th) {
            return ApiResponse::error("somting went wrong", 500, $th);
        }
    }

    function getAllLeads(Request $request)
    {
        try {
            $resp = Lead::get();
            return ApiResponse::success(success: true, data: $resp, message: "Data fetched successfully...", status: 200);

        } catch (\Throwable $th) {
            return response()->json(data: $th, status: 500);
        }
    }

    function updateLead(Request $request, $sr_no)
    {
        try {

            $rules = [
                "company_name" => 'required|min:2',
                "primary_person_name" => 'required|min:2',
                "primary_person_contact" => 'required|min:10',
                "primary_person_email" => 'required|email:rfc,dns',
                "pan_number" => 'required |regex:/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/',
            ];

            $validation = validator($request->all(), $rules);

            if ($validation->fails()) {
                return response()->json($validation->errors());
            }


            $lead = Lead::where('sr_no', $sr_no)->first();
            // return response()->json($lead);
            if (!$lead) {
                return response()->json("No result found...", 450);
            }

            $resp = $lead->update($request->input());


            return ApiResponse::success(success: true, data: $resp, message: "Updated successfully...", status: 200);

        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }

    function convetLeadIntoDeal($sr_no)
    {
        try {

            return DB::transaction(function () use ($sr_no) {
                $lead = Lead::where('sr_no', $sr_no)->first();

                if (!$lead) {
                    return response()->json("lead not found..", 405);
                }

                $data = [
                    'lead_sr_no' => $lead->sr_no,
                    'company_name' => $lead->company_name,
                    'contact_name' => $lead->primary_person_name,
                    'email' => $lead->primary_person_email,
                    'city' => $lead->address_line1,
                    'deal_title' => '',
                    'deal_stage' => 'Discovery',
                    'deal_amount' => $lead->quotation_amount,
                    'quotation_type' => $lead->quotation_type,
                    'problem_statement' => $lead->problem_statement,
                    'service_requirements' => $lead->service_requirements,
                    'status' => 'New',
                ];

                $resp = Deal::create(attributes: $data);
                if ($resp) {
                    $lead->update(['status' => 'Deal done']);

                    return ApiResponse::success(true, $resp, "Deal created successfully", 200);
                }

            });

        } catch (\Throwable $th) {
            return response()->json(data: $th, status: 500);
        }
    }
}


