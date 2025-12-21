<?php

use App\Http\Controllers\DealController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\NetworkController;
use App\Http\Controllers\UserAuthController;
use Illuminate\Support\Facades\Route;

// default route
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//# routes for the authenticaion
Route::post(uri: 'signup', action: [UserAuthController::class, 'signUp']);
Route::post(uri: 'signin', action: [UserAuthController::class, 'signIn']);


//Routs for the Leads
Route::post(uri: 'addlead', action: [LeadsController::class, 'addLead']);
Route::get(uri: 'getleads', action: [LeadsController::class, 'getAllLeads']);
Route::put(uri: 'updatelead/{sr_no}', action: [LeadsController::class, 'updateLead']);
Route::post(uri: 'createdeal/{sr_no}', action: [LeadsController::class, 'convetLeadIntoDeal']);
// Deals
Route::get(uri: 'getdeals', action: [DealController::class, 'getDeals']);
Route::post(uri: 'createdeal', action: [DealController::class, 'addDeals']);


//network
Route::get(uri: 'getnetworks', action: [NetworkController::class, 'getNetworks']);
Route::post(uri: 'addnetwork', action: [NetworkController::class, 'addNetwork']);
