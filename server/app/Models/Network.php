<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Network extends Model
{
    protected $fillable = [
        "full_name",
        "email",
        "mobile",
        "type_of_connect",
        "industry_connects"
    ];
}
