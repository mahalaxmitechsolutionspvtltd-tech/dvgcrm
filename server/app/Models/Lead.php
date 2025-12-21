<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{

    protected $primaryKey = 'sr_no';
    protected $fillable = [
        "company_name",
        "company_type",
        "nature_of_business",

        "primary_person_name",     //this is required
        "primary_person_contact",     //this is required
        "primary_person_email",      //this is required

        "secondary_person_name",
        "secondary_person_contact",
        "secondary_person_email",

        "tertiary_person_name",
        "tertiary_person_contact",
        "tertiary_person_email",
        
        "email",
        "gst_no",
        "pan_number",
        "address_line1",
        "service_requirements",
        "problem_statement",
        "quotation_amount",
        "quotation_type",
        "remarks",
        "follow_ups",
        "expenses",

        "status",
        "date",
    ];

    protected $casts = [
        "follow_ups" => "array",
        "service_requirements" => "array",
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($lead) {
            // Auto-fill date column
            if (empty($lead->date)) {
                $lead->date = now()->toDateString();  // YYYY-MM-DD
            }
        });
    }
}
