<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Deal extends Model
{
    use HasFactory;
    protected $table = 'deals';
    protected $primaryKey = 'id';
    public $incrementing = false;        // IMPORTANT
    protected $keyType = 'string';

    protected $fillable = [
        'lead_sr_no',
        'company_name',
        'company_type',
        'nature_of_business',
        'contact_name',
        'contact_number',
        'pan_number',
        'gst_no',
        'email',
        'city',
        'deal_title',
        'deal_stage',
        'deal_amount',
        'quotation_type',
        'problem_statement',
        'service_requirements',
        'status',
        'last_updated',
    ];

    /**
     * Casts
     */
    protected $casts = [
        'service_requirements' => 'array',
        'deal_amount' => 'decimal:2',
        'last_updated' => 'integer',
        
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
