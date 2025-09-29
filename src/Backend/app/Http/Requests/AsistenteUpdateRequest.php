<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AsistenteUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id' => 'required',
            'Codigo' => 'nullable|String',
            'Nombre' => 'nullable|String',
            'Supervisor' => 'nullable|Boolean',
            'Email' => 'nullable|String',
            'Login' => 'nullable|String'
        ];
    }
}
