<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClienteCreateRequest extends FormRequest
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
            'Codigo' => ['required','string'],
            'Nombre' => ['required','String'],
            'Distribuidor' => ['required','String'],
            'Login' => ['required','String'],
            'Email' => ['required','email']
        ];
    }
    public function messages()
    {
        return [];
    }
}
